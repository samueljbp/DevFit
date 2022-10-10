import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {removeWorkout} from '../reducers/userSlice';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
    flex: 1;
`;

const WorkoutList = styled.FlatList`
    flex: 1;
    padding: 20px;
`;

const ButtonArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

const ButtonImage = styled.Image`
    width: 25px;
    height: 25px;
`;

const Page = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);

    const AddWorkoutButton = () => {
        const btnAction = () => {
            navigation.navigate('EditWorkout');
        };

        return (
            <ButtonArea onPress={btnAction} underlayColor="transparent">
                <ButtonImage source={require('../assets/add.png')} />
            </ButtonArea>
        );
    };

    const editWorkout = workout => {
        navigation.navigate('EditWorkout', {workout});
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Meus treinos',
            headerRight: () => <AddWorkoutButton />,
            headerRightContainerStyle: {
                paddingRight: 10,
            },
        });
    }, []);

    return (
        <Container>
            <WorkoutList
                data={props.myWorkouts}
                renderItem={({item}) => (
                    <Workout
                        data={item}
                        editAction={() => {
                            editWorkout(item);
                        }}
                        removeAction={() => {
                            props.removeWorkout(item);
                        }}
                    />
                )}></WorkoutList>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        name: state.userSlice.name,
        myWorkouts: state.userSlice.myWorkouts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeWorkout: workout =>
            dispatch(
                removeWorkout({
                    workout,
                }),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
