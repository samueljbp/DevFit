import {createStackNavigator} from '@react-navigation/stack';
import StarterIntro from '../screens/StarterIntro';

const Stack = createStackNavigator();

const StarterStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: '',
            }}>
            <Stack.Screen name="StarterIntro" component={StarterIntro} />
        </Stack.Navigator>
    );
};

export default StarterStack;
