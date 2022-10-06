import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setLevel} from '../reducers/userSlice';
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

const LevelsArea = styled.View`
    justify-content: center;
    width: 100%;
`;

const LevelText = styled.Text`
    color: ${props => (props.color ? props.color : false)};
    font-weight: bold;
`;

const NextButton = styled.Button``;

const Page = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userSlice);

    let buttonWidth = null;
    let marginBottomButtons = 20;
    let levelSelectedButtonColor = '#A5E8BC';
    let levelSelectedUnderlayButtonColor = '#CCC';
    let levelSelectedFontColor = '#000';
    let levelNotSelectedFontColor = '#000';
    let funnyFrase = '';

    switch (props.workoutDays.length) {
        case 1:
            funnyFrase = 'Só 1 dia não vai adiantar muito, mas...';
            break;
        case 2:
            funnyFrase = '2 dias eu acho pouco mas quem sou eu para te julgar?';
            break;
        case 3:
            funnyFrase = 'Legal, 3 dias dá pro gasto...';
            break;
        case 4:
            funnyFrase = 'Legal, 4 dias vai ser top!';
            break;
        case 5:
            funnyFrase = 'É isso aí, 5 dias é o mínimo, lets GO!';
            break;
        case 6:
            funnyFrase = 'É, 6 dias não é pra todo mundo...';
            break;
        case 7:
            funnyFrase = 'Wooooow! Todo dia?! WTF?!';
            break;
    }

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
    }, [userData.level]);

    const nextAction = () => {
        if (!props.level) {
            alert('Você precisa selecionar um nível!');
            return;
        }

        navigation.navigate('StarterRecomendations');
    };

    const setLevel = l => {
        props.setLevel(l);
    };

    return (
        <Container>
            <HeaderText>{funnyFrase}</HeaderText>
            <HeaderText style={{fontWeight: 'bold'}}>
                Qual seu nível hoje?
            </HeaderText>
            <LevelsArea>
                <DefaultButton
                    bgcolor={
                        props.level == 'begginer'
                            ? levelSelectedButtonColor
                            : ''
                    }
                    underlayColor={levelSelectedUnderlayButtonColor}
                    onPress={() => setLevel('begginer')}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <LevelText
                        color={
                            props.level
                                ? levelSelectedFontColor
                                : levelNotSelectedFontColor
                        }>
                        Iniciante / Um frango
                    </LevelText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.level == 'intermediate'
                            ? levelSelectedButtonColor
                            : ''
                    }
                    underlayColor={levelSelectedUnderlayButtonColor}
                    onPress={() => setLevel('intermediate')}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <LevelText
                        color={
                            props.level
                                ? levelSelectedFontColor
                                : levelNotSelectedFontColor
                        }>
                        Intermediário / Me viro bem
                    </LevelText>
                </DefaultButton>
                <DefaultButton
                    bgcolor={
                        props.level == 'advanced'
                            ? levelSelectedButtonColor
                            : ''
                    }
                    underlayColor={levelSelectedUnderlayButtonColor}
                    onPress={() => setLevel('advanced')}
                    width={buttonWidth}
                    style={{marginBottom: marginBottomButtons}}>
                    <LevelText
                        color={
                            props.level
                                ? levelSelectedFontColor
                                : levelNotSelectedFontColor
                        }>
                        Avançado / Primo do The Rock
                    </LevelText>
                </DefaultButton>
            </LevelsArea>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        workoutDays: state.userSlice.workoutDays,
        level: state.userSlice.level,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLevel: level => dispatch(setLevel({level})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
