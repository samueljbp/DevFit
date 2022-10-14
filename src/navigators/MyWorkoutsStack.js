import {createStackNavigator} from '@react-navigation/stack';

import MyWorkouts from '../screens/MyWorkouts';
import EditWorkout from '../screens/EditWorkout';

const Stack = createStackNavigator();

const MyWorkoutsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="MyWorkouts"
            screenOptions={{
                headerShown: true,
                cardStyle: {
                    backgroundColor: '#FFF',
                },
            }}>
            <Stack.Screen name="MyWorkouts" component={MyWorkouts} />
            <Stack.Screen name="EditWorkout" component={EditWorkout} />
        </Stack.Navigator>
    );
};

export default MyWorkoutsStack;
