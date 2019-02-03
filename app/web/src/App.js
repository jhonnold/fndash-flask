import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';
import rootSaga from './sagas';
import configureStore from './store';
import Routes from './containers/Routes';

const history = createHistory();
const store = configureStore(history);
const persistor = persistStore(store);

store.runSaga(rootSaga);

// DO SOMETHING BEFORE WE REVEAL THE APP
const beforeReload = () => {};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} onBeforeLift={beforeReload} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default hot(module)(App);
