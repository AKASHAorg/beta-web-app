import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { insertDataBlock, DraftJS } from 'megadraft';
import { Icon } from 'antd';
import { getResizedImages, findClosestMatch } from '../../../../utils/imageUtils';
import { genId } from '../../../../utils/dataModule';
import { uploadImage } from '../../../../local-flux/services/utils-service';

const { RichUtils } = DraftJS;

export default class BlockButton extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: '',
            isAddingImage: false,
            dialogOpen: false,
            creatingIPFSHash: false,
        };
        this.fileInput = React.createRef();
    }

    _triggerFileBrowser = (ev) => {
        if (this.props.onClick) {
            this.props.onClick();
        }
        this.fileInput.current.value = '';
        this.fileInput.current.click();
        this.setState({
            error: ''
        });
        ev.stopPropagation();
    }

    _handleImageProgress = (currentProgress) => {
        const { onImageProgress } = this.props;
        if (onImageProgress) onImageProgress(currentProgress);
    }

    _handleImageAdd = (ev) => {
        const files = this.fileInput.current.files;
        const filePromises = getResizedImages(files, {
            minWidth: 320,
            progressHandler: this._handleImageProgress,
            maxProgress: 100,
        });
        Promise.all(filePromises).then((results) => {
            let bestKey = findClosestMatch(768, results[0]);
            if (bestKey === 'gif' && results[0].gif) {
                const res = Object.assign({}, results[0]);
                delete res.gif;
                bestKey = findClosestMatch(results[0].gif.width, res);
            }
            if (bestKey === 'xl' || bestKey === 'xxl') {
                bestKey = 'md';
            }
            if (bestKey === 'sm') {
                bestKey = 'xs';
            }
            return {
                imgId: genId(),
                files: results[0],
                type: 'image',
                media: bestKey,
                termsAccepted: true,
                licence: 'CC BY',
                caption: ''
            };
        }).then((data) => {
            uploadImage(data.files, data.imgId).then((imgHashes) => {
                this.fileInput.current.value = '';
                this.setState({
                    isAddingImage: false,
                    dialogOpen: false
                }, () => {
                    const blockWithImage = insertDataBlock(this.props.editorState, {
                        files: imgHashes,
                        ...data
                    });
                    return this.props.onChange(blockWithImage);
                });
            });
        }).catch((reason) => {
            this.setState({
                isAddingImage: false,
                dialogOpen: false,
                error: reason
            }, () => {
                this.props.onImageError(reason);
            });
        });
    }

    render () {
        
        return (
          <div
            className="sidemenu__image-button"
          >
            <Icon
              title="Add an image"
              shape="circle"
              type="camera-o"
              className="sidemenu__image-button-icon"
              onClick={this._triggerFileBrowser}
            />
            <input
              ref={this.fileInput}
              type="file"
              accept="image/*"
              onChange={this._handleImageAdd}
            />
          </div>
        );
    }
}
BlockButton.propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.shape(),
    onClick: PropTypes.func,
    onImageError: PropTypes.func,
    onImageProgress: PropTypes.func,

};
