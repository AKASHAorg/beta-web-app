import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Modal, Tooltip } from 'antd';
import classNames from 'classnames';
import { Balance, Icon, ServiceStatusBar } from '../';
import { generalMessages, profileMessages } from '../../locale-data/messages';

const TopBarRight = (props) => {
    const { balance, hasPendingActions, intl, notificationsLoaded, notificationsPanelOpen,
        showNotificationsPanel, showTransactionsLog, showWallet, toggleAethWallet, toggleEthWallet,
        toggleGuestModal, transactionsLogOpen, unreadNotifications, unlocked } = props;
    const ethClass = classNames('top-bar-right__balance', {
        'top-bar-right__balance_selected': showWallet === 'ETH'
    });
    const aethClass = classNames('top-bar-right__balance', {
        'top-bar-right__balance_selected': showWallet === 'AETH'
    });
    const activityClass = classNames('content-link top-bar-right__activity-icon', {
        'top-bar-right__activity-icon_selected': transactionsLogOpen
    });
    const notificationsClass = classNames('content-link top-bar-right__notifications-icon', {
        'top-bar-right__notifications-icon_selected': notificationsPanelOpen
    });
    return (
      <div className="top-bar-right">
        <div className="flex-center-y top-bar-right__services">
          <ServiceStatusBar />
        </div>
        {(unlocked===true)?
          (<div className="flex-center-y">
            <div className="flex-center-y top-bar-right__icon-wrapper">
              <Tooltip title={intl.formatMessage(generalMessages.notifications)}>
                <Icon
                  className={notificationsClass}
                  onClick={showNotificationsPanel}
                  type="notifications"
                />
              </Tooltip>
              {notificationsLoaded && !!unreadNotifications &&
                <div
                  className="flex-center top-bar-right__notifications-indicator"
                  onClick={showNotificationsPanel}
                >
                  {unreadNotifications}
                </div>
              }
            </div>
            <div className="flex-center-y top-bar-right__icon-wrapper">
              <Tooltip title={intl.formatMessage(profileMessages.transactionsLog)}>
                <Icon
                  className={activityClass}
                  onClick={showTransactionsLog}
                  type="activity"
                />
              </Tooltip>
              {hasPendingActions &&
                <div className="top-bar-right__pending-indicator" onClick={showTransactionsLog} />
              }
            </div>
            <div className={ethClass} onClick={toggleEthWallet}>
              <Balance balance={balance.get('eth')} short type="eth" />
            </div>
            <div className={aethClass} onClick={toggleAethWallet}>
              <Balance balance={balance.getIn(['aeth', 'free'])} short type="aeth" />
            </div>
          </div>) :
          (
            <div className="flex-center-y top-bar-right__guest" onClick={toggleGuestModal}>
              {intl.formatMessage(generalMessages.guestMode)}
            </div>
          )}
      </div>
    );
};

TopBarRight.propTypes = {
    balance: PropTypes.shape().isRequired,
    hasPendingActions: PropTypes.bool,
    intl: PropTypes.shape().isRequired,
    notificationsLoaded: PropTypes.bool,
    notificationsPanelOpen: PropTypes.bool,
    showNotificationsPanel: PropTypes.func.isRequired,
    showTransactionsLog: PropTypes.func.isRequired,
    showWallet: PropTypes.string,
    toggleAethWallet: PropTypes.func.isRequired,
    toggleEthWallet: PropTypes.func.isRequired,
    toggleGuestModal: PropTypes.func.isRequired,
    transactionsLogOpen: PropTypes.bool,
    unreadNotifications: PropTypes.number.isRequired,
    unlocked: PropTypes.bool
};

export default injectIntl(TopBarRight);
