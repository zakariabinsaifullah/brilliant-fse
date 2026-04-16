/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { RenderIcon } from '../../helpers';
import Inspector from './inspector';

export default function Edit(props) {
    const { attributes, setAttributes } = props;
    const { stepNumber, iconName, iconType, customSvgCode, title, titleTag, description, showArrow } = attributes;

    const TagName = titleTag || 'h3';
    const blockProps = useBlockProps({ className: 'brilliant-step' });

    return (
        <>
            <Inspector {...props} />

            <div {...blockProps}>
                {showArrow && <div className="brilliant-step__arrow" aria-hidden="true"></div>}

                {/* ── Visual row: circle + arrow ─────────────────────────── */}
                <div className="brilliant-step__visual">
                    <div className="brilliant-step__circle-wrap">
                        <span className="brilliant-step__badge">{stepNumber}</span>
                        <div className="brilliant-step__circle">
                            <div className="brilliant-step__icon">
                                <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={48} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Text body ────────────────────────────────────────────── */}
                <div className="brilliant-step__body">
                    <RichText
                        tagName={TagName}
                        className="brilliant-step__title"
                        value={title}
                        onChange={val => setAttributes({ title: val })}
                        placeholder={__('Step title…', 'brilliant')}
                    />
                    <RichText
                        tagName="p"
                        className="brilliant-step__desc"
                        value={description}
                        onChange={val => setAttributes({ description: val })}
                        placeholder={__('Step description…', 'brilliant')}
                    />
                </div>
            </div>
        </>
    );
}
