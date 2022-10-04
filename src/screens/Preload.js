import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Preload = props => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const navigation = useNavigation();

    useEffect(() => {
        //codigo temporario
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{name: 'StarterStack'}],
            }),
        );
    }, []);

    /*
    if (!userData.name) {
        //mandar para starter stack
        props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'StarterStack'}),
                ],
            }),
        );
    } else {
        //mandar para app tab
        props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'AppTab'})],
            }),
        );
    }
    */

    return null;
};

export default Preload;
