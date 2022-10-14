import {createStackNavigator} from '@react-navigation/stack';

import WorkoutSelect from '../screens/WorkoutSelect';
import WorkoutChecklist from '../screens/WorkoutChecklist';

const Stack = createStackNavigator();

const MyWorkoutsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="WorkoutSelect"
            screenOptions={{
                headerShown: true,
                cardStyle: {
                    backgroundColor: '#FFF',
                },
            }}>
            <Stack.Screen name="WorkoutSelect" component={WorkoutSelect} />
            <Stack.Screen
                name="WorkoutChecklist"
                component={WorkoutChecklist}
            />
        </Stack.Navigator>
    );
};

export default MyWorkoutsStack;
