import React from 'react';
import styled from 'styled-components/native';
import {Modal, Platform} from 'react-native';

const ModalBoxArea = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled.View`
    width: 90%;
    padding: 20px;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const ModalHeader = styled.View`
    flex-direction: row;
    width: 90%;
    background-color: #b5eeff;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const ModalClose = styled.TouchableHighlight`
    align-items: center;
    justify-content: center;
    background-color: lightblue;
    margin: 5px;
    padding: 2px 8px;
`;

const CloseText = styled.Text`
    font-size: 20px;
`;

const HeaderTitle = styled.Text`
    margin-left: 10px;
    font-weight: bold;
    font-size: 15px;
`;

const ModalBody = styled.View``;

export default props => {
    return (
        <Modal visible={props.visible} transparent={true} animationType="fade">
            <ModalBoxArea behavior={Platform.OS == 'ios' ? 'padding' : 'null'}>
                <ModalHeader>
                    <HeaderTitle>
                        {props.title ? props.title : 'Atenção'}
                    </HeaderTitle>
                    <ModalClose
                        onPress={props.closeAction}
                        underlayColor="lightblue">
                        <CloseText>X</CloseText>
                    </ModalClose>
                </ModalHeader>
                <ModalBox>
                    <ModalBody>{props.children}</ModalBody>
                </ModalBox>
            </ModalBoxArea>
        </Modal>
    );
};
