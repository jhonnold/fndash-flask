import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';
import rootSaga from './sagas';
import configureStore from './store';
import Routes from './containers/Routes';

const history = createHistory();
const store = configureStore(history);

store.runSaga(rootSaga);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
