import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigators/MainStack';
import {NativeBaseProvider} from 'native-base';

import {store, persistor} from './src/store';
export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <MainStack />
                </NavigationContainer>
            </NativeBaseProvider>
        </PersistGate>
    </Provider>
);
