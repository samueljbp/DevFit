import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {addProgress, removeProgress} from '../reducers/userSlice';
import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDayStatus from '../components/HomeDayStatus';

const Container = styled.SafeAreaView`
    align-items: center;
`;

const ConfigButtonArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

const ConfigButtonImage = styled.Image`
    width: 25px;
    height: 25px;
`;

const Legend = styled.View`
    width: 90%;
    align-items: flex-start;
    margin-top: 30px;
`;
const LegendText = styled.Text`
    color: #555;
`;
const LegendItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;
const LegendBox = styled.View`
    width: 15px;
    height: 15px;
    background-color: #ccc;
    margin-right: 5px;
`;

const Page = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);
    let today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const ConfigButton = () => {
        const btnAction = () => {
            navigation.navigate('HomeConfig');
        };

        return (
            <ConfigButtonArea onPress={btnAction} underlayColor="transparent">
                <ConfigButtonImage source={require('../assets/config.png')} />
            </ConfigButtonArea>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Seu progresso diário',
            headerRightContainerStyle: {
                paddingRight: 10,
            },
            headerRight: () => <ConfigButton />,
        });
    }, []);

    return (
        <Container>
            <HomeMonthScroll
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />
            <HomeDaysScroll
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}
            />
            <HomeDayStatus
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                dailyProgress={props.dailyProgress}
                workoutDays={props.workoutDays}
                addProgress={props.addProgress}
                removeProgress={props.removeProgress}
                //goToWorkout={navigation.navigate('WorkoutStack')}
            />

            <Legend>
                <LegendText>Legenda:</LegendText>
                <LegendItem>
                    <LegendBox style={{backgroundColor: '#B5EEFF'}}></LegendBox>
                    <LegendText>Hoje</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor: '#B5FFb8'}}></LegendBox>
                    <LegendText>Treino feito</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor: '#FFB5B5'}}></LegendBox>
                    <LegendText>Treino perdido</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox
                        style={{
                            backgroundColor: '#F4F4F4',
                            opacity: 0.6,
                        }}></LegendBox>
                    <LegendText>Dia de descanso</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox style={{backgroundColor: '#F4F4F4'}}></LegendBox>
                    <LegendText>Dia futuro</LegendText>
                </LegendItem>
            </Legend>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        dailyProgress: state.userSlice.dailyProgress,
        workoutDays: state.userSlice.workoutDays,
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
        removeProgress: date =>
            dispatch(
                removeProgress({
                    date,
                }),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
