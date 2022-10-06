import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-left: 30px;
    margin-right: 30px;
`;
const WelcomeText = styled.Text`
    font-size: 22px;
    color: #333;
    margin-top: 50px;
`;
const WelcomeImage = styled.View`
    flex: 1;
    justify-content: center;
`;
const WelcomeLogo = styled.Image`
    width: 200px;
    height: 200px;
`;
const BeginConfigArea = styled.View`
    width: 100%;
    margin-bottom: 50px;
`;
const ButtonText = styled.Text`
    color: #fff;
`;

const Page = props => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null,
        });
    }, []);

    const start = () => {
        navigation.navigate('StarterName');
    };

    return (
        <Container>
            <WelcomeText>Bem vindo(a) ao DevFit</WelcomeText>
            <WelcomeImage>
                <WelcomeLogo source={require('../assets/boneco.png')} />
            </WelcomeImage>
            <BeginConfigArea>
                <DefaultButton
                    width="100%"
                    bgcolor="#0072C0"
                    underlayColor="0BA7C6"
                    onPress={start}>
                    <ButtonText>Iniciar Configuração</ButtonText>
                </DefaultButton>
            </BeginConfigArea>
        </Container>
    );
};

export default Page;
