import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose(
       applyMiddleware(thunk),
       autoRehydrate()
    )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;