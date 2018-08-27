import PropTypes from 'prop-types';
import React from 'react';
import { isInternalLink, removePrefix } from '../../../utils/url-utils';

const LinkDecorator = ({ children, className, entityKey, getEditorState, onOutsideNavigation, target, history }) => {
    const entity = getEditorState().getCurrentContent().getEntity(entityKey);
    const entityData = entity ? entity.get('data') : undefined;
    const href = (entityData && entityData.url) || undefined;
    const onNavigation = (ev) => {
        ev.preventDefault();
        if (isInternalLink(href)) {
            const internalUrl = `/${removePrefix(href).replace('/#/', '')}`
            history.push(internalUrl);
        } else {
            onOutsideNavigation(href);
        }
    };

    return (
      <a
        className={className}
        title={href}
        href={href}
        onClick={onNavigation}
        target={target}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
};

LinkDecorator.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    entityKey: PropTypes.string,
    history: PropTypes.shape(),
    getEditorState: PropTypes.func.isRequired,
    onOutsideNavigation: PropTypes.func.isRequired,
    target: PropTypes.string,
};

export default LinkDecorator;
