// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

const Header = () => {
    return (
        <View style={headerStyles.header}>
            <Text style={headerStyles.headerText}>Workout Tracker</Text>
        </View>
    );
};

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setWorkouts(response.data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    if (loading) {
        return (
            <View style={workoutListStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={workoutListStyles.workoutItem}>
                    <Text style={workoutListStyles.workoutTitle}>{item.title}</Text>
                    <Text style={workoutListStyles.workoutBody}>{item.body}</Text>
                </View>
            )}
            contentContainerStyle={workoutListStyles.list}
        />
    );
};

export default function App() {
    return (
        <SafeAreaView style={appStyles.container}>
            <ScrollView contentContainerStyle={appStyles.scrollView}>
                <Header />
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        padding: 20,
    },
});

const headerStyles = StyleSheet.create({
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
});

const workoutListStyles = StyleSheet.create({
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
});