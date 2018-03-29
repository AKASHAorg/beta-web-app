import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Button, Popover, Switch, Tooltip } from 'antd';
import serviceState from '../constants/serviceState';
import { gethStart, gethStop, ipfsStart, ipfsStop } from '../local-flux/actions/external-process-actions';
import { ipfsSaveSettings } from '../local-flux/actions/settings-actions';
import { formMessages, generalMessages, setupMessages } from '../locale-data/messages';
import { Icon, Input } from './';

const IS_EMPTY = 'requiredError';
const INVALID_CHARACTER = 'storageNameInvalid';

class ServiceStatusBar extends Component {
    state = {
        gethPopoverVisible: false,
        ipfsPopoverVisible: false,
        storagePath: this.props.ipfsSettings.get('storagePath'),
        storagePathError: null
    };

    getCircleColor = (state) => {
        switch (state) {
            case serviceState.stopped:
                return 'Red';
            case serviceState.downloading:
            case serviceState.starting:
            case serviceState.upgrading:
                return 'Orange';
            case serviceState.started:
                return 'Green';
            default:
                return '';
        }
    };

    getIpfsState () {
        const { ipfsStarting, ipfsStatus } = this.props;
        let ipfsState = serviceState.stopped;

        if (ipfsStatus.get('downloading')) {
            ipfsState = serviceState.downloading;
        } else if (ipfsStatus.get('upgrading')) {
            ipfsState = serviceState.upgrading;
        } else if (ipfsStatus.get('started') || ipfsStatus.get('process')) {
            ipfsState = serviceState.started;
        } else if (ipfsStarting || ipfsStatus.get('starting')) {
            ipfsState = serviceState.starting;
        }
        return ipfsState;
    }

    getGethState () {
        const { gethStarting, gethStatus } = this.props;
        let gethState = serviceState.stopped;

        if (gethStatus.get('downloading')) {
            gethState = serviceState.downloading;
        } else if (gethStatus.get('upgrading')) {
            gethState = serviceState.upgrading;
        } else if (gethStatus.get('started') || gethStatus.get('process')) {
            gethState = serviceState.started;
        } else if (gethStarting || gethStatus.get('starting')) {
            gethState = serviceState.starting;
        }
        return gethState;
    }

    getTooltip (state) {
        const { intl } = this.props;
        switch (state) {
            case serviceState.starting:
                return intl.formatMessage(generalMessages.starting);
            case serviceState.downloading:
                return intl.formatMessage(generalMessages.downloading);
            case serviceState.started:
                return intl.formatMessage(generalMessages.running);
            case serviceState.stopped:
                return intl.formatMessage(generalMessages.stopped);
            case serviceState.upgrading:
                return intl.formatMessage(generalMessages.upgrading);
            default:
                return intl.formatMessage(generalMessages.stopped);
        }
    }

    saveSettings = () => {
        const { storagePath } = this.state;
        this.setState({
            ipfsPopoverVisible: false
        });
        this.props.ipfsSaveSettings({ storagePath }, true);
    };

    onGethVisibleChange = (visible) => {
        this.setState({
            gethPopoverVisible: visible
        });
    };

    onIpfsVisibleChange = (visible) => {
        this.setState({
            ipfsPopoverVisible: visible,
            storagePath: this.props.ipfsSettings.get('storagePath'),
            storagePathError: null
        });
    };

    onPathChange = (ev) => {
        let error = null;
        if (!ev.target.value) {
            error = IS_EMPTY;
        } else if (ev.target.value.includes('/')) {
            error = INVALID_CHARACTER;
        }
        this.setState({
            storagePath: ev.target.value,
            storagePathError: error
        });
    };

    onGethToggle = () => {
        this.props.gethStatus.get('process') ?
            this.props.gethStop() :
            this.props.gethStart();
    };

    renderGethPopover = () => {
        const { gethBusyState, gethStatus, intl } = this.props;
        const toggleLabel = gethStatus.get('process') ?
            intl.formatMessage(generalMessages.gethServiceOn) :
            intl.formatMessage(generalMessages.gethServiceOff);

        return (
          <div>
            <div className="service-status-bar__title">
              {gethStatus.get('version')}
            </div>
            <div className="service-status-bar__description">
              {intl.formatMessage(setupMessages.gethDescription)}
            </div>
            <div className="service-status-bar__actions">
              <div className="service-status-bar__actions-left">
                <Switch
                  checked={gethStatus.get('process')}
                  disabled={gethBusyState}
                  onChange={this.onGethToggle}
                  style={{ marginRight: '10px' }}
                />
                <div className="service-status-bar__toggle-label">
                  {toggleLabel}
                </div>
              </div>
            </div>
          </div>
        );
    };

    renderIpfsPopover = () => {
        const { intl, ipfsBusyState, ipfsSettings, ipfsStatus } = this.props;
        const { storagePath, storagePathError } = this.state;
        const toggleLabel = ipfsStatus.get('process') ?
            intl.formatMessage(generalMessages.ipfsServiceOn) :
            intl.formatMessage(generalMessages.ipfsServiceOff);
        const onToggle = ipfsStatus.get('process') ?
            this.props.ipfsStop :
            this.props.ipfsStart;
        const storageChanged = storagePath !== ipfsSettings.get('storagePath');
        const saveDisabled = storagePathError || ipfsBusyState || !storageChanged;

        return (
          <div>
            <div className="service-status-bar__title">              
              {intl.formatMessage(generalMessages.version)} {ipfsStatus.get('version')}
            </div>
            <div className="service-status-bar__description">
              {intl.formatMessage(setupMessages.ipfsDescription)}
            </div>
            <div className="service-status-bar__input-wrapper">
              <Input
                label={intl.formatMessage(setupMessages.ipfsStorageName)}
                onChange={this.onPathChange}
                value={storagePath}
              />
              {storagePathError &&
                <div className="service-status-bar__error">
                  {intl.formatMessage(formMessages[storagePathError])}
                </div>
              }
            </div>
            <div className="service-status-bar__actions">
              <div className="service-status-bar__actions-left">
                <Switch
                  checked={ipfsStatus.get('process')}
                  disabled={ipfsBusyState}
                  onChange={onToggle}
                  style={{ marginRight: '10px' }}
                />
                <div className="service-status-bar__toggle-label">
                  {toggleLabel}
                </div>
              </div>
              <div className="service-status-bar__actions-right">
                <Button
                  disabled={saveDisabled}
                  onClick={this.saveSettings}
                  type="primary"
                >
                  <div className="service-status-bar__button-label">
                    {intl.formatMessage(generalMessages.save)}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        );
    };

    render () {
        const { gethPopoverVisible, ipfsPopoverVisible } = this.state;
        const gethState = this.getGethState();
        const ipfsState = this.getIpfsState();
        const gethColor = this.getCircleColor(gethState);
        const ipfsColor = this.getCircleColor(ipfsState);

        return (
          <div className="service-status-bar">
            <Popover
              content={this.renderGethPopover()}
              onVisibleChange={this.onGethVisibleChange}
              placement="bottomLeft"
              trigger="click"
              visible={gethPopoverVisible}
            >
              <Tooltip title={this.getTooltip(gethState)}>
                <div className="content-link flex-center service-status-bar__button">
                  <Icon className="service-status-bar__geth-icon" type="geth" />
                  {gethColor === 'Red' &&
                    <div className="service-status-bar__dot" />
                  }
                </div>
              </Tooltip>
            </Popover>
            <Popover
              content={this.renderIpfsPopover()}
              onVisibleChange={this.onIpfsVisibleChange}
              placement="bottomLeft"
              trigger="click"
              visible={ipfsPopoverVisible}
            >
              <Tooltip title={this.getTooltip(ipfsState)}>
                <div className="content-link flex-center service-status-bar__button">
                  <Icon className="service-status-bar__ipfs-icon" type="ipfs" />
                  {ipfsColor === 'Red' &&
                    <div className="service-status-bar__dot" />
                  }
                </div>
              </Tooltip>
            </Popover>
          </div>
        );
    }
}

ServiceStatusBar.propTypes = {
    gethBusyState: PropTypes.bool,    
    gethStart: PropTypes.func.isRequired,
    gethStarting: PropTypes.bool,
    gethStatus: PropTypes.shape().isRequired,
    gethStop: PropTypes.func.isRequired,    
    intl: PropTypes.shape().isRequired,
    ipfsBusyState: PropTypes.bool,
    ipfsSaveSettings: PropTypes.func.isRequired,
    ipfsSettings: PropTypes.shape().isRequired,
    ipfsStart: PropTypes.func.isRequired,
    ipfsStarting: PropTypes.bool,
    ipfsStatus: PropTypes.shape().isRequired,
    ipfsStop: PropTypes.func.isRequired,
};

function mapStateToProps (state) {
    return {
        gethBusyState: state.externalProcState.getIn(['geth', 'flags', 'busyState']),        
        gethStarting: state.externalProcState.getIn(['geth', 'flags', 'gethStarting']),
        gethStatus: state.externalProcState.getIn(['geth', 'status']),
        ipfsBusyState: state.externalProcState.getIn(['ipfs', 'flags', 'busyState']),
        ipfsSettings: state.settingsState.get('ipfs'),
        ipfsStarting: state.externalProcState.getIn(['ipfs', 'flags', 'ipfsStarting']),
        ipfsStatus: state.externalProcState.getIn(['ipfs', 'status']),
    };
}

export { ServiceStatusBar };
export default connect(
    mapStateToProps,
    {
        gethStart,
        gethStop,
        ipfsSaveSettings,
        ipfsStart,
        ipfsStop,
    },
    null,
    { pure: false }
)(injectIntl(ServiceStatusBar));

