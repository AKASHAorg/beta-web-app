import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { notification } from 'antd';
import * as actionTypes from '../../constants/action-types';
import { actionDelete, actionResetFundingRequirements,
    actionAdd } from '../../local-flux/actions/action-actions';
import { profileResetFaucet } from '../../local-flux/actions/profile-actions';
import { notificationMessages, generalMessages } from '../../locale-data/messages';
import { selectLoggedEthAddress } from '../../local-flux/selectors/index';
import * as actionStatus from '../../constants/action-status';
import { Icon } from '../';

const notificationKey = 'faucet-notification';

class FaucetNotification extends Component {
    componentDidMount () {
        const { intl, initialFaucet} = this.props;
        const message = initialFaucet ? 
            (<div>
              {intl.formatMessage(notificationMessages.welcomeTitle)}
              <Icon className="emoji-hug" width="20" height="20" type="emojiHug" />
            </div>) :
            (<div>
              {intl.formatMessage(notificationMessages.noFunds)}
            </div>);

        const description = initialFaucet ?
            (<div>
              <span>{intl.formatMessage(notificationMessages.welcomeMessage)}</span>
              <a className="faucet-notification__link" href="#" onClick={this.onClick}>
                {intl.formatMessage(generalMessages.here)}
              </a>
            </div>) :
            (<div>
              <span>{intl.formatMessage(notificationMessages.renewBalance)}</span>
              <a className="faucet-notification__link" href="#" onClick={this.onClick}>
                {intl.formatMessage(generalMessages.here)}
              </a>
            </div>);

        notification.open({
            key: notificationKey,
            className: 'faucet-notification',
            message,
            description,
            icon: (
              <Icon className="faucet-notification__icon" type="akashaWelcome" />
            ),
        });       
    }

    onClick = (ev) => {
        ev.preventDefault();
        const { actionAdd, actionResetFundingRequirements, loggedEthAddress } = this.props;
        notification.close(notificationKey);        
        actionAdd(loggedEthAddress, actionTypes.faucet, { ethAddress: loggedEthAddress });
        actionResetFundingRequirements();
    };

    _deleteNeedAuthActions = () =>
        this.props.pendingActions.filter(action => action.get('status') === actionStatus.needAuth)
            .forEach(action => this.props.actionDelete(action.get('id')));

    render () {
        return null;
    }
}

FaucetNotification.propTypes = {
    actionAdd: PropTypes.func,
    actionDelete: PropTypes.func,
    actionResetFundingRequirements: PropTypes.func,
    intl: PropTypes.shape(),
    initialFaucet: PropTypes.bool,
    loggedEthAddress: PropTypes.string,
    pendingActions: PropTypes.shape(),
    faucetRequested: PropTypes.string,
    faucetPending: PropTypes.bool,
    profileResetFaucet: PropTypes.func,
};

function mapStateToProps (state) {
    return {
        loggedEthAddress: selectLoggedEthAddress(state),
        needEth: state.actionState.get('needEth'),
        needAeth: state.actionState.get('needAeth'),
        pendingActions: state.actionState.get('byId'),
        faucetRequested: state.profileState.get('faucet'),
        faucetPending: state.actionState.getIn(['pending', 'faucet']),
    };
}

export default connect(
    mapStateToProps,
    {
        actionDelete,
        actionResetFundingRequirements,
        actionAdd,
        profileResetFaucet,
    }
)(injectIntl(FaucetNotification));
