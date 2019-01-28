import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// eslint-disable-next-line
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

const configureStore = (history, initialState = {}) => {
  const persistConfig = {
    key: 'root',
    storage,
  };

  const reducer = combineReducers({
    // Add reducers here...
    theme: (state = {}) => state,
  });

  const routedReducer = connectRouter(history)(reducer);
  const persistedReducer = persistReducer(persistConfig, routedReducer);

  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger({ collapsed: () => true });
  const routeMiddleware = routerMiddleware(history);
  const middleware = process.env.NODE_ENV === 'development' ? [routeMiddleware, logger, sagaMiddleware] : [routeMiddleware, sagaMiddleware];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  return {
    ...createStore(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(...middleware)),
    ),
    runSaga: sagaMiddleware.run,
  };
};

export default configureStore;
