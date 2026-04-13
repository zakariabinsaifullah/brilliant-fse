/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    RichText,
    BlockControls,
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { ToolbarButton, Popover, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { NativeIconPicker } from '../../components';
import { RenderIcon, getIconByName } from '../../helpers';
import Inspector from './inspector';
import './editor.scss';

// Arrow SVG — fixed, used in both editor and save
export const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
);

export default function Edit(props) {
    const { attributes, setAttributes } = props;
    const {
        image,
        iconName,
        iconType,
        customSvgCode,
        strokeWidth,
        title,
        titleTag,
        description,
        linkText,
        linkUrl,
        linkTarget,
        blockStyle
    } = attributes;

    const [isEditingURL, setIsEditingURL] = useState(false);
    const [popoverAnchor, setPopoverAnchor] = useState(null);

    const TagName = titleTag || 'h3';
    const blockProps = useBlockProps({ style: blockStyle || {} });

    return (
        <>
            <Inspector {...props} />

            {/* ── Toolbar: link button ─────────────────────────────────────── */}
            <BlockControls group="block">
                <ToolbarButton
                    ref={setPopoverAnchor}
                    name="link"
                    icon={linkUrl ? link : linkOff}
                    title={__('Card Link', 'brilliant')}
                    onClick={() => setIsEditingURL(true)}
                    isActive={!!linkUrl || isEditingURL}
                />
                {isEditingURL && (
                    <Popover
                        anchor={popoverAnchor}
                        onClose={() => setIsEditingURL(false)}
                        placement="bottom"
                        focusOnMount
                        offset={12}
                        variant="alternate"
                    >
                        <LinkControl
                            value={{ url: linkUrl, opensInNewTab: linkTarget === '_blank' }}
                            onChange={({ url: newURL = '', opensInNewTab }) => {
                                setAttributes({
                                    linkUrl: newURL,
                                    linkTarget: opensInNewTab ? '_blank' : undefined
                                });
                            }}
                            onRemove={() => setAttributes({ linkUrl: undefined, linkTarget: undefined })}
                        />
                    </Popover>
                )}
            </BlockControls>

            <div {...blockProps}>
                <div className="brilliant-resource-card">
                    {/* ── Image ────────────────────────────────────────────── */}
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={media =>
                                setAttributes({
                                    image: { id: media.id, url: media.url, alt: media.alt || '' }
                                })
                            }
                            allowedTypes={['image']}
                            value={image?.id}
                            render={({ open }) => (
                                <div
                                    className="brilliant-resource-card__image-wrap"
                                    onClick={open}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => e.key === 'Enter' && open()}
                                    aria-label={__('Upload or select image', 'brilliant')}
                                >
                                    {image?.url ? (
                                        <img src={image.url} alt={image.alt || ''} />
                                    ) : (
                                        <div className="brilliant-resource-card__image-placeholder">
                                            <span>{__('Click to upload image', 'brilliant')}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>

                    {/* ── Content ───────────────────────────────────────────── */}
                    <div className="brilliant-resource-card__content">
                        <div className="brilliant-resource-card__inner-content">
                            <div className="brilliant-resource-card__icon-wrap">
                                <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={28} />
                            </div>
                            <div className="brilliant-resournce-content">
                                <RichText
                                    tagName={TagName}
                                    className="brilliant-resource-card__title"
                                    value={title}
                                    onChange={val => setAttributes({ title: val })}
                                    placeholder={__('Resource title…', 'brilliant')}
                                />
                                <div className="hidden-content">
                                    <div className="brilliant-resource-card__desc">
                                        <RichText
                                            tagName="p"
                                            className="brilliant-resource-card__desc-text"
                                            value={description}
                                            onChange={val => setAttributes({ description: val })}
                                            placeholder={__('Enter description…', 'brilliant')}
                                        />
                                    </div>
                                    <div className="brilliant-resource-card__link">
                                        <RichText
                                            tagName="span"
                                            value={linkText}
                                            onChange={val => setAttributes({ linkText: val })}
                                            placeholder={__('Read More', 'brilliant')}
                                        />
                                        <ArrowIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
