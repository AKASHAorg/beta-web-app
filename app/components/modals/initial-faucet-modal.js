import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal, Button } from 'antd';
import { actionAdd } from '../../local-flux/actions/action-actions';
import { selectLoggedEthAddress } from '../../local-flux/selectors/index';
import * as actionTypes from '../../constants/action-types';
import { generalMessages } from '../../locale-data/messages';

class InitialFaucetModal extends Component {
    state = {
      visible: true
    }
    componentWillMount () {
      const { loggedEthAddress } = this.props;
      this.props.actionAdd(loggedEthAddress, actionTypes.faucet,
        { ethAddress: loggedEthAddress })
    }

    _handleModalOk = () => {
      this.setState({ visible: false });
    }
    render () {
        const { faucetRequested, faucetPending, intl } = this.props;
        return (
          <div>
            <Modal
              visible={this.state.visible}
              title={intl.formatMessage(generalMessages.initialFaucetTitle)}
              onOk={this._handleModalOk}
              onCancel={this._handleModalOk}
              footer={[
                <Button
                  key="submit"
                  type="primary"
                  onClick={this._handleModalOk}
                  // loading={faucetPending}
                >
                  {intl.formatMessage(generalMessages.thanks)}
                </Button>,
              ]}
            >
              <div>
                {intl.formatMessage(generalMessages.initialFaucetInfo)}
              </div>
            </Modal>
          </div>
        );
    }
}
InitialFaucetModal.propTypes = {
    actionDelete: PropTypes.func,
    actionResetFundingRequirements: PropTypes.func,
    intl: PropTypes.shape(),
    loggedEthAddress: PropTypes.string,
    pendingActions: PropTypes.shape(),
    faucetRequested: PropTypes.string,
    faucetPending: PropTypes.bool,
    actionAdd: PropTypes.func,
    profileResetFaucet: PropTypes.func,
};

function mapStateToProps (state) {
    return {
        loggedEthAddress: selectLoggedEthAddress(state),
        faucetRequested: state.profileState.get('faucet'),
        faucetPending: state.actionState.getIn(['pending', 'faucet']),
    };
}

export default connect(
    mapStateToProps,
    {
        actionAdd
    }
)(injectIntl(InitialFaucetModal));
