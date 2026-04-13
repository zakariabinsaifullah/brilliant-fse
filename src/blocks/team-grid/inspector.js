/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
    NativeResponsiveControl,
    NativeUnitControl,
    NativeSelectControl,
    NativeTextareaControl,
    PanelColorControl
} from '../../components';

export default function Inspector( props ) {
    const { attributes, setAttributes } = props;
    const {
        columns,
        resMode,
        gap,
        orderBy,
        selectedIds,
        cardBg,
        cardPadding,
        cardRadius,
        cardBorderColor,
        cardBorderWidth,
        nameColor,
        nameSize,
        designationColor,
        iconColor,
        overlayColor
    } = attributes;

    // Sync CSS custom properties into blockStyle whenever a style attribute changes.
    // render.php reads blockStyle to apply them as inline CSS on the wrapper.
    useEffect( () => {
        setAttributes( {
            blockStyle: {
                ...( columns.Desktop !== 2 && { '--dcols': String( columns.Desktop ) } ),
                ...( columns.Tablet  !== 2 && { '--tcols': String( columns.Tablet  ) } ),
                ...( columns.Mobile  !== 1 && { '--mcols': String( columns.Mobile  ) } ),
                ...( gap              && { '--gap':                gap              } ),
                ...( cardBg           && { '--card-bg':            cardBg           } ),
                ...( cardPadding      && { '--card-padding':       cardPadding      } ),
                ...( cardRadius       && { '--card-radius':        cardRadius       } ),
                ...( cardBorderColor  && { '--card-border-color':  cardBorderColor  } ),
                ...( cardBorderWidth  && { '--card-border-width':  cardBorderWidth  } ),
                ...( nameColor        && { '--name-color':         nameColor        } ),
                ...( designationColor && { '--designation-color':  designationColor } ),
                ...( iconColor        && { '--icon-color':         iconColor        } ),
                ...( overlayColor     && { '--overlay-color':      overlayColor     } )
            }
        } );
    }, [
        columns, gap, cardBg, cardPadding, cardRadius,
        cardBorderColor, cardBorderWidth, nameColor, nameSize,
        designationColor, iconColor, overlayColor
    ] );

    return (
        <>
            { /* ── Settings ─────────────────────────────────────────────── */ }
            <InspectorControls>
                <PanelBody title={ __( 'Grid', 'brilliant' ) }>
                    <NativeResponsiveControl
                        label={ __( 'Columns', 'brilliant' ) }
                        props={ props }
                    >
                        <RangeControl
                            value={ columns[ resMode ] }
                            onChange={ value =>
                                setAttributes( { columns: { ...columns, [ resMode ]: value } } )
                            }
                            min={ 1 }
                            max={ 6 }
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>

                    <NativeUnitControl
                        label={ __( 'Gap', 'brilliant' ) }
                        value={ gap }
                        onChange={ value => setAttributes( { gap: value } ) }
                        mb={ 0 }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Query', 'brilliant' ) } initialOpen={ false }>
                    <NativeSelectControl
                        label={ __( 'Order By', 'brilliant' ) }
                        value={ orderBy }
                        onChange={ value => setAttributes( { orderBy: value } ) }
                        options={ [
                            { label: __( 'Menu Order', 'brilliant' ), value: 'menu_order' },
                            { label: __( 'Date (newest)', 'brilliant' ), value: 'date'       },
                            { label: __( 'Name (A – Z)', 'brilliant' ), value: 'title'      },
                            { label: __( 'Random',        'brilliant' ), value: 'rand'       }
                        ] }
                    />

                    <NativeTextareaControl
                        label={ __( 'Show Specific Members', 'brilliant' ) }
                        value={ selectedIds }
                        onChange={ value => setAttributes( { selectedIds: value } ) }
                        placeholder="5, 12, 34"
                        help={ __( 'Enter post IDs separated by commas. Leave empty to show all members. The members IDs are visible in the Team list in the admin.', 'brilliant' ) }
                    />
                </PanelBody>
            </InspectorControls>

            { /* ── Styles ──────────────────────────────────────────────── */ }
            <InspectorControls group="styles">

                <ToolsPanel
                    label={ __( 'Card', 'brilliant' ) }
                    resetAll={ () =>
                        setAttributes( {
                            cardBg:          undefined,
                            cardPadding:     '20px',
                            cardRadius:      '8px',
                            cardBorderColor: undefined,
                            cardBorderWidth: undefined
                        } )
                    }
                >
                    <ToolsPanelItem
                        hasValue={ () => !! cardBg || !! cardBorderColor }
                        label={ __( 'Colors', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { cardBg: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Colors', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    cardBorderColor,
                                    onChange: color => setAttributes( { cardBorderColor: color } ),
                                    label:    __( 'Color', 'brilliant' )
                                },
                                {
                                    value:    cardBg,
                                    onChange: color => setAttributes( { cardBg: color } ),
                                    label:    __( 'Background', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! cardBorderColor }
                        label={ __( 'Border', 'brilliant' ) }
                        onDeselect={ () =>
                            setAttributes( { cardBorderColor: undefined, cardBorderWidth: undefined } )
                        }
                        onSelect={ () => {} }
                    >
                        <NativeUnitControl
                            label={ __( 'Border Width', 'brilliant' ) }
                            value={ cardBorderWidth }
                            onChange={ value => setAttributes( { cardBorderWidth: value } ) }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => cardRadius !== '8px' }
                        label={ __( 'Radius', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { cardRadius: '8px' } ) }
                        onSelect={ () => {} }
                    >
                        <NativeUnitControl
                            label={ __( 'Radius', 'brilliant' ) }
                            value={ cardRadius }
                            onChange={ value => setAttributes( { cardRadius: value } ) }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => cardPadding !== '20px' }
                        label={ __( 'Padding', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { cardPadding: '20px' } ) }
                        onSelect={ () => {} }
                    >
                        <NativeUnitControl
                            label={ __( 'Padding', 'brilliant' ) }
                            value={ cardPadding }
                            onChange={ value => setAttributes( { cardPadding: value } ) }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={ __( 'Bio', 'brilliant' ) }
                    resetAll={ () =>
                        setAttributes( {
                            nameColor:        undefined,
                            designationColor: undefined,
                            iconColor:        undefined,
                            overlayColor:     undefined
                        } )
                    }
                >
                    <ToolsPanelItem
                        hasValue={ () => !! nameColor || !! designationColor 
                            || !! iconColor || !! overlayColor
                         }
                        label={ __( 'Colors', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { nameColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Colors', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    nameColor,
                                    onChange: color => setAttributes( { nameColor: color } ),
                                    label:    __( 'Name', 'brilliant' )
                                },
                                {
                                    value:    designationColor,
                                    onChange: color => setAttributes( { designationColor: color } ),
                                    label:    __( 'Designation', 'brilliant' )
                                },
                                {
                                    value:    iconColor,
                                    onChange: color => setAttributes( { iconColor: color } ),
                                    label:    __( 'Icon', 'brilliant' )
                                },
                                {
                                    value:    overlayColor,
                                    onChange: color => setAttributes( { overlayColor: color } ),
                                    label:    __( 'Overlay', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={ __( 'Icons & Hover', 'brilliant' ) }
                    resetAll={ () =>
                        setAttributes( { iconColor: undefined, overlayColor: undefined } )
                    }
                >
                    <ToolsPanelItem
                        hasValue={ () => !! iconColor }
                        label={ __( 'Icon Color', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { iconColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Icon Color', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    iconColor,
                                    onChange: color => setAttributes( { iconColor: color } ),
                                    label:    __( 'Color', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={ () => !! overlayColor }
                        label={ __( 'Hover Overlay', 'brilliant' ) }
                        onDeselect={ () => setAttributes( { overlayColor: undefined } ) }
                        onSelect={ () => {} }
                    >
                        <PanelColorControl
                            label={ __( 'Overlay Color', 'brilliant' ) }
                            colorSettings={ [
                                {
                                    value:    overlayColor,
                                    onChange: color => setAttributes( { overlayColor: color } ),
                                    label:    __( 'Overlay', 'brilliant' )
                                }
                            ] }
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

            </InspectorControls>
        </>
    );
}
