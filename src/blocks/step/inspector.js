/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
    NativeTextControl,
    NativeSelectControl,
    NativeToggleControl,
    NativeIconPicker
} from '../../components';

export default function Inspector( props ) {
    const { attributes, setAttributes } = props;
    const {
        stepNumber,
        iconName,
        iconType,
        customSvgCode,
        strokeWidth,
        titleTag,
        showArrow
    } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={ __( 'Step', 'brilliant' ) }>

                <NativeTextControl
                    label={ __( 'Step Number / Label', 'brilliant' ) }
                    value={ stepNumber }
                    onChange={ value => setAttributes( { stepNumber: value } ) }
                    placeholder="01"
                    help={ __( 'Shown in the badge (e.g. 01, 02, A, B).', 'brilliant' ) }
                />

                <NativeSelectControl
                    label={ __( 'Title Tag', 'brilliant' ) }
                    value={ titleTag }
                    onChange={ value => setAttributes( { titleTag: value } ) }
                    options={ [
                        { label: 'H1',  value: 'h1'  },
                        { label: 'H2',  value: 'h2'  },
                        { label: 'H3',  value: 'h3'  },
                        { label: 'H4',  value: 'h4'  },
                        { label: 'H5',  value: 'h5'  },
                        { label: 'H6',  value: 'h6'  },
                        { label: 'P',   value: 'p'   },
                        { label: 'Div', value: 'div' }
                    ] }
                />

                <NativeIconPicker
                    label={ __( 'Icon', 'brilliant' ) }
                    iconName={ iconName }
                    customSvgCode={ customSvgCode }
                    iconType={ iconType }
                    strokeWidth={ strokeWidth }
                    onIconSelect={ ( name, type ) =>
                        setAttributes( {
                            iconName:      name,
                            iconType:      type,
                            customSvgCode: undefined
                        } )
                    }
                    onCustomSvgInsert={ ( { customSvgCode: svg, iconType: type, strokeWidth: sw } ) =>
                        setAttributes( {
                            customSvgCode: svg,
                            iconType:      type,
                            strokeWidth:   sw,
                            iconName:      undefined
                        } )
                    }
                />

                <NativeToggleControl
                    label={ __( 'Show Arrow', 'brilliant' ) }
                    checked={ showArrow }
                    onChange={ value => setAttributes( { showArrow: value } ) }
                    help={ __( 'Hide for the last step.', 'brilliant' ) }
                />

            </PanelBody>
        </InspectorControls>
    );
}
