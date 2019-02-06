import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// eslint-disable-next-line
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import usersReducer from './ducks/users';
import uiReducer from './ducks/ui';
import gamesReducer from './ducks/games';
import chartsReducer from './ducks/charts';

const configureStore = (history, initialState = {}) => {
  const reducer = combineReducers({
    users: usersReducer,
    ui: uiReducer,
    games: gamesReducer,
    charts: chartsReducer,
  });

  const routedReducer = connectRouter(history)(reducer);

  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger({ collapsed: () => true });
  const routeMiddleware = routerMiddleware(history);
  const middleware = process.env.NODE_ENV === 'development' ? [routeMiddleware, logger, sagaMiddleware] : [routeMiddleware, sagaMiddleware];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  return {
    ...createStore(
      routedReducer,
      initialState,
      composeEnhancers(applyMiddleware(...middleware)),
    ),
    runSaga: sagaMiddleware.run,
  };
};

export default configureStore;
