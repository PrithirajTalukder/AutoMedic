import React, { useEffect, useState } from 'react';
import {SafeAreaView, ScrollView, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Schedule() {
    const navigation = useNavigation();
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [note, setNote] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        let newTimeList = [];
    
        for (let i = 0; i < 48; i++) {
            let hour = Math.floor(i / 2) % 12 || 12;
            let period = i < 24 ? 'AM' : 'PM';
    
            const time = `${hour < 10 ? '0' : ''}${hour}:${i % 2 === 0 ? '00' : '30'} ${period}`;
    
            // Filter time slots only between 10:00 AM and 10:00 PM
            if ((hour === 10 && period === 'AM') || (hour > 10 && period === 'AM' && hour < 12) || (hour === 12 && period === 'PM') || (period === 'PM' && hour < 10)) {
                newTimeList.push({ time });
            }
        }
    
        setTimeList(newTimeList);
    };

    const handleDatePress = (date) => {
        setSelectedDate(new Date(date.timestamp));
        setShowDatePicker(false);
    };

    const handleSubmit = () => {
        // Implement the logic for submitting the appointment
        console.log('Submitted:', selectedDate, selectedTime, note);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
      <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 30, backgroundColor: '#fff', elevation: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
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
                            style={{elevation:5}}
                            current={selectedDate.toISOString().split('T')[0]}
                            onDayPress={(day) => handleDatePress(day)}
                            markedDates={{
                                [selectedDate.toISOString().split('T')[0]]: { selected: true, marked: true, selectedColor: '#15174f' },
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
                                    onPress={() => setSelectedTime(item.time)}
                                >
                                    <Text style={[styles.timeSlotText, selectedTime === item.time ? styles.selectedTime : styles.unSelectedTime]}>{item.time}</Text>
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
        paddingBottom:5
    },
    title: {
        
        paddingTop:10,
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
        height:120,
        width:'100%',
    },
    timeSlotButton: {
        marginRight: 5,
        marginLeft:10
        
    },
    timeSlotText: {
        padding: 12,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderRadius: 99,
        borderColor: 'lightgray',
        backgroundColor:'white',
        elevation:5
    },
    selectedTime: {
        backgroundColor: '#15174f',
        color: 'lightgray',
    },
    unSelectedTime: {
        color: 'gray',
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
        paddingVertical:15,
        marginBottom:72
    },
    confirmButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});
