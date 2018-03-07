import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Card } from 'antd';
import { Icon, Terms } from './';
import { generalMessages, placeholderMessages } from '../locale-data/messages';

const WebPlaceholder = (props) => {
    const { appState, intl, hideTerms, showTerms } = props;

    const termsShow = (ev) => {
      ev.preventDefault();
      if (showTerms) return showTerms();
      return null;
    }

    return (
        <div className="web-placeholder">
          <div className="web-placeholder__header">
            <div className="web-placeholder__header-left">
              <Icon type="akasha" />
              <div className="web-placeholder__header-left-title">
                {intl.formatMessage(generalMessages.akasha)}
              </div>
            </div>
            <div className="web-placeholder__header-right">
              <a href="https://www.facebook.com/AkashaProject" target="_blank">
                <Icon type="facebook" />
              </a>
              <a href="https://twitter.com/AkashaProject" target="_blank">
                <Icon type="twitter" />
              </a>
              <a href="https://www.reddit.com/r/AkashaProject" target="_blank">
                <Icon type="reddit" />
              </a>
              <a href="https://discord.gg/2FBvqSe" target="_blank">
                <Icon type="discord" />
              </a>
              <a href="https://github.com/AkashaProject" target="_blank">
                <Icon type="github" />
              </a>
            </div>
          </div>
          <div className="web-placeholder__body">
            <div className="web-placeholder__body-title">
              {intl.formatMessage(placeholderMessages.welcome)}
            </div>
            <div className="web-placeholder__body-subtitle">
              {intl.formatMessage(placeholderMessages.welcomeSubtitle)}
            </div>
            <div className="web-placeholder__card-wrap">
              <div className="web-placeholder__card-wrapper">
                <Card className="web-placeholder__card">
                  <div className="web-placeholder__card-title">
                    {intl.formatMessage(placeholderMessages.downloadDesktopApp)}
                  </div>
                  <div className="web-placeholder__card-subtitle">
                    {intl.formatMessage(placeholderMessages.downloadDesktopAppSubtitle)}
                  </div>
                  <div className="web-placeholder__download-btn">
                    <Button
                      type="primary"
                      target={"_blank"}
                      href={"https://github.com/AkashaProject/dapp/releases"}
                    >
                      {intl.formatMessage(placeholderMessages.download)}
                    </Button>
                  </div>
                  <div className="web-placeholder__terms">
                    <FormattedMessage
                      {...placeholderMessages.terms}
                        values={{
                          termsLink: (
                            <a
                              onClick={termsShow}
                            >
                              {intl.formatMessage(placeholderMessages.termsOfService)}
                            </a>
                          )
                        }}
                    />
                  </div>
                </Card>
              </div>
              <div className="web-placeholder__card-wrapper">
                <Card className="web-placeholder__card">
                  <div className="web-placeholder__card-title">
                    {intl.formatMessage(placeholderMessages.tryBrowser)}
                  </div>
                  <div className="web-placeholder__card-subtitle">
                    {intl.formatMessage(placeholderMessages.tryBrowserSubtitle)}
                  </div>
                  <div className="web-placeholder__icons">
                    <a target={"_blank"} href={"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"}>
                      <div className="web-placeholder__icon-wrap">
                        <div className="web-placeholder__icon-metamask" />
                        {intl.formatMessage(placeholderMessages.getExtension)}
                      </div>
                    </a>
                    <div className="web-placeholder__or">
                      {intl.formatMessage(generalMessages.or)}
                    </div>
                    <a target={"_blank"} href={"https://brave.com/download/"}>
                      <div className="web-placeholder__icon-brave" />
                      {intl.formatMessage(placeholderMessages.getBrave)}
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="web-placeholder__footer">
            <div className="web-placeholder__subfooter">
              <div className="web-placeholder__subfooter-title">
                {intl.formatMessage(placeholderMessages.akasha)}
              </div>
              <a href={"https://blog.akasha.world"} target="_blank" className="mail">
                {intl.formatMessage(placeholderMessages.blog)}
              </a>
              <a href={"https://github.com/AkashaProject/dapp/releases"} target="_blank" className="mail">
                {intl.formatMessage(placeholderMessages.downloadDesktopApp)}
              </a>
              <a onClick={termsShow} className="mail">
                {intl.formatMessage(placeholderMessages.termsOfService)}
              </a>
            </div>
            <div className="web-placeholder__subfooter">
              <div className="web-placeholder__subfooter-title">
                {intl.formatMessage(placeholderMessages.contacts)}
              </div>
              <a href={"mailto:hello@akasha.world"} target="_top" className="mail">hello@akasha.world</a>
              <a href={"mailto:careers@akasha.world"} target="_top" className="mail">careers@akasha.world</a>
              <a href={"mailto:press@akasha.world"} target="_top" className="mail">press@akasha.world</a>
            </div>
          </div>
          {appState.get('showTerms') && <Terms hideTerms={hideTerms} />}
        </div>
    );
}

WebPlaceholder.propTypes = {
    appState: PropTypes.shape(),
    intl: PropTypes.shape(),
    showTerms: PropTypes.func,
    hideTerms: PropTypes.func
}

export default injectIntl(WebPlaceholder);
