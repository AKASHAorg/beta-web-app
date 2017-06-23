import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {addLocaleData, IntlProvider} from "react-intl";
import createHashHistory from "history/createHashHistory";
import Route from "react-router-dom/Route";
import {ConnectedRouter} from "react-router-redux";
import en from "react-intl/locale-data/en";
import ru from "react-intl/locale-data/ru";
import ro from "react-intl/locale-data/ro";
import ch from "react-intl/locale-data/zh";
import injectTapEventPlugin from "react-tap-event-plugin";
import ReactPerf from "react-addons-perf";
import rootSaga from "./local-flux/sagas";
import configureStore from "./local-flux/store/configureStore";
import sagaMiddleware from "./local-flux/store/sagaMiddleware";
// import { generalSettingsRequest } from './local-flux/services/settings-service';
import {AppContainer} from "./containers";
import ruMessages from "./locale-data/ru.json";
import zhMessages from "./locale-data/zh.json";
import enMessages from "./locale-data/en.json";
import { profileLogout } from './local-flux/actions/profile-actions';
import "./styles/core.scss";


const localeMessages = {
    en: enMessages,
    ru: ruMessages,
    zh: zhMessages
};


export const bootstrap = (web3Enabled = false) => {
    const DEFAULT_LOCALE = 'en';
    const history = createHashHistory();
    const store = configureStore();
    addLocaleData([...en, ...ru, ...ro, ...ch]);
    sagaMiddleware.run(rootSaga);
    window.Perf = ReactPerf;
    injectTapEventPlugin();
    render(
        <IntlProvider
            locale={DEFAULT_LOCALE}
            messages={localeMessages[DEFAULT_LOCALE]}
        >
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Route render={ (props) => <AppContainer web3={web3Enabled} {...props} />}/>
                </ConnectedRouter>
            </Provider>
        </IntlProvider>,
        document.getElementById('root')
    );
};

