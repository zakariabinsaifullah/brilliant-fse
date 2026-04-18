import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { PanelColorControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        lineColor,
        dotColor
    } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Design Settings', 'brilliant')} initialOpen={true}>
                <PanelColorControl
                    label={__('Timeline Colors', 'brilliant')}
                    colorSettings={[
                        {
                            label: __('Horizontal Bar Color', 'brilliant'),
                            value: lineColor,
                            onChange: (color) => setAttributes({ lineColor: color })
                        },
                        {
                            label: __('Dot Circle Color', 'brilliant'),
                            value: dotColor,
                            onChange: (color) => setAttributes({ dotColor: color })
                        }
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
