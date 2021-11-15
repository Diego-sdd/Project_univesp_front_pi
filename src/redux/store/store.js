import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storageSession from 'redux-persist/es/storage/session'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/index';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: [
		'authReducer',
		'userDataCompanyReduecer'
	],
	blacklist: [],
	transforms: [
	]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

var store = createStore(
		persistedReducer
	);

let persistor = persistStore(store);

export {
	store,
	persistor,
};