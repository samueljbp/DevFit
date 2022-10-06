import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
//import ConfigScreen from './ConfigScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
