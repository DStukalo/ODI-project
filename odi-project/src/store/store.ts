import { configureStore, combineReducers } from '@reduxjs/toolkit';

import langReducer from './reducers/LanguageSlice';
import userReducer from './reducers/UserSlice';

const rootReducers = combineReducers({
	userReducer,
	langReducer,
});

export const setupStore = () => configureStore({
	reducer: rootReducers,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
