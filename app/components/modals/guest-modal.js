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
  >
    <div>
      <div className="top-bar-right__guest-modal-info">
        {props.intl.formatMessage(generalMessages.guestModeInfo)}
      </div>
      <div>
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
