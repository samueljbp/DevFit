import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const MonthScroll = styled.ScrollView`
    width: 100%;
    height: 60px;
`;
const MonthButton = styled.TouchableHighlight`
    width: ${props => props.width};
    justify-content: center;
    align-items: center;
`;
const MonthItem = styled.View`
    width: 90%;
    height: 30px;
    background-color: #eee;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;
const MonthText = styled.Text``;

let months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const screenWidth = Dimensions.get('window').width;
let thirdW = screenWidth / 3;

export default props => {
    const MonthRef = useRef();
    const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth);

    const handleScrollEnd = e => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetMonth = Math.round(posX / thirdW).toFixed(0);
        setSelectedMonth(targetMonth);
    };

    const scrollToMonth = m => {
        let posX = m * thirdW;
        MonthRef.current.scrollTo({x: posX, y: 0, animated: true});
    };

    useEffect(() => {
        props.setSelectedMonth(selectedMonth);
    }, [selectedMonth]);

    useEffect(() => {
        setTimeout(() => {
            scrollToMonth(selectedMonth);
        }, 10);
    }, [props.selectedMonth]);

    return (
        <MonthScroll
            horizontal={true}
            ref={MonthRef}
            decelerationRate="fast"
            snapToInterval={thirdW}
            contentContainerStyle={{
                paddingLeft: thirdW,
                paddingRight: thirdW,
            }}
            onMomentumScrollEnd={handleScrollEnd}
            showsHorizontalScrollIndicator={false}>
            {months.map((m, k) => (
                <MonthButton
                    key={k}
                    width={thirdW + 'px'}
                    underlayColor="transparent"
                    onPress={() => setSelectedMonth(k)}>
                    <MonthItem
                        style={
                            k == selectedMonth
                                ? {
                                      backgroundColor: '#CCC',
                                      width: '100%',
                                      height: 40,
                                  }
                                : {}
                        }>
                        <MonthText>{m}</MonthText>
                    </MonthItem>
                </MonthButton>
            ))}
        </MonthScroll>
    );
};
