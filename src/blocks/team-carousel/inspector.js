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
    NativeToggleControl,
    NativeUnitControl,
    NativeSelectControl,
    NativeRangeControl,
    NativeTextareaControl,
    PanelColorControl
} from '../../components';

export default function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        columns,
        resMode,
        gaps,
        loop,
        autoplay,
        delay,
        showArrows,
        showPagination,
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

    // Sync CSS custom properties into blockStyle for the SSR editor preview.
    useEffect(() => {
        setAttributes({
            blockStyle: {
                ...(cardBg && { '--card-bg': cardBg }),
                ...(cardPadding && { '--card-padding': cardPadding }),
                ...(cardRadius && { '--card-radius': cardRadius }),
                ...(cardBorderColor && { '--card-border-color': cardBorderColor }),
                ...(cardBorderWidth && { '--card-border-width': cardBorderWidth }),
                ...(nameColor && { '--name-color': nameColor }),
                ...(nameSize && { '--name-size': nameSize }),
                ...(designationColor && { '--designation-color': designationColor }),
                ...(iconColor && { '--icon-color': iconColor }),
                ...(overlayColor && { '--overlay-color': overlayColor })
            }
        });
    }, [cardBg, cardPadding, cardRadius, cardBorderColor, cardBorderWidth, nameColor, nameSize, designationColor, iconColor, overlayColor]);

    return (
        <>
            {/* ── Settings ─────────────────────────────────────────────── */}
            <InspectorControls>
                <PanelBody title={__('Slider', 'brilliant')}>
                    <NativeResponsiveControl label={__('Slides Per View', 'brilliant')} props={props}>
                        <RangeControl
                            value={columns[resMode]}
                            onChange={value => setAttributes({ columns: { ...columns, [resMode]: value } })}
                            min={1}
                            max={6}
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>

                    <NativeResponsiveControl label={__('Gap (px)', 'brilliant')} props={props}>
                        <RangeControl
                            value={gaps[resMode]}
                            onChange={value => setAttributes({ gaps: { ...gaps, [resMode]: value } })}
                            min={0}
                            max={100}
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>

                    <NativeToggleControl
                        label={__('Loop', 'brilliant')}
                        checked={loop}
                        onChange={value => setAttributes({ loop: value })}
                    />

                    <NativeToggleControl
                        label={__('Autoplay', 'brilliant')}
                        checked={autoplay}
                        onChange={value => setAttributes({ autoplay: value })}
                    />

                    {autoplay && (
                        <NativeRangeControl
                            label={__('Delay (ms)', 'brilliant')}
                            value={delay}
                            onChange={value => setAttributes({ delay: value })}
                            min={500}
                            max={10000}
                            step={500}
                        />
                    )}

                    <NativeToggleControl
                        label={__('Show Arrows', 'brilliant')}
                        checked={showArrows}
                        onChange={value => setAttributes({ showArrows: value })}
                    />

                    <NativeToggleControl
                        label={__('Show Pagination', 'brilliant')}
                        checked={showPagination}
                        onChange={value => setAttributes({ showPagination: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Query', 'brilliant')} initialOpen={false}>
                    <NativeSelectControl
                        label={__('Order By', 'brilliant')}
                        value={orderBy}
                        onChange={value => setAttributes({ orderBy: value })}
                        options={[
                            { label: __('Menu Order', 'brilliant'), value: 'menu_order' },
                            { label: __('Date (newest)', 'brilliant'), value: 'date' },
                            { label: __('Name (A – Z)', 'brilliant'), value: 'title' },
                            { label: __('Random', 'brilliant'), value: 'rand' }
                        ]}
                    />

                    <NativeTextareaControl
                        label={__('Show Specific Members', 'brilliant')}
                        value={selectedIds}
                        onChange={value => setAttributes({ selectedIds: value })}
                        placeholder="5, 12, 34"
                        help={__('Enter post IDs separated by commas. Leave empty to show all.', 'brilliant')}
                    />
                </PanelBody>
            </InspectorControls>

            {/* ── Styles ──────────────────────────────────────────────── */}
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Card', 'brilliant')}
                    resetAll={() =>
                        setAttributes({
                            cardBg: undefined,
                            cardPadding: undefined,
                            cardRadius: undefined,
                            cardBorderColor: undefined,
                            cardBorderWidth: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!cardBg}
                        label={__('Background', 'brilliant')}
                        onDeselect={() => setAttributes({ cardBg: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Background Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: cardBg,
                                    onChange: color => setAttributes({ cardBg: color }),
                                    label: __('Background', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!cardBorderColor}
                        label={__('Border', 'brilliant')}
                        onDeselect={() => setAttributes({ cardBorderColor: undefined, cardBorderWidth: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Border Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: cardBorderColor,
                                    onChange: color => setAttributes({ cardBorderColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                        <NativeUnitControl
                            label={__('Border Width', 'brilliant')}
                            value={cardBorderWidth}
                            onChange={value => setAttributes({ cardBorderWidth: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!cardRadius}
                        label={__('Border Radius', 'brilliant')}
                        onDeselect={() => setAttributes({ cardRadius: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Border Radius', 'brilliant')}
                            value={cardRadius}
                            onChange={value => setAttributes({ cardRadius: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!cardPadding}
                        label={__('Padding', 'brilliant')}
                        onDeselect={() => setAttributes({ cardPadding: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Card Padding', 'brilliant')}
                            value={cardPadding}
                            onChange={value => setAttributes({ cardPadding: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Typography', 'brilliant')}
                    resetAll={() =>
                        setAttributes({
                            nameColor: undefined,
                            nameSize: undefined,
                            designationColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!nameColor}
                        label={__('Name Color', 'brilliant')}
                        onDeselect={() => setAttributes({ nameColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Name Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: nameColor,
                                    onChange: color => setAttributes({ nameColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!nameSize}
                        label={__('Name Size', 'brilliant')}
                        onDeselect={() => setAttributes({ nameSize: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Name Font Size', 'brilliant')}
                            value={nameSize}
                            onChange={value => setAttributes({ nameSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!designationColor}
                        label={__('Designation Color', 'brilliant')}
                        onDeselect={() => setAttributes({ designationColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Designation Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: designationColor,
                                    onChange: color => setAttributes({ designationColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Icons & Hover', 'brilliant')}
                    resetAll={() => setAttributes({ iconColor: undefined, overlayColor: undefined })}
                >
                    <ToolsPanelItem
                        hasValue={() => !!iconColor}
                        label={__('Icon Color', 'brilliant')}
                        onDeselect={() => setAttributes({ iconColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Icon Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: iconColor,
                                    onChange: color => setAttributes({ iconColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!overlayColor}
                        label={__('Hover Overlay', 'brilliant')}
                        onDeselect={() => setAttributes({ overlayColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Overlay Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: overlayColor,
                                    onChange: color => setAttributes({ overlayColor: color }),
                                    label: __('Overlay', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
}
