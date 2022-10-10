import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Temp1 from './HomeStack';
import Temp2 from './HomeStack';
import CustomTabBar from '../components/CustomTabBar';
//import WorkoutStack from './WorkoutStack';
import MyWorkoutsStack from './MyWorkoutsStack';

const Tab = createBottomTabNavigator();

const AppTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            tabBar={props => (
                <CustomTabBar
                    {...props}
                    items={[
                        {
                            type: 'regular',
                            text: 'Início',
                            icon: require('../assets/home.png'),
                            route: 'HomeStack',
                        },
                        {
                            type: 'big',
                            text: '',
                            icon: require('../assets/dumbbell.png'),
                            route: 'WorkoutStack',
                        },
                        {
                            type: 'regular',
                            text: 'Meus treinos',
                            icon: require('../assets/myworkouts.png'),
                            route: 'MyWorkoutsStack',
                        },
                    ]}
                />
            )}
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="Temp1" component={Temp1} />
            <Tab.Screen name="Temp2" component={Temp2} />
            {
                /* <Tab.Screen name="WorkoutStack" component={WorkoutStack} />*/
                <Tab.Screen
                    name="MyWorkoutsStack"
                    component={MyWorkoutsStack}
                />
            }
        </Tab.Navigator>
    );
};

export default AppTab;
