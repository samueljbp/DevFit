import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Preload = props => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);
    const navigation = useNavigation();

    useEffect(() => {
        if (!userData.level) {
            //mandar para starter stack
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: 'StarterStack'}],
                }),
            );
        } else {
            //mandar para app tab
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: 'AppTab'}],
                }),
            );
        }
    }, [userData.level]);

    return null;
};

export default Preload;
