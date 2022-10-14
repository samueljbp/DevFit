import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setName} from '../reducers/userSlice';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #fff;
    margin-left: 30px;
    margin-right: 30px;
`;

const NextButton = styled.Button``;

const Page = props => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRightContainerStyle: {
                paddingRight: 10,
            },
        });
    }, []);

    return <Container></Container>;
};

const mapStateToProps = state => {
    return {
        name: state.userSlice.name,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setName: name =>
            dispatch(
                setName({
                    name,
                }),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
