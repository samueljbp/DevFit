import React, {useLayoutEffect} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {addWorkout, removeWorkout} from '../reducers/userSlice';
import workoutJson from '../presetWorkouts.json';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #fff;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 50px;
`;
const HeaderText = styled.Text`
    font-size: 15px;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
`;

const Workoutist = styled.FlatList`
    width: 100%;
`;

const NextButton = styled.Button``;

const Page = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRightContainerStyle: {
                paddingRight: 10,
            },
            headerRight: () => (
                <NextButton
                    title={
                        userData.myWorkouts.length > 0 ? 'Concluir' : 'Ignorar'
                    }
                    onPress={nextAction}
                />
            ),
        });
    }, [userData.myWorkouts]);

    const nextAction = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{name: 'AppTab'}],
            }),
        );
    };

    const addWorkout = item => {
        if (props.myWorkouts.findIndex(i => i.id == item.id)) {
            props.addWorkout(item);
        } else {
            props.removeWorkout(item);
        }
    };

    const workoutAlreadyIncluded = itemId => {
        var index = userData.myWorkouts.findIndex(i => i.id == itemId);
        return index >= 0;
    };

    return (
        <Container>
            <HeaderText>
                Opções de treino pré-criados com base no seu nível.
            </HeaderText>
            <HeaderText>
                Você selecionou {props.myWorkouts.length} treinos
            </HeaderText>

            <Workoutist
                data={workoutJson}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Workout
                        data={item}
                        addAction={() => addWorkout(item)}
                        itemChecked={() => workoutAlreadyIncluded(item.id)}
                    />
                )}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        myWorkouts: state.userSlice.myWorkouts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addWorkout: item => dispatch(addWorkout({workout: item})),
        removeWorkout: item => dispatch(removeWorkout({workout: item})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
