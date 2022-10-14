import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import CustomTabBar from '../components/CustomTabBar';
import WorkoutStack from './WorkoutStack';
import MyWorkoutsStack from './MyWorkoutsStack';
import {useRoute} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppTab = () => {
    const route = useRoute();
    const routeName = getFocusedRouteNameFromRoute(route) ?? `HomeStack`;

    return (
        <Tab.Navigator
            initialRouteName="HomeStack"
            tabBar={props => (
                <CustomTabBar
                    {...props}
                    routeName={routeName}
                    items={[
                        {
                            type: 'regular',
                            text: 'Início',
                            tabBarVisible: true,
                            icon: require('../assets/home.png'),
                            route: 'HomeStack',
                        },
                        {
                            type: 'big',
                            text: '',
                            tabBarVisible: false,
                            icon: require('../assets/dumbbell.png'),
                            route: 'WorkoutStack',
                        },
                        {
                            type: 'regular',
                            text: 'Meus treinos',
                            tabBarVisible: true,
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
            <Tab.Screen name="WorkoutStack" component={WorkoutStack} />
            <Tab.Screen name="MyWorkoutsStack" component={MyWorkoutsStack} />
        </Tab.Navigator>
    );
};

export default AppTab;
