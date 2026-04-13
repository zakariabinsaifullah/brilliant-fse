/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
    NativeSelectControl,
    NativeUnitControl,
    NativeIconPicker,
    PanelColorControl
} from '../../components';

export default function Inspector( props ) {
    const { attributes, setAttributes } = props;
    const {
        iconName,
        iconType,
        customSvgCode,
        strokeWidth,
        titleTag,
        iconBg,
        iconColor,
        titleColor,
        titleSize,
        descColor,
        descSize,
        linkColor,
        cardBg,
        accentColor
    } = attributes;

    // Sync CSS custom properties → blockStyle for frontend rendering.
    useEffect( () => {
        setAttributes( {
            blockStyle: {
                ...( iconBg        && { '--icon-bg':      iconBg        } ),
                ...( iconColor     && { '--icon-color':   iconColor     } ),
                ...( titleColor    && { '--title-color':  titleColor    } ),
                ...( titleSize     && { '--title-size':   titleSize     } ),
                ...( descColor     && { '--desc-color':   descColor     } ),
                ...( descSize      && { '--desc-size':    descSize      } ),
                ...( linkColor     && { '--link-color':   linkColor     } ),
                ...( cardBg        && { '--card-bg':      cardBg        } ),
                ...( accentColor   && { '--accent-color': accentColor   } )
            }
        } );
    }, [
        iconBg, iconColor, titleColor, titleSize,
        descColor, descSize, linkColor, cardBg, accentColor
    ] );

    return (
        <>
            { /* ── Settings ──────────────────────────────────────────────────── */ }
            <InspectorControls>
                <PanelBody title={ __( 'Content', 'brilliant' ) }>
                    <NativeSelectControl
                        label={ __( 'Title Tag', 'brilliant' ) }
                        value={ titleTag }
                        onChange={ value => setAttributes( { titleTag: value } ) }
                        options={ [
                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'P',  value: 'p'  },
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
                </PanelBody>
            </InspectorControls>

            { /* ── Styles ────────────────────────────────────────────────────── */ }
            <InspectorControls group="styles">

                { /* Card */ }
                <ToolsPanel
                    label={ __( 'Card', 'brilliant' ) }
                    resetAll={ () => setAttributes( { cardBg: undefined, accentColor: undefined } ) }
                >
                    <ToolsPanelItem
                        hasValue={ () => !! cardBg }
                        label={ __( 'Background', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { cardBg: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Card Background', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    cardBg,
                                    onChange: color => setAttributes( { cardBg: color } ),
                                    label:    __( 'Background', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! accentColor }
                        label={ __( 'Accent Color', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { accentColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Accent Color', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    accentColor,
                                    onChange: color => setAttributes( { accentColor: color } ),
                                    label:    __( 'Accent (border + title hover)', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                { /* Icon */ }
                <ToolsPanel
                    label={ __( 'Icon', 'brilliant' ) }
                    resetAll={ () => setAttributes( { iconBg: undefined, iconColor: undefined } ) }
                >
                    <ToolsPanelItem
                        hasValue={ () => !! iconBg || !! iconColor }
                        label={ __( 'Colors', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { iconBg: undefined, iconColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Icon Colors', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    iconBg,
                                    onChange: color => setAttributes( { iconBg: color } ),
                                    label:    __( 'Background', 'brilliant' )
                                },
                                {
                                    value:    iconColor,
                                    onChange: color => setAttributes( { iconColor: color } ),
                                    label:    __( 'Icon Color', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                { /* Typography */ }
                <ToolsPanel
                    label={ __( 'Typography', 'brilliant' ) }
                    resetAll={ () =>
                        setAttributes( {
                            titleColor:  undefined,
                            titleSize:   undefined,
                            descColor:   undefined,
                            descSize:    undefined,
                            linkColor:   undefined
                        } )
                    }
                >
                    <ToolsPanelItem
                        hasValue={ () => !! titleColor }
                        label={ __( 'Title Color', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { titleColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Title Color', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    titleColor,
                                    onChange: color => setAttributes( { titleColor: color } ),
                                    label:    __( 'Color', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! titleSize }
                        label={ __( 'Title Size', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { titleSize: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <NativeUnitControl
                            label={ __( 'Title Font Size', 'brilliant' ) }
                            value={ titleSize }
                            onChange={ value => setAttributes( { titleSize: value } ) }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! descColor }
                        label={ __( 'Description Color', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { descColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Description Color', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    descColor,
                                    onChange: color => setAttributes( { descColor: color } ),
                                    label:    __( 'Color', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! descSize }
                        label={ __( 'Description Size', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { descSize: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <NativeUnitControl
                            label={ __( 'Description Font Size', 'brilliant' ) }
                            value={ descSize }
                            onChange={ value => setAttributes( { descSize: value } ) }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! linkColor }
                        label={ __( 'Link Color', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { linkColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Link Color', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    linkColor,
                                    onChange: color => setAttributes( { linkColor: color } ),
                                    label:    __( 'Color', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

            </InspectorControls>
        </>
    );
}
