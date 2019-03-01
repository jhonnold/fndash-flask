import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import rootSaga from './sagas';
import configureStore from './store';
import Routes from './containers/Routes';
import { theme } from './assets/constants/colors';

const history = createHistory();
const store = configureStore(history);

store.runSaga(rootSaga);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
