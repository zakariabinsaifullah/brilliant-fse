/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { PanelColorControl } from '../../components';

// Block edit function
const Edit = ({ attributes, setAttributes }) => {
    const { 
        title, 
        description, 
        headingTag,
        titleColor,
        descriptionColor
    } = attributes;

    const blockProps = useBlockProps({
        tagName: 'li'
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Typography Settings', 'brilliant')} initialOpen={true}>
                    <SelectControl
                        label={__('Heading Tag', 'brilliant')}
                        value={headingTag}
                        options={[
                            { label: __('H1', 'brilliant'), value: 'h1' },
                            { label: __('H2', 'brilliant'), value: 'h2' },
                            { label: __('H3', 'brilliant'), value: 'h3' },
                            { label: __('H4', 'brilliant'), value: 'h4' },
                            { label: __('H5', 'brilliant'), value: 'h5' },
                            { label: __('H6', 'brilliant'), value: 'h6' },
                            { label: __('TIME', 'brilliant'), value: 'time' }
                        ]}
                        onChange={(value) => setAttributes({ headingTag: value })}
                    />
                    
                    <PanelColorControl
                        label={__('Colors', 'brilliant')}
                        colorSettings={[
                            {
                                label: __('Title Color', 'brilliant'),
                                value: titleColor,
                                onChange: (color) => setAttributes({ titleColor: color })
                            },
                            {
                                label: __('Description Color', 'brilliant'),
                                value: descriptionColor,
                                onChange: (color) => setAttributes({ descriptionColor: color })
                            }
                        ]}
                    />
                </PanelBody>
            </InspectorControls>

            <li {...blockProps}>
                <div>
                    <RichText
                        tagName={headingTag || 'time'}
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Step Title', 'brilliant')}
                        style={{ color: titleColor }}
                    />
                    <RichText
                        tagName="p"
                        className="step-description"
                        value={description}
                        onChange={(val) => setAttributes({ description: val })}
                        placeholder={__('Step Description', 'brilliant')}
                        style={{ color: descriptionColor }}
                    />
                </div>
            </li>
        </>
    );
};

export default Edit;
