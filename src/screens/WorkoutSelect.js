import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
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

const Page = () => {
    const navigation = useNavigation();
    const userData = useSelector(state => state.userSlice);
    const myWorkouts = Object.assign(userData.myWorkouts, {});
    let lastWorkout = null;

    if (userData.lastWorkout) {
        lastWorkout = myWorkouts.find(i => i.id == userData.lastWorkout);
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
        navigation.navigate('WorkoutChecklist', {workoutId: workout.id});
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
                data={myWorkouts}
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

export default Page;
