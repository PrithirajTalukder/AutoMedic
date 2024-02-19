import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Schedule() {
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
        backgroundColor: 'lightblue',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    timeSlotContainer: {
        marginBottom: 20,
    },
    timeSlotButton: {
        marginRight: 10,
    },
    timeSlotText: {
        padding: 12,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderRadius: 99,
        borderColor: 'lightgray',
    },
    selectedTime: {
        backgroundColor: 'black',
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
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 99,
    },
    confirmButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});
