import {createStackNavigator} from '@react-navigation/stack';
import StarterIntro from '../screens/StarterIntro';
import StarterName from '../screens/StarterName';
import StarterDias from '../screens/StarterDias';
import StarterNivel from '../screens/StarterNivel';
import StarterRecomendations from '../screens/StarterRecomendations';

const Stack = createStackNavigator();

const StarterStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: '',
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }}>
            <Stack.Screen name="StarterIntro" component={StarterIntro} />
            <Stack.Screen name="StarterName" component={StarterName} />
            <Stack.Screen name="StarterDias" component={StarterDias} />
            <Stack.Screen name="StarterNivel" component={StarterNivel} />
            <Stack.Screen
                name="StarterRecomendations"
                component={StarterRecomendations}
            />
        </Stack.Navigator>
    );
};

export default StarterStack;
