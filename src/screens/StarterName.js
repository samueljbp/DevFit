import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setName} from '../reducers/userSlice';

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #fff;
    margin-left: 30px;
    margin-right: 30px;
`;
const HeaderText = styled.Text`
    font-size: 22px;
    color: #333;
    margin-top: 50px;
    margin-bottom: 50px;
`;
const NameInput = styled.TextInput`
    border: 1px solid #ccc;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px;
`;

const NextButton = styled.Button``;

const Page = props => {
    const navigation = useNavigation();
    const route = useRoute();
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
    }, [userData.name]);

    const nextAction = () => {
        if (!userData.name) {
            alert('Você precisa de um nome!');
            return;
        }

        navigation.navigate('StarterDias');
    };

    const handleChangeName = t => {
        props.setName(t);
        navigation.setParams({name: t});
    };

    return (
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput
                value={props.name}
                onChangeText={handleChangeName}
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />
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
        setName: name =>
            dispatch(
                setName({
                    name,
                }),
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
