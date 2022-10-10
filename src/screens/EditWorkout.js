import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setName, setWorkoutDays, setLevel} from '../reducers/userSlice';
import DefaultButton from '../components/DefaultButton';
import ExerciseItemEdit from '../components/ExerciseItemEdit';
import CustomModal from '../components/CustomModal';

const Container = styled.SafeAreaView`
    flex: 1;
    margin: 20px;
`;

const SaveArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

const SaveImage = styled.Image`
    width: 25px;
    height: 25px;
`;

const NameInput = styled.TextInput`
    border: 1px solid #ccc;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
`;

const ExercisesArea = styled.View`
    flex: 1;
    margin-top: 20px;
    padding-top: 20px;
    border-top-width: 1px;
    border-top-color: #ccc;
`;

const ButtonText = styled.Text`
    color: #fff;
`;

const ExercisesList = styled.FlatList`
    flex: 1;
    padding-top: 20px;
`;

const ModalLabel = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
`;

const ModalMuscles = styled.ScrollView``;

const ModalInput = styled.TextInput`
    width: 100%;
    font-size: 14px;
    color: #333;
    height: 40px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
`;

const ModalMuscle = styled.TouchableHighlight`
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    opacity: ${props => props.opacity};
`;

const ModalMuscleImage = styled.Image`
    width: 35px;
    height: 35px;
`;

const ModalExtra = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const ModalExtraItem = styled.View`
    align-items: center;
`;

const Page = props => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);
    const [isEdit, setIsEdit] = useState(route.params?.workout);
    const [id, setId] = useState(
        route.params?.workout ? route.params?.workout.id : '',
    );
    const [name, setName] = useState(
        route.params?.workout ? route.params?.workout.name : '',
    );
    const [exercises, setExercises] = useState(
        route.params?.workout ? route.params?.workout.exercises : [],
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalName, setModalName] = useState('');
    const [modalMuscle, setModalMuscle] = useState('');
    const [modalSets, setModalSets] = useState('');
    const [modalReps, setModalReps] = useState('');
    const [modalLoad, setModalLoad] = useState('');

    const SaveWorkoutButton = () => {
        return (
            <SaveArea>
                <SaveImage source={require('../assets/check-black.png')} />
            </SaveArea>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${isEdit ? 'Editar' : 'Adicionar'} Treino`,
            headerRight: () => <SaveWorkoutButton />,
            headerRightContainerStyle: {
                paddingRight: 10,
            },
        });
    }, [isEdit]);

    const editExercise = exercise => {
        setModalId(exercise.id);
        setModalName(exercise.name);
        setModalMuscle(exercise.muscle);
        setModalSets(exercise.sets);
        setModalReps(exercise.reps);
        setModalLoad(exercise.load);
        setModalVisible(true);
    };

    const removeExercise = exercise => {
        let newExercises = [...exercises];

        newExercises = newExercises.filter(i => i.id != exercise.id);

        setExercises(newExercises);
    };

    return (
        <Container>
            <CustomModal
                visible={modalVisible}
                title="Editar exercício"
                closeAction={() => setModalVisible(false)}>
                <ModalLabel>Músculo de foco</ModalLabel>
                <ModalMuscles
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <ModalMuscle
                        opacity={modalMuscle == 'abs' ? 1 : 0.2}
                        onPress={() => setModalMuscle('abs')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/abs.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'back' ? 1 : 0.2}
                        onPress={() => setModalMuscle('back')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/back.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'biceps' ? 1 : 0.2}
                        onPress={() => setModalMuscle('biceps')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/biceps.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'chest' ? 1 : 0.2}
                        onPress={() => setModalMuscle('chest')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/chest.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'gluteos' ? 1 : 0.2}
                        onPress={() => setModalMuscle('gluteos')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/gluteos.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'legs' ? 1 : 0.2}
                        onPress={() => setModalMuscle('legs')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/legs.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'shoulders' ? 1 : 0.2}
                        onPress={() => setModalMuscle('shoulders')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/shoulders.png')}
                        />
                    </ModalMuscle>
                    <ModalMuscle
                        opacity={modalMuscle == 'triceps' ? 1 : 0.2}
                        onPress={() => setModalMuscle('triceps')}
                        underlayColor="transparent">
                        <ModalMuscleImage
                            source={require('../assets/muscles/triceps.png')}
                        />
                    </ModalMuscle>
                </ModalMuscles>

                <ModalLabel>Nome do exercício</ModalLabel>
                <ModalInput
                    value={modalName}
                    onChangeText={t => setModalName(t)}
                />

                <ModalExtra>
                    <ModalExtraItem>
                        <ModalLabel>Séries</ModalLabel>
                        <ModalInput
                            keyboardType="numeric"
                            value={modalSets}
                            onChangeText={t => setModalSets(t)}
                        />
                    </ModalExtraItem>
                    <ModalExtraItem>
                        <ModalLabel>Repetições</ModalLabel>
                        <ModalInput
                            keyboardType="numeric"
                            value={modalReps}
                            onChangeText={t => setModalReps(t)}
                        />
                    </ModalExtraItem>
                    <ModalExtraItem>
                        <ModalLabel>Carga</ModalLabel>
                        <ModalInput
                            keyboardType="numeric"
                            value={modalLoad}
                            onChangeText={t => setModalLoad(t)}
                        />
                    </ModalExtraItem>
                </ModalExtra>

                <DefaultButton bgcolor="#4AC34E">
                    <ButtonText>Salvar</ButtonText>
                </DefaultButton>
            </CustomModal>
            <NameInput
                value={name}
                onChangeText={i => setName(i)}
                placeholder="Digite o nome do treino"
            />
            <ExercisesArea>
                <DefaultButton bgcolor="#4AC34E">
                    <ButtonText>Adicionar exercício</ButtonText>
                </DefaultButton>

                <ExercisesList
                    data={exercises}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <ExerciseItemEdit
                            data={item}
                            editAction={() => editExercise(item)}
                            removeAction={() => removeExercise(item)}
                        />
                    )}
                />
            </ExercisesArea>
        </Container>
    );
};

const mapStateToProps = state => {
    return {};
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
