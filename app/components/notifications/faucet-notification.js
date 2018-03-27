import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { notification } from 'antd';
import * as actionTypes from '../../constants/action-types';
import { notificationMessages, generalMessages } from '../../locale-data/messages';
import { Icon } from '../';

const notificationKey = 'faucet-notification';

class FaucetNotification extends Component {
    componentDidMount () {
        const { intl } = this.props;
        notification.open({
            key: notificationKey,
            className: 'faucet-notification',
            message: (
              <div>
                {intl.formatMessage(notificationMessages.welcomeTitle)}
                <Icon className="emoji-hug" width="20" height="20" type="emojiHug" />
              </div>
            ),
            description: (
              <div>
                <span>{intl.formatMessage(notificationMessages.welcomeMessage)}</span>
                <a className="faucet-notification__link" href="#" onClick={this.onClick}>
                  {intl.formatMessage(generalMessages.here)}
                </a>
              </div>   
            ),
            icon: (
              <Icon className="faucet-notification__icon" type="akashaWelcome" />
            ),
        });
    }

    onClick = (ev) => {
        ev.preventDefault();
        const { actionAdd, loggedEthAddress } = this.props;
        notification.close(notificationKey);        
        actionAdd(loggedEthAddress, actionTypes.faucet, { ethAddress: loggedEthAddress });
    };

    render () {
        return null;
    }
}

FaucetNotification.propTypes = {
    actionAdd: PropTypes.func,
    intl: PropTypes.shape().isRequired,
    loggedEthAddress: PropTypes.string,
};

export default injectIntl(FaucetNotification);
