import {
    configureStore,
    createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import rootReducer from './reducers/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
    whiteList: ['userSlice'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: pReducer,
    //middleware: [immutableInvariantMiddleware],
    /*middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: {
                ignoredPaths: [
                    'ignoredPath',
                    'ignoredNested.one',
                    'ignoredNested.two',
                ],
            },
            serializableCheck: false,
        }),*/
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}),
});
export const persistor = persistStore(store);
