import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setWorkoutDays} from '../reducers/userSlice';
import DefaultButton from '../components/DefaultButton';

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

const BoldText = styled.Text`
    font-weight: bold;
`;

const DaysArea = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const DayText = styled.Text`
    color: ${props => (props.color ? props.color : false)};
    font-weight: bold;
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
                <NextButton title="Próximo" onPress={nextAction} />
            ),
        });
    }, [userData.workoutDays]);

    const nextAction = () => {
        if (!userData.workoutDays || userData.workoutDays.length == 0) {
            alert('Você precisa treinar pelo menos 1 dia!');
            return;
        }

        navigation.navigate('StarterNivel');
    };

    const toggleDay = d => {
        if (!props.workoutDays.includes(d)) {
            props.setWorkoutDays([...props.workoutDays, d]);
        } else {
            let newArray = props.workoutDays.filter(i => i != d);
            props.setWorkoutDays([...newArray]);
        }
    };

    let firstName = userData.name.split(' ')[0];
    let buttonWidth = '120px';
    let marginBottomButtons = 20;
    let daySelectedButtonColor = '#A5E8BC';
    let daySelectedUnderlayButtonColor = '#CCC';
    let daySelectedFontColor = '#000';
    let dayNotSelectedFontColor = '#000';

    return (
        <Container>
            <HeaderText>
                Opa <BoldText>{firstName}</BoldText>, tudo bem?
            </HeaderText>
            <HeaderText>
                Quais <BoldText>dias da semana</BoldText> você pretende treinar?
            </HeaderText>
            <DaysArea>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(1)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(1)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(1)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Segunda
                    </DayText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(2)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(2)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(2)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Terça
                    </DayText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(3)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(3)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(3)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Quarta
                    </DayText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(4)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(4)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(4)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Quinta
                    </DayText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(5)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(5)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(5)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Sexta
                    </DayText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(6)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(6)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(6)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Sábado
                    </DayText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.workoutDays.includes(0)
                            ? daySelectedButtonColor
                            : ''
                    }
                    underlayColor={daySelectedUnderlayButtonColor}
                    onPress={() => toggleDay(0)}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <DayText
                        color={
                            props.workoutDays.includes(0)
                                ? daySelectedFontColor
                                : dayNotSelectedFontColor
                        }>
                        Domingo
                    </DayText>
                </DefaultButton>
            </DaysArea>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        name: state.userSlice.name,
        workoutDays: state.userSlice.workoutDays,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setWorkoutDays: workoutDays => dispatch(setWorkoutDays({workoutDays})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
