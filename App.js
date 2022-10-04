import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Text} from 'react-native';

import {store, persistor} from './src/store';
export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Text>Hello</Text>
        </PersistGate>
    </Provider>
);
