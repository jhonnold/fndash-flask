import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import rootSaga from './sagas';
import configureStore from './store';
import Routes from './containers/Routes';
import { theme } from './assets/constants/colors';

const history = createHistory();
const store = configureStore(history);

const isLocalHost = hostname => !!(
  hostname === 'localhost'
    || hostname === '[::1]'
    || hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

ReactGA.initialize('UA-136695217-1');
ReactGA.pageview(window.location.pathname + window.location.search);

history.listen((location) => {
  window.scrollTo(0, 0);
  if (!isLocalHost(window.location.hostname)) ReactGA.pageview(location.pathname + location.search);
});

store.runSaga(rootSaga);

const App = () => {
  if (
    window.location
    && window.location.protocol === 'http:'
    && !isLocalHost(window.location.hostname)
  ) {
    window.location.href = window.location.href.replace(/^http(?!s)/, 'https');
    return null;
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(module)(App);
