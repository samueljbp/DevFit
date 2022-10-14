import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {connect, useSelector} from 'react-redux';
import {addProgress, setLastWorkout} from '../reducers/userSlice';
import {StatusBar} from 'react-native';
import ExerciseItem from '../components/ExerciseItem';

const Container = styled.ImageBackground`
    flex: 1;
    background-color: #000;
    align-items: center;
`;

const SafeArea = styled.SafeAreaView`
    flex: 1;
    width: 100%;
    align-items: center;
    background-color: rgba(1, 59, 14, 0.9);
`;

const WorkoutHeader = styled.View`
    flex-direction: row;
    width: 90%;
    align-items: center;
    height: 70px;
`;

const WorkoutTitle = styled.Text`
    flex: 1;
    color: #fff;
    font-size: 20px;
`;

const WorkoutClose = styled.TouchableHighlight`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

const WorkoutCloseText = styled.Text`
    font-size: 22px;
    color: #fff;
    font-weight: bold;
`;

const WorkoutList = styled.FlatList`
    flex: 1;
    width: 90%;
`;

const Page = props => {
    const navigation = useNavigation();
    const route = useRoute();
    const userData = useSelector(state => state.userSlice);
    const workoutId = route.params?.workoutId;
    let workout = userData.myWorkouts.find(w => w.id == workoutId);
    let newWorkout = Object.assign({}, workout);
    const [exercises, setExercises] = useState(newWorkout.exercises);
    const [completedExercises, setCompletedExercises] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <></>,
        });
    }, []);

    useEffect(() => {
        checkWorkout();
    }, [completedExercises]);

    const checkAction = (exercise, index) => {
        if (!isExerciseDone(exercise.id)) {
            var newList = [...completedExercises, exercise.id];
            setCompletedExercises([...newList]);
        } else {
            var newList = completedExercises.filter(i => i != exercise.id);
            setCompletedExercises([...newList]);
        }
    };

    const checkWorkout = () => {
        if (exercises.length == completedExercises.length) {
            alert('Parabéns! Você finalizou!');

            let today = new Date();
            let thisYear = today.getFullYear();
            let thisMonth = today.getMonth();
            let thisDay = today.getDate();
            thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
            thisDay = thisDay < 10 ? '0' + thisDay : thisDay;

            let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

            props.addProgress(dFormated);
            props.setLastWorkout(workout.id);

            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: 'AppTab'}],
                }),
            );
        }
    };

    const isExerciseDone = id => {
        return completedExercises.find(i => i == id) != null;
    };

    return (
        <Container source={require('../assets/fitness.jpg')}>
            <StatusBar barStyle="light-content" />
            <SafeArea>
                <WorkoutHeader>
                    <WorkoutTitle>{newWorkout.name}</WorkoutTitle>
                    <WorkoutClose underlayColor="transparent">
                        <WorkoutCloseText onPress={() => navigation.goBack()}>
                            X
                        </WorkoutCloseText>
                    </WorkoutClose>
                </WorkoutHeader>
                <WorkoutList
                    data={exercises}
                    renderItem={({item, index}) => (
                        <ExerciseItem
                            data={item}
                            isDone={isExerciseDone(item.id)}
                            index={index}
                            checkAction={() => checkAction(item, index)}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeArea>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        name: state.userSlice.name,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addProgress: date =>
            dispatch(
                addProgress({
                    date,
                }),
            ),
        setLastWorkout: id =>
            dispatch(
                setLastWorkout({
                    id,
                }),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
