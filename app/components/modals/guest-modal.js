import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Modal } from 'antd';
import { generalMessages } from '../../locale-data/messages';
import { toggleGuestModal } from '../../local-flux/actions/app-actions';

const GuestModal = (props) => (
  <Modal
    footer={null}
    onCancel={props.toggleGuestModal}
    visible
    wrapClassName="guest-modal"
  >
    <div>
      <div className="guest-modal__helper-icon" />
      <div className="guest-modal__unlock">
        {props.intl.formatMessage(generalMessages.loginUnlock)}
      </div>
      <div className="guest-modal__info">
        {props.intl.formatMessage(generalMessages.unlockVault)}
      </div>
    </div>
  </Modal>
);

GuestModal.propTypes = {
    intl: PropTypes.shape().isRequired,
    toggleGuestModal: PropTypes.func.isRequired,
};

export default connect(
    () => ({}),
    {
        toggleGuestModal
    }
)(injectIntl(GuestModal));
