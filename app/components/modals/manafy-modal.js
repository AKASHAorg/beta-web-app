import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Button } from 'antd';
import { selectLoggedEthAddress } from '../../local-flux/selectors/index';
import { actionDelete, actionResetFundingRequirements } from '../../local-flux/actions/action-actions';
import { profileResetFaucet } from '../../local-flux/actions/profile-actions';
import { NoMana } from '../';
import * as actionStatus from '../../constants/action-status';
import { generalMessages } from '../../locale-data/messages';

class FaucetAndManafyModal extends Component {
    _getModalContent = () => {
        const { needMana } = this.props;
        if (needMana) {
            return <NoMana />;
        }
        return null;
    }
    _deleteNeedAuthActions = () =>
        this.props.pendingActions.filter(action => action.get('status') === actionStatus.needAuth)
            .forEach(action => this.props.actionDelete(action.get('id')));

    _handleModalCancel = () => {
        this.props.actionResetFundingRequirements();
        this.props.profileResetFaucet();
    }

    _handleModalOk = () => {
        const {needMana } = this.props;
        if (needMana) {
            window.open('http://akasha.helpscoutdocs.com/article/21-how-to-manafy-aeth', '_blank');
            this.props.actionResetFundingRequirements();
        }
        this._deleteNeedAuthActions();
    }

    _getModalTitle = () => {
        const { needMana, intl } = this.props;
        if (needMana) {
            return <div>{intl.formatMessage(generalMessages.transformAethers)}</div>;
        }
        return null;
    }
    render () {
        const { needMana, intl } = this.props;
        return (
          <div>
            <Modal
              visible
              title={this._getModalTitle()}
              onOk={this._handleModalOk}
              onCancel={this._handleModalCancel}
              footer={[
                <Button
                  key="back"
                  onClick={this._handleModalCancel}
                >
                  {intl.formatMessage(generalMessages.cancel)}
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={this._handleModalOk}
                >
                  {needMana &&
                    intl.formatMessage(generalMessages.learnMore)
                  }
                </Button>,
              ]}
            >
              {this._getModalContent()}
            </Modal>
          </div>
        );
    }
}
FaucetAndManafyModal.propTypes = {
    actionDelete: PropTypes.func,
    actionResetFundingRequirements: PropTypes.func,
    intl: PropTypes.shape(),
    loggedEthAddress: PropTypes.string,
    needMana: PropTypes.bool,
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
        needMana: state.actionState.get('needMana'),
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
        profileResetFaucet,
    }
)(injectIntl(FaucetAndManafyModal));
