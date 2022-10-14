import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
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
    let workout = route.params?.workout;
    const [exercises, setExercises] = useState([...workout.exercises]);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <></>,
        });
    }, []);

    const checkAction = (exercise, index) => {
        let newExercises = [...exercises];

        if (!exercise.done) {
            newExercises[index].done = true;
        } else {
            newExercises[index].done = false;
        }

        setExercises([...newExercises]);

        checkWorkout();
    };

    const checkWorkout = () => {
        if (exercises.every(i => i.done)) {
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

    return (
        <Container source={require('../assets/fitness.jpg')}>
            <StatusBar barStyle="light-content" />
            <SafeArea>
                <WorkoutHeader>
                    <WorkoutTitle>{workout.name}</WorkoutTitle>
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
