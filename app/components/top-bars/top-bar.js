import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { DashboardTopBar, ProfilePageTopBar, TopBarRight } from '../';
import { showNotificationsPanel, showTransactionsLog, toggleAethWallet,
    toggleEthWallet, toggleGuestModal } from '../../local-flux/actions/app-actions';
import { selectBalance, selectEntryFlag, selectFullEntry, selectLoggedProfile,
    selectLoggedProfileData, selectNotificationsPanel, selectPublishingActions, selectShowWallet,
    selectTransactionsLog, selectUnreadNotifications } from '../../local-flux/selectors';

class TopBar extends PureComponent {
    _renderComponent = (Component, injectedProps) =>
        props => <Component {...injectedProps} {...props} />;

    render () {
        const { balance, fullEntry, hasPendingActions, notificationsLoaded, notificationsPanelOpen,
            showSecondarySidebar, showWallet, transactionsLogOpen, unreadNotifications, unlocked } = this.props;
        const className = classNames('flex-center-y top-bar', {
            'top-bar_full': !showSecondarySidebar || fullEntry,
            'top-bar_default': !fullEntry
        });
        return (
          <div className={className}>
            <div className="top-bar__left-side">
              <Switch>
                <Route
                  component={DashboardTopBar}
                  path="/dashboard/:dashboardId?"
                />
                <Route exact path="/0x:ethAddress" component={ProfilePageTopBar} />
              </Switch>
            </div>
            <TopBarRight
              balance={balance}
              hasPendingActions={hasPendingActions}
              notificationsLoaded={notificationsLoaded}
              notificationsPanelOpen={notificationsPanelOpen}
              showNotificationsPanel={this.props.showNotificationsPanel}
              showTransactionsLog={this.props.showTransactionsLog}
              showWallet={showWallet}
              toggleAethWallet={this.props.toggleAethWallet}
              toggleEthWallet={this.props.toggleEthWallet}
              toggleGuestModal={this.props.toggleGuestModal}
              transactionsLogOpen={transactionsLogOpen}
              unreadNotifications={unreadNotifications}
              unlocked={unlocked}
            />
          </div>
        );
    }
}

TopBar.propTypes = {
    balance: PropTypes.shape().isRequired,
    fullEntry: PropTypes.bool,
    hasPendingActions: PropTypes.bool,
    history: PropTypes.shape(),
    loggedProfile: PropTypes.shape(),
    loggedProfileData: PropTypes.shape(),
    notificationsLoaded: PropTypes.bool,
    notificationsPanelOpen: PropTypes.bool,
    showNotificationsPanel: PropTypes.func.isRequired,
    showSecondarySidebar: PropTypes.bool,
    showTransactionsLog: PropTypes.func.isRequired,
    showWallet: PropTypes.string,
    toggleAethWallet: PropTypes.func.isRequired,
    toggleEthWallet: PropTypes.func.isRequired,
    toggleGuestModal: PropTypes.func.isRequired,
    transactionsLogOpen: PropTypes.bool,
    unreadNotifications: PropTypes.number.isRequired,
    unlocked: PropTypes.bool
};

const mapStateToProps = state => ({
    balance: selectBalance(state),
    fullEntry: !!selectFullEntry(state) || !!selectEntryFlag(state, 'fetchingFullEntry'),
    hasPendingActions: !!selectPublishingActions(state).size,
    loggedProfile: selectLoggedProfile(state),
    loggedProfileData: selectLoggedProfileData(state),
    notificationsLoaded: state.notificationsState.get('notificationsLoaded'),
    notificationsPanelOpen: selectNotificationsPanel(state),
    showWallet: selectShowWallet(state),
    transactionsLogOpen: selectTransactionsLog(state),
    unreadNotifications: selectUnreadNotifications(state)
});

export default connect(
    mapStateToProps,
    {
        showNotificationsPanel,
        showTransactionsLog,
        toggleAethWallet,
        toggleEthWallet,
        toggleGuestModal
    },
    null,
    { pure: false }
)(withRouter(injectIntl(TopBar)));
