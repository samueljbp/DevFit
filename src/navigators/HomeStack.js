import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import HomeConfig from '../screens/HomeConfig';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: true,
                cardStyle: {
                    backgroundColor: '#FFF',
                },
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HomeConfig" component={HomeConfig} />
        </Stack.Navigator>
    );
};

export default HomeStack;
