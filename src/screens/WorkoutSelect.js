import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setName} from '../reducers/userSlice';
import Workout from '../components/Workout';
import {HeaderBackButton} from '@react-navigation/elements';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #fff;
`;

const WorkoutList = styled.FlatList`
    flex: 1;
    width: 100%;
    padding: 20px;
`;

const Title = styled.Text`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Page = props => {
    const navigation = useNavigation();
    let lastWorkout = null;
    if (props.lastWorkout) {
        lastWorkout = props.myWorkouts.find(i => i.id == props.lastWorkout);
    }

    const handleBackAction = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{name: 'AppTab'}],
            }),
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Escolha seu treino',
            headerLeft: () => <HeaderBackButton onPress={handleBackAction} />,
        });
    }, []);

    const goWorkout = workout => {
        navigation.navigate('WorkoutChecklist', {workout});
    };

    return (
        <Container>
            {lastWorkout && (
                <>
                    <Title>Seu último treino foi:</Title>
                    <Workout data={lastWorkout} />
                </>
            )}
            <Title>Escolha seu treino de hoje</Title>
            <WorkoutList
                data={props.myWorkouts}
                renderItem={({item}) => (
                    <Workout
                        data={item}
                        goAction={() => {
                            goWorkout(item);
                        }}
                    />
                )}></WorkoutList>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        myWorkouts: state.userSlice.myWorkouts,
        lastWorkout: state.userSlice.lastWorkout,
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
