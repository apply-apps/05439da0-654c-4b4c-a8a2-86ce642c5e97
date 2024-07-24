// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

// Header.js
const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Workout Tracker</Text>
        </View>
    );
};

// WorkoutList.js
const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setWorkouts(data.slice(0, 10)); // Limiting to first 10 workouts
            } catch (error) {
                console.error("Error fetching workouts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    const toggleCompletion = (id) => {
        setWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout) =>
                workout.id === id ? { ...workout, completed: !workout.completed } : workout
            )
        );
        setCompletedCount((prevCount) =>
            workouts.find((workout) => workout.id === id).completed ? prevCount - 1 : prevCount + 1
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <Text style={styles.counter}>Completed Workouts: {completedCount}</Text>
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
                        <View style={styles.workoutItem}>
                            <Text style={styles.workoutTitle}>{item.title}</Text>
                            <Text style={[styles.workoutBody, item.completed && styles.completed]}>
                                {item.body}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

// App.js
export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Header />
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    list: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    workoutItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    workoutBody: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    counter: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});