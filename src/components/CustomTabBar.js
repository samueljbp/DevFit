import React from 'react';
import styled from 'styled-components/native';

const TabBarArea = styled.SafeAreaView``;
const TabBarItem = styled.View``;
const TabRegular = styled.TouchableHighlight``;

export default props => {
    return (
        <TabBarArea>
            {props.items.map((item, index) => (
                <TabBarItem key={item.route}>
                    {item.type == 'regular' && (
                        <TabRegular>
                            <>
                                <TabImage source={item.icon} />
                                <Text>{item.text}</Text>
                            </>
                        </TabRegular>
                    )}
                    {item.type == 'big' && (
                        <TabBall>
                            <TabBallImage source={item.icon} />
                        </TabBall>
                    )}
                </TabBarItem>
            ))}
        </TabBarArea>
    );
};
