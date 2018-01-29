import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHashHistory from 'history/createHashHistory';
import Route from 'react-router-dom/Route';
import { ConnectedRouter } from 'react-router-redux';
import './styles/ant-icons/iconfont.css';
import ConnectedIntlProvider from './connected-intl-provider';
import rootSaga from './local-flux/sagas';
import configureStore from './local-flux/store/configureStore';
import sagaMiddleware from './local-flux/store/sagaMiddleware';
import { AppContainer } from './containers';
import './styles/core.scss';

if (process.env.DARK_THEME) {
    require('./styles/ant-vars/extract-dark-theme.less');
} else {
    require('./styles/ant-vars/extract-default-theme.less');
}

export const bootstrap = (web3Enabled = false) => {
    const history = createHashHistory();
    const store = configureStore();
    sagaMiddleware.run(rootSaga);

    render(
        <Provider store={store}>
            <ConnectedIntlProvider>
                <ConnectedRouter history={history}>
                    <Route render={ (props) => <AppContainer web3={web3Enabled} {...props} />}/>
                </ConnectedRouter>
            </ConnectedIntlProvider>
        </Provider>,
        document.getElementById('root')
    );
};

