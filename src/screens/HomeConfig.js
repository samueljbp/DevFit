import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setName, setWorkoutDays, setLevel, reset} from '../reducers/userSlice';
import {AlertDialog, Button} from 'native-base';

const Container = styled.SafeAreaView`
    flex: 1;
    margin: 0 30px;
`;

const Label = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Input = styled.TextInput`
    border: 1px solid #ccc;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
`;

const ListArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const DayItem = styled.TouchableHighlight`
    width: 40px;
    height: 30px;
    border-radius: 5px;
    background-color: #eee;
    justify-content: center;
    align-items: center;
`;

const DayItemText = styled.Text`
    font-weight: bold;
`;

const LevelItem = styled.TouchableHighlight`
    background-color: #eee;
    height: 30px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
`;

const LevelItemText = styled.Text`
    font-weight: bold;
`;

const ResetButton = styled.Button``;

const Page = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);
    const [showConfirmReset, setShowConfirmReset] = useState(false);

    const onClose = () => setShowConfirmReset(false);

    const cancelRef = React.useRef(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Configurações',
        });
    }, []);

    const toggleWorkoutDay = d => {
        let newWorkoutDays = props.workoutDays;

        if (newWorkoutDays.includes(d)) {
            if (newWorkoutDays.length == 1) {
                alert('Você tem que treinar pelo menos 1 dia.');
                return;
            }
            newWorkoutDays = newWorkoutDays.filter(k => k != d);
            props.setWorkoutDays([...newWorkoutDays]);
        } else {
            props.setWorkoutDays([...newWorkoutDays, d]);
        }
    };

    const resetAction = () => {
        props.reset();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'StarterStack'}],
            }),
        );
    };

    return (
        <Container>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={showConfirmReset}
                onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>ATENÇÃO</AlertDialog.Header>
                    <AlertDialog.Body>
                        Esta ação limpará todos os dados do aplicativo. Não há
                        como voltar atrás. Deseja seguir em frente?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={onClose}
                                ref={cancelRef}>
                                Cancelar
                            </Button>
                            <Button colorScheme="danger" onPress={resetAction}>
                                Apagar tudo
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

            <Label>Seu nome:</Label>
            <Input value={props.name} onChangeText={e => props.setName(e)} />

            <Label>Dias em que você treina:</Label>
            <ListArea>
                <DayItem
                    onPress={() => toggleWorkoutDay(1)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(1)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>SEG</DayItemText>
                </DayItem>
                <DayItem
                    onPress={() => toggleWorkoutDay(2)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(2)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>TER</DayItemText>
                </DayItem>
                <DayItem
                    onPress={() => toggleWorkoutDay(3)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(3)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>QUA</DayItemText>
                </DayItem>
                <DayItem
                    onPress={() => toggleWorkoutDay(4)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(4)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>QUI</DayItemText>
                </DayItem>
                <DayItem
                    onPress={() => toggleWorkoutDay(5)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(5)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>SEX</DayItemText>
                </DayItem>
                <DayItem
                    onPress={() => toggleWorkoutDay(6)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(6)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>SAB</DayItemText>
                </DayItem>
                <DayItem
                    onPress={() => toggleWorkoutDay(0)}
                    underlayColor="transparent"
                    style={
                        props.workoutDays.includes(0)
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <DayItemText>DOM</DayItemText>
                </DayItem>
            </ListArea>

            <Label>Seu nível:</Label>
            <ListArea>
                <LevelItem
                    underlayColor="transparent"
                    onPress={() => props.setLevel('begginer')}
                    style={
                        props.level == 'begginer'
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <LevelItemText>Iniciante</LevelItemText>
                </LevelItem>
                <LevelItem
                    underlayColor="transparent"
                    onPress={() => props.setLevel('intermediate')}
                    style={
                        props.level == 'intermediate'
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <LevelItemText>Intermediário</LevelItemText>
                </LevelItem>
                <LevelItem
                    underlayColor="transparent"
                    onPress={() => props.setLevel('advanced')}
                    style={
                        props.level == 'advanced'
                            ? {backgroundColor: '#A5E8BC'}
                            : {}
                    }>
                    <LevelItemText>Avançado</LevelItemText>
                </LevelItem>
            </ListArea>

            <Label>Você quer resetar tudo?</Label>
            <ResetButton
                title="Resetar tudo"
                onPress={() => setShowConfirmReset(true)}
            />
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        name: state.userSlice.name,
        workoutDays: state.userSlice.workoutDays,
        level: state.userSlice.level,
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
        setWorkoutDays: workoutDays =>
            dispatch(
                setWorkoutDays({
                    workoutDays,
                }),
            ),
        setLevel: level =>
            dispatch(
                setLevel({
                    level,
                }),
            ),
        reset: level => dispatch(reset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
