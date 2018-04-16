import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { notification, Modal } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Redirect, Route, Switch } from 'react-router-dom';
import { bootstrapHome, hideTerms, toggleAethWallet, toggleEthWallet,
    toggleNavigationModal, toggleOutsideNavigation, navForwardCounterReset,
    navCounterIncrement, showNotification, showTerms } from '../local-flux/actions/app-actions';
import { entryVoteCost } from '../local-flux/actions/entry-actions';
import { gethGetStatus, gethStop } from '../local-flux/actions/external-process-actions';
import { licenseGetAll } from '../local-flux/actions/license-actions';
import { userSettingsAddTrustedDomain, userSettingsSave } from '../local-flux/actions/settings-actions';
import { errorDeleteFatal } from '../local-flux/actions/error-actions';
import { errorMessages, generalMessages } from '../locale-data/messages';
import { DashboardPage, EntryPageContainer, SearchPage, NewTextEntryPage, NewLinkEntryPage } from './';
import { AppErrorBoundary, AppPreferences, ManafyModal, NavigateAwayModal,
    DashboardSecondarySidebar, DataLoader, ErrorNotification, GethDetailsModal, GuestModal, Highlights,
    IpfsDetailsModal, Lists, ListEntries, MyEntries, NavigationModal, NewEntrySecondarySidebar,
    Notification, NotificationsPanel, PageContent, PreviewPanel, ProfileOverviewSecondarySidebar,
    ProfilePage, ProfileEdit, SecondarySidebar, Sidebar, Terms, TopBar,
    TransactionsLogPanel, ProfileSettings, WalletPanel, FullSizeImageViewer, WebPlaceholder,
    FaucetNotification, CustomDragLayer } from '../components';
import { isInternalLink, removePrefix } from '../utils/url-utils';
import { selectLoggedEthAddress, selectBalance } from '../local-flux/selectors/index';
import { guestAddress } from '../constants/guest-address';

notification.config({
    top: 60,
    duration: 0
});

/*
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)
usage <AppRoute exact path="/foo" layout={MainLayout} component={Foo} />
*/

class AppContainer extends Component {
    state = { gethErr: false };
    bootstrappingHome = false;
    // pass previousLocation to Switch when we need to render Entry Page as an overlay
    previousLocation = this.props.location;

    componentDidMount () {
        const { history } = this.props;
        this._bootstrapApp(this.props);
        // keep track of location so we can block navigation when it would logout
        // on app refresh counters get reset
        // we also reset the back navigation counter whenever user logs out in auth.js
        // or when a new profile is created, in new-identity-interests
        history.listen((location, action) => {
            const isInternal = isInternalLink(location.pathname);
            if (isInternal) {
                location.pathname = removePrefix(location.pathname);
            }
            if (action === 'PUSH' || isInternal) {
                this.props.navCounterIncrement('back');
                this.props.navForwardCounterReset();
            }
        });
    }

    componentWillReceiveProps (nextProps) {
        const { errorState, intl } = nextProps;
        this._bootstrapApp(nextProps);
        if (errorState.get('fatalErrors').size) {
            const error = errorState.getIn(['byId', errorState.get('fatalErrors').first()]);
            const content = error.get('messageId') ?
                intl.formatMessage(errorMessages[error.get('messageId')]) :
                error.get('message');
            const modal = Modal.error({
                content,
                okText: intl.formatMessage(generalMessages.ok),
                onOk: () => { this.props.errorDeleteFatal(); modal.destroy(); },
                title: intl.formatMessage(errorMessages.fatalError),
            });
        }
        const gethErr = errorState.get('byId').some(err => err.get('code') === 'GSE01');
        if (gethErr) {
            this.props.gethStop();
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.setState({ gethErr: true });
        }
    }

    componentWillUpdate (nextProps) {
        const { location } = this.props;
        // set previousLocation if props.location is not overlay
        if (nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.overlay)
        ) {
            this.previousLocation = this.props.location;
        }
    }

    acceptTerms =  () => {
        const { hideTerms, loggedEthAddress, userSettingsSave } = this.props;
        hideTerms();
        userSettingsSave(loggedEthAddress, { termsAccepted: true });
    }

    declineTerms = () => {
        const { hideTerms } = this.props;
        hideTerms();
        window.location = "https://akasha.world";
    }

    // all bootstrapping logic should be here
    // avoid spreading it over multiple components/containers
    _bootstrapApp = (props) => { //eslint-disable-line complexity
        const { location, appState, web3, loggedEthAddress, userSettings } = props;
        const nonLoginRoutes = ['/setup'];
        const shouldBootstrapHome = !nonLoginRoutes.every(route =>
            location.pathname === '/' || location.pathname.includes(route)
        );
        const termsAccepted = userSettings.get('termsAccepted');

        // when home bootstrapping finishes reset the flag
        if (appState.get('homeReady') && this.bootstrappingHome) {
            this.bootstrappingHome = false;
            // after user settings are loaded show terms if user hasn't accepted yet
            if ((loggedEthAddress !== guestAddress) && !termsAccepted) {
                this.props.showTerms();
            }
        }

        // check if we need to bootstrap home
        if (web3 && shouldBootstrapHome && appState.get('appReady') && !this.bootstrappingHome && !appState.get('homeReady')) {
            this.props.bootstrapHome();

            // make requests for geth status every 30s for updating the current block
            this.props.gethGetStatus();
            if (!this.interval) {
                this.interval = setInterval(this.props.gethGetStatus, 30000);
            }
            this.bootstrappingHome = true;
        }
    }

    componentWillUnmount () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render () { // eslint-disable-line complexity
        const { activeDashboard, appState, balance, history, hideTerms, intl, location, loggedEthAddress,
            needEth, needAeth, needMana, showTerms, web3, unlocked, userSettings } = this.props;

        if (!web3 || this.state.gethErr) {
            return (
              <WebPlaceholder
                appState={appState}
                hideTerms={hideTerms}
                showTerms={showTerms}
                gethErr={this.state.gethErr}
              />
            )
        }
        const showGethDetailsModal = appState.get('showGethDetailsModal');
        const showGuestModal = appState.get('showGuestModal');
        const showIpfsDetailsModal = appState.get('showIpfsDetailsModal');
        const showWallet = appState.get('showWallet');
        const isOverlay = location.state && location.state.overlay && this.previousLocation !== location;
        const needFunds = needEth || needAeth;
        const ethBalance = balance.get('eth');
        const noFunds = ethBalance && !Number(ethBalance) && !Number(balance.getIn(['aeth', 'total']));
        const initialFaucet = loggedEthAddress && loggedEthAddress !== guestAddress && noFunds;
        const showFaucetNotification = needFunds || initialFaucet;
        const termsAccepted = userSettings.get('termsAccepted');
        const isGuest = loggedEthAddress === guestAddress;

        return (
          <div className="flex-center-x app-container__root">
            <DataLoader flag={!appState.get('appReady')} size="large" style={{ paddingTop: '100px' }}>
              <div className="container fill-height app-container">
                <AppErrorBoundary
                  showNotification={this.props.showNotification}
                >
                  {location.pathname === '/' && <Redirect to="/dashboard" />}
                  {isGuest &&
                    (location.pathname.startsWith('/draft') || location.pathname.startsWith('/profileoverview')) &&
                    <Redirect to="/dashboard" />
                  }
                  {isInternalLink(location.pathname) && <Redirect to={removePrefix(location.pathname)} />}
                  {!location.pathname.startsWith('/setup') &&
                    <DataLoader flag={!appState.get('homeReady')} size="large" style={{ paddingTop: '100px' }}>
                      <div>
                        {activeDashboard && location.pathname === '/dashboard' &&
                          <Redirect to={`/dashboard/${activeDashboard}`} />
                        }
                        <SecondarySidebar shown={appState.get('showSecondarySidebar')}>
                          <Route path="/dashboard/:dashboardId?" component={DashboardSecondarySidebar} />
                          <Route path="/draft/:draftType/:draftId" component={NewEntrySecondarySidebar} />
                          <Route path="/profileoverview/:title" component={ProfileOverviewSecondarySidebar} />
                        </SecondarySidebar>
                        <PageContent showSecondarySidebar={appState.get('showSecondarySidebar')}>
                          <Route exact path="/@:akashaId" component={ProfilePage} />
                          <Route exact path="/0x:ethAddress" component={ProfilePage} />
                          {unlocked &&
                            <Route path="/profileoverview/myentries" component={MyEntries} />
                          }
                          {unlocked &&
                            <Route path="/profileoverview/highlights" component={Highlights} />
                          }
                          {unlocked &&
                            <Route exact path="/profileoverview/lists" component={Lists} />
                          }
                          {unlocked &&
                            <Route path="/profileoverview/lists/:listId" component={ListEntries} />
                          }
                          {unlocked &&
                            <Route path="/profileoverview/settings" component={ProfileSettings} />
                          }
                          {unlocked &&
                            <Route path="/profileoverview/preferences" component={AppPreferences} />
                          }
                          <Switch location={isOverlay ? this.previousLocation : location}>
                            <Route path="/dashboard/:dashboardId?" component={DashboardPage} />
                            {unlocked &&
                              <Route path="/draft/article/:draftId" component={NewTextEntryPage} />
                            }
                            {unlocked &&
                              <Route path="/draft/link/:draftId" component={NewLinkEntryPage} />
                            }                       
                            <Route path="/@:akashaId/:entryId/:version?" component={EntryPageContainer} />
                            <Route path="/0x:ethAddress/:entryId/:version?" component={EntryPageContainer} />
                            <Route path="/search" component={SearchPage} />
                          </Switch>
                          {isOverlay &&
                            <div>
                              <Route path="/@:akashaId/:entryId/:version?" component={EntryPageContainer} />
                              <Route path="/0x:ethAddress/:entryId/:version?" component={EntryPageContainer} />
                            </div>
                          }
                        </PageContent>
                        <TopBar
                          history={history}
                          intl={intl}
                          location={location}
                          showSecondarySidebar={appState.get('showSecondarySidebar')}
                          unlocked={unlocked}
                        />
                        {!!showWallet &&
                          <WalletPanel
                            showWallet={showWallet}
                            toggleAethWallet={this.props.toggleAethWallet}
                            toggleEthWallet={this.props.toggleEthWallet}
                          />
                        }
                        {!!appState.get('showPreview') &&
                          <PreviewPanel />
                        }
                        {appState.get('showTransactionsLog') &&
                          <TransactionsLogPanel />
                        }
                        {appState.get('showNotificationsPanel') &&
                          <NotificationsPanel />
                        }
                      </div>
                    </DataLoader>
                  }
                </AppErrorBoundary>
                <Sidebar unlocked={unlocked} />
                <FullSizeImageViewer />
                <ErrorNotification />
                <NavigateAwayModal
                  loggedEthAddress={loggedEthAddress}
                  userSettingsAddTrustedDomain={this.props.userSettingsAddTrustedDomain}
                  navigation={appState.get('outsideNavigation')}
                  onClick={this.props.toggleOutsideNavigation}
                />
                {needMana && !needFunds && <ManafyModal />}
                {showFaucetNotification &&
                  <FaucetNotification
                    initialFaucet={initialFaucet}
                    showFaucetNotification={showFaucetNotification}
                  />
                }
                {showGethDetailsModal && <GethDetailsModal />}
                {showGuestModal && <GuestModal />}
                {showIpfsDetailsModal && <IpfsDetailsModal />}
                {appState.get('showNavigationModal') &&
                  <NavigationModal toggleNavigationModal={this.props.toggleNavigationModal} />
                }
                {appState.get('showTerms') && 
                  <Terms
                    acceptTerms={this.acceptTerms}
                    declineTerms={this.declineTerms}
                    termsAccepted={termsAccepted}
                    hideTerms={hideTerms}
                  />}
                {appState.get('showProfileEditor') && <ProfileEdit />}
                <CustomDragLayer />
                <Notification />
              </div>
            </DataLoader>
          </div>
        );
    }
}

AppContainer.propTypes = {
    activeDashboard: PropTypes.string,
    appState: PropTypes.shape().isRequired,
    balance: PropTypes.shape().isRequired,
    bootstrapHome: PropTypes.func,
    entryVoteCost: PropTypes.func,
    errorDeleteFatal: PropTypes.func.isRequired,
    errorState: PropTypes.shape().isRequired,
    gethGetStatus: PropTypes.func,
    gethStop: PropTypes.func,
    hideTerms: PropTypes.func.isRequired,
    history: PropTypes.shape(),
    intl: PropTypes.shape(),
    licenseGetAll: PropTypes.func,
    location: PropTypes.shape().isRequired,
    loggedEthAddress: PropTypes.string,
    needEth: PropTypes.bool,
    needAeth: PropTypes.bool,
    needMana: PropTypes.bool,
    toggleAethWallet: PropTypes.func.isRequired,
    toggleEthWallet: PropTypes.func.isRequired,
    toggleNavigationModal: PropTypes.func.isRequired,
    toggleOutsideNavigation: PropTypes.func,
    navForwardCounterReset: PropTypes.func,
    navCounterIncrement: PropTypes.func,
    showNotification: PropTypes.func.isRequired,
    web3: PropTypes.bool,
    unlocked: PropTypes.bool,
    userSettings: PropTypes.shape(),
    userSettingsAddTrustedDomain: PropTypes.func,
    userSettingsSave: PropTypes.func,
    showTerms: PropTypes.func
};

function mapStateToProps (state) {
    return {
        activeDashboard: state.dashboardState.get('activeDashboard'),
        appState: state.appState,
        balance: selectBalance(state),
        errorState: state.errorState,
        faucet: state.profileState.get('faucet'),
        loggedEthAddress: selectLoggedEthAddress(state),
        needEth: state.actionState.get('needEth'),
        needAeth: state.actionState.get('needAeth'),
        needMana: state.actionState.get('needMana'),
        userSettings: state.settingsState.get('userSettings')
    };
}

export { AppContainer };
export default DragDropContext(HTML5Backend)(connect(
    mapStateToProps,
    {
        bootstrapHome,
        entryVoteCost,
        errorDeleteFatal,
        gethGetStatus,
        gethStop,
        hideTerms,
        licenseGetAll,
        toggleAethWallet,
        toggleEthWallet,
        toggleNavigationModal,
        toggleOutsideNavigation,
        navCounterIncrement,
        navForwardCounterReset,
        userSettingsAddTrustedDomain,
        userSettingsSave,
        showTerms,
        showNotification
    }
)(injectIntl(AppContainer)));
