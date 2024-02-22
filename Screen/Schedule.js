import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

export default function Schedule() {
  const navigation = useNavigation();
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState();

  const currentUser = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    getTime();

    const appointmentsCollectionRef = collection(db, 'Appointment');
    const unsubscribe = onSnapshot(
      appointmentsCollectionRef,
      (snapshot) => {
        getTime();
      },
      (error) => {
        console.error('Error getting real-time updates:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [selectedDate]);

  const getTime = async () => {
    let newTimeList = [];

    for (let i = 0; i < 48; i++) {
      let hour = Math.floor(i / 2) % 12 || 12;
      let period = i < 24 ? 'AM' : 'PM';

      const time = `${hour < 10 ? '0' : ''}${hour}:${i % 2 === 0 ? '00' : '30'} ${period}`;

      if (
        (hour === 10 && period === 'AM') ||
        (hour > 10 && period === 'AM' && hour < 12) ||
        (hour === 12 && period === 'PM') ||
        (period === 'PM' && hour < 10)
      ) {
        newTimeList.push({ time });
      }
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const bookedSlots = await getBookedTimeSlots(formattedDate);

    newTimeList = newTimeList.map(({ time }) => ({
      time,
      isBooked: bookedSlots.includes(time),
    }));

    setTimeList(newTimeList);
  };

  const getBookedTimeSlots = async (date) => {
    try {
      const appointmentsCollectionRef = collection(db, 'Appointment');
      const querySnapshot = await getDocs(
        query(appointmentsCollectionRef, where('date', '==', date))
      );

      const bookedSlots = [];

      querySnapshot.forEach((doc) => {
        const { time } = doc.data();
        bookedSlots.push(time);
      });

      return bookedSlots;
    } catch (error) {
      console.error('Error fetching booked time slots:', error);
      return [];
    }
  };

  const handleDatePress = (date) => {
    setSelectedDate(new Date(date.timestamp));
  };

  const handleSubmit = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        Alert.alert('Incomplete Selection', 'Please select both date and time slot before submitting.');
        return;
      }
  
      if (selectedTime && timeList.find((slot) => slot.time === selectedTime)?.isBooked) {
        // If the selected time slot is booked (red), show an alert
        Alert.alert('Slot Booked', 'This time slot is already booked. Please choose another time slot.');
        return;
      }
  
      if (!currentUser) {
        Alert.alert(
          'Not Signed In',
          'You are not signed in. Please sign in before submitting an appointment.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SignIn'),
            },
          ]
        );
        return;
      }

      const userDocRef = doc(db, 'Users Informations', currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const appointmentsCollectionRef = collection(db, 'Appointment');

        await setDoc(doc(appointmentsCollectionRef), {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          note: note || '',
        });

        Alert.alert(
          'Appointment Booked',
          `Your appointment with AutoMedic is booked on ${selectedDate
            .toISOString()
            .split('T')[0]} at ${selectedTime}.`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Main');
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }
  };

  const handleTimeSlotPress = (selectedSlot) => {
    if (selectedSlot.isBooked) {
      Alert.alert(
        'Slot Booked',
        'This time slot is already booked. Please choose another time slot.'
      );
    } else {
      setSelectedTime(selectedSlot.time);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          width: '100%',
          height: 100,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          paddingTop: 30,
          backgroundColor: '#fff',
          elevation: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingLeft: 15, fontSize: 18, fontWeight: 600 }}>Back</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Book an appointment</Text>

            <View style={styles.calendarContainer}>
              <Calendar
                style={{ elevation: 5 }}
                current={new Date().toISOString().split('T')[0]} // Set current date
  minDate={new Date().toISOString().split('T')[0]} // Set minimum date to current date
                onDayPress={(day) => handleDatePress(day)}
                markedDates={{
                  [selectedDate.toISOString().split('T')[0]]: {
                    selected: true,
                    marked: true,
                    selectedColor: '#15174f',
                  },
                }}
                theme={{
                  todayTextColor: 'white',
                  selectedDayBackgroundColor: 'black',
                  selectedDayTextColor: 'white',
                }}

                
              />
            </View>

            <View style={styles.timeSlotContainer}>
              <Text style={styles.subtitle}>Select Time Slot</Text>
              <FlatList
                data={timeList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.timeSlotButton}
                    onPress={() => handleTimeSlotPress(item)}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        item.isBooked
                          ? styles.bookedTime
                          : selectedTime === item.time
                          ? styles.selectedTime
                          : styles.unSelectedTime,
                      ]}
                    >
                      {item.time}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.noteContainer}>
              <Text style={styles.subtitle}>Want to leave a note for Automedic?</Text>
              <TextInput
                placeholder="leave a note (optional)"
                numberOfLines={3}
                multiline={true}
                style={styles.noteTextArea}
                onChangeText={(text) => setNote(text)}
              />
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.confirmButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  title: {
    paddingTop: 10,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  calendarContainer: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  timeSlotContainer: {
    marginBottom: 5,
    height: 120,
    width: '100%',
  },
  timeSlotButton: {
    marginRight: 5,
    marginLeft: 10,
  },
  timeSlotText: {
    padding: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    elevation: 5,
  },
  selectedTime: {
    backgroundColor: '#15174f',
    color: 'lightgray',
  },
  unSelectedTime: {
    color: 'gray',
  },
  bookedTime: {
    backgroundColor: 'red',
    color: 'lightgray',
  },
  noteContainer: {
    marginBottom: 20,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    padding: 20,
    borderColor: 'lightgray',
  },
  confirmButton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#15174f',
    padding: 10,
    borderRadius: 99,
    paddingVertical: 15,
    marginBottom:75
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
