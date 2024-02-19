import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { auth } from '../config/firebase';
import { getFirestore, doc, updateDoc, getDoc, addDoc, collection, query, where } from 'firebase/firestore';

export default function Schedule() {
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [note, setNote] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

    useEffect(() => {
        getTime();
        fetchBookedAppointments();
    }, [selectedDate]);

    const userId = auth.currentUser.uid;

    const getTime = () => {
        let newTimeList = [];

        for (let i = 0; i < 48; i++) {
            let hour = Math.floor(i / 2) % 12 || 12;
            let period = i < 24 ? 'AM' : 'PM';

            const time = `${hour < 10 ? '0' : ''}${hour}:${i % 2 === 0 ? '00' : '30'} ${period}`;

            if ((hour === 10 && period === 'AM') || (hour > 10 && period === 'AM' && hour < 12) || (hour === 12 && period === 'PM') || (period === 'PM' && hour < 10)) {
                newTimeList.push({ time, isBooked: false });
            }
        }

        setTimeList(newTimeList);
    };

    const fetchBookedAppointments = async () => {
        try {
            const db = getFirestore();
            const appointmentsRef = collection(db, 'users', userId, 'appointments');
            const q = query(appointmentsRef, where('date', '==', selectedDate));

            const querySnapshot = await getDoc(q);

            const bookedSlots = querySnapshot.docs.map((doc) => doc.data().time);

            setBookedTimeSlots(bookedSlots);
        } catch (error) {
            console.error('Error fetching booked appointments:', error);
        }
    };

    const handleDatePress = (date) => {
        setSelectedDate(new Date(date.timestamp));
        setShowDatePicker(false);
    };

    const handleConfirmAndBook = async () => {
        try {
            const db = getFirestore();
            const appointmentsRef = collection(db, 'users', userId, 'appointments');

            if (bookedTimeSlots.includes(selectedTime)) {
                Alert.alert('Time Slot Already Booked', 'Please select another time slot.');
                return;
            }

            await addDoc(appointmentsRef, {
                date: selectedDate,
                time: selectedTime,
                note,
            });

            console.log('Confirmed and booked:', selectedDate, selectedTime, note);
            fetchBookedAppointments();
        } catch (error) {
            console.error('Error confirming and booking:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Book an appointment</Text>

                    <View style={styles.calendarContainer}>
                        <Calendar
                            current={selectedDate.toISOString().split('T')[0]}
                            onDayPress={(day) => handleDatePress(day)}
                            markedDates={{
                                [selectedDate.toISOString().split('T')[0]]: { selected: true, marked: true, selectedColor: 'black' },
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
                                    style={[styles.timeSlotButton, item.isBooked && styles.bookedTimeSlot]}
                                    onPress={() => setSelectedTime(item.time)}
                                    disabled={item.isBooked}
                                >
                                    <Text style={[styles.timeSlotText, item.isBooked && styles.bookedTimeSlotText]}>{item.time}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <View style={styles.noteContainer}>
                        <Text style={styles.subtitle}>Leave a Note</Text>
                        <TextInput
                            placeholder='Start typing...'
                            numberOfLines={3}
                            multiline={true}
                            style={styles.noteTextArea}
                            onChangeText={(text) => setNote(text)}
                        />
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAndBook}>
                        <Text style={styles.confirmButtonText}>Confirm & Book</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    title: {
        marginTop: 35,
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
        backgroundColor: '#B4CBF0',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    timeSlotContainer: {
        marginBottom: 20,
    },
    timeSlotButton: {
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    timeSlotText: {
        fontSize: 16,
    },
    bookedTimeSlot: {
        backgroundColor: 'red',
    },
    bookedTimeSlotText: {
        color: 'white',
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
        backgroundColor: '#B4CBF0',
        padding: 10,
        borderRadius: 10,
    },
    confirmButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});
