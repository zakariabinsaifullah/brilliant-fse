/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getIconByName } from '../../utils/icons';
import { ArrowIcon } from './edit';

/**
 * Save function — serialises all editorial content to static HTML.
 *
 * @param {Object} props
 * @param {Object} props.attributes
 * @return {WPElement}
 */
export default function save({ attributes }) {
    const { image, iconName, iconType, customSvgCode, title, titleTag, description, linkText, linkUrl, linkTarget, blockStyle } =
        attributes;

    const TagName = titleTag || 'h3';
    const blockProps = useBlockProps.save({ style: blockStyle || {} });

    // Resolve icon — custom SVG wins, then library lookup
    const renderIconMarkup = () => {
        if (customSvgCode) {
            return <span className="brilliant-resource-card__icon-svg" dangerouslySetInnerHTML={{ __html: customSvgCode }} />;
        }
        const selected = getIconByName(iconName);
        if (selected) {
            return <Icon icon={selected.icon} size={28} />;
        }
        return null;
    };

    // Link wrapper — wraps everything when linkUrl is set
    const linkProps = linkUrl
        ? {
              href: linkUrl,
              target: linkTarget || undefined,
              rel: linkTarget === '_blank' ? 'noopener noreferrer' : undefined
          }
        : null;

    const cardContent = (
        <div className="brilliant-resource-card">
            {image?.url && (
                <div className="brilliant-resource-card__image-wrap">
                    <img src={image.url} alt={image.alt || ''} loading="lazy" />
                </div>
            )}

            <div className="brilliant-resource-card__content">
                <div className="brilliant-resource-card__inner-content">
                    <div className="brilliant-resource-card__icon-wrap">{renderIconMarkup()}</div>
                    <div className="brilliant-resournce-content">
                        {title && <RichText.Content tagName={TagName} className="brilliant-resource-card__title" value={title} />}
                        <div className="hidden-content">
                            {description && (
                                <div className="brilliant-resource-card__desc">
                                    <RichText.Content tagName="p" className="brilliant-resource-card__desc-text" value={description} />
                                </div>
                            )}

                            {linkText && (
                                <span className="brilliant-resource-card__link" aria-hidden={!!linkUrl}>
                                    <RichText.Content tagName="span" value={linkText} />
                                    <ArrowIcon />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div {...blockProps}>
            {linkProps ? (
                <a
                    {...linkProps}
                    className="brilliant-resource-card-link"
                    aria-label={title ? (RichText.isEmpty(title) ? undefined : title) : undefined}
                >
                    {cardContent}
                </a>
            ) : (
                cardContent
            )}
        </div>
    );
}
