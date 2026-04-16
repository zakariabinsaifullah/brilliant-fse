/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getIconByName } from '../../utils/icons';

export default function save({ attributes }) {
    const { stepNumber, iconName, iconType, customSvgCode, title, titleTag, description, showArrow } = attributes;

    const TagName = titleTag || 'h3';
    const blockProps = useBlockProps.save({ className: 'brilliant-step' });

    // Resolve icon: custom SVG → library icon
    const renderIcon = () => {
        if (customSvgCode) {
            return <span className="brilliant-step__icon-svg" dangerouslySetInnerHTML={{ __html: customSvgCode }} />;
        }
        const selected = getIconByName(iconName);
        if (selected) {
            return <Icon icon={selected.icon} size={48} />;
        }
        return null;
    };

    return (
        <div {...blockProps}>
            {showArrow && <div className="brilliant-step__arrow" aria-hidden="true"></div>}

            {/* ── Visual row: circle + arrow ─────────────────────────────── */}
            <div className="brilliant-step__visual">
                <div className="brilliant-step__circle-wrap">
                    <span className="brilliant-step__badge">{stepNumber}</span>
                    <div className="brilliant-step__circle">
                        <div className="brilliant-step__icon">{renderIcon()}</div>
                    </div>
                </div>
            </div>

            {/* ── Text body ──────────────────────────────────────────────── */}
            <div className="brilliant-step__body">
                {title && <RichText.Content tagName={TagName} className="brilliant-step__title" value={title} />}
                {description && <RichText.Content tagName="p" className="brilliant-step__desc" value={description} />}
            </div>
        </div>
    );
}
