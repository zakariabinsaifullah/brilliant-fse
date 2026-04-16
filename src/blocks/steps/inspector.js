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

/**
 * Internal dependencies
 */
import { NativeResponsiveControl, NativeUnitControl, PanelColorControl } from '../../components';

export default function Inspector(props) {
    const { attributes, setAttributes } = props;
    const {
        columns,
        gaps,
        resMode,
        circleSize,
        circleBg,
        circleBorderColor,
        badgeBg,
        badgeColor,
        iconColor,
        iconSize,
        arrowColor,
        titleColor,
        titleSize,
        descColor,
        descSize
    } = attributes;

    return (
        <>
            {/* ── Layout settings ──────────────────────────────────────────── */}
            {/* <NativeResponsiveControl label={__('Columns', 'brilliant')} props={props}>
                        <RangeControl
                            value={columns[resMode]}
                            onChange={value => setAttributes({ columns: { ...columns, [resMode]: value } })}
                            min={1}
                            max={6}
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl> */}

            {/* <NativeResponsiveControl label={__('Gap', 'brilliant')} props={props}>
                        <NativeUnitControl
                            label={__('Gap', 'brilliant')}
                            value={gaps[resMode]}
                            onChange={value => setAttributes({ gaps: { ...gaps, [resMode]: value } })}
                        />
                    </NativeResponsiveControl> */}

            {/* ── Style settings ───────────────────────────────────────────── */}
            <InspectorControls>
                {/* Circle */}
                <ToolsPanel
                    label={__('Circle', 'brilliant')}
                    resetAll={() =>
                        setAttributes({
                            circleSize: undefined,
                            circleBg: undefined,
                            circleBorderColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!circleSize}
                        label={__('Size', 'brilliant')}
                        onDeselect={() => setAttributes({ circleSize: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Circle Size', 'brilliant')}
                            value={circleSize}
                            onChange={value => setAttributes({ circleSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!circleBg || !!circleBorderColor}
                        label={__('Colors', 'brilliant')}
                        onDeselect={() => setAttributes({ circleBg: undefined, circleBorderColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Circle Colors', 'brilliant')}
                            colorSettings={[
                                {
                                    value: circleBg,
                                    onChange: color => setAttributes({ circleBg: color }),
                                    label: __('Background', 'brilliant')
                                },
                                {
                                    value: circleBorderColor,
                                    onChange: color => setAttributes({ circleBorderColor: color }),
                                    label: __('Border', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                {/* Badge */}
                <ToolsPanel label={__('Badge', 'brilliant')} resetAll={() => setAttributes({ badgeBg: undefined, badgeColor: undefined })}>
                    <ToolsPanelItem
                        hasValue={() => !!badgeBg || !!badgeColor}
                        label={__('Colors', 'brilliant')}
                        onDeselect={() => setAttributes({ badgeBg: undefined, badgeColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Badge Colors', 'brilliant')}
                            colorSettings={[
                                {
                                    value: badgeBg,
                                    onChange: color => setAttributes({ badgeBg: color }),
                                    label: __('Background', 'brilliant')
                                },
                                {
                                    value: badgeColor,
                                    onChange: color => setAttributes({ badgeColor: color }),
                                    label: __('Text', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                {/* Icon & Arrow */}
                <ToolsPanel
                    label={__('Icon & Arrow', 'brilliant')}
                    resetAll={() => setAttributes({ iconColor: undefined, iconSize: undefined, arrowColor: undefined })}
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
                        hasValue={() => !!iconSize}
                        label={__('Icon Size', 'brilliant')}
                        onDeselect={() => setAttributes({ iconSize: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Icon Size', 'brilliant')}
                            value={iconSize}
                            onChange={value => setAttributes({ iconSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!arrowColor}
                        label={__('Arrow Color', 'brilliant')}
                        onDeselect={() => setAttributes({ arrowColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Arrow Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: arrowColor,
                                    onChange: color => setAttributes({ arrowColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                {/* Typography */}
                <ToolsPanel
                    label={__('Typography', 'brilliant')}
                    resetAll={() =>
                        setAttributes({
                            titleColor: undefined,
                            titleSize: undefined,
                            descColor: undefined,
                            descSize: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!titleColor}
                        label={__('Title Color', 'brilliant')}
                        onDeselect={() => setAttributes({ titleColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Title Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: titleColor,
                                    onChange: color => setAttributes({ titleColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!titleSize}
                        label={__('Title Size', 'brilliant')}
                        onDeselect={() => setAttributes({ titleSize: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Title Font Size', 'brilliant')}
                            value={titleSize}
                            onChange={value => setAttributes({ titleSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!descColor}
                        label={__('Description Color', 'brilliant')}
                        onDeselect={() => setAttributes({ descColor: undefined })}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Description Color', 'brilliant')}
                            colorSettings={[
                                {
                                    value: descColor,
                                    onChange: color => setAttributes({ descColor: color }),
                                    label: __('Color', 'brilliant')
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!descSize}
                        label={__('Description Size', 'brilliant')}
                        onDeselect={() => setAttributes({ descSize: undefined })}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Description Font Size', 'brilliant')}
                            value={descSize}
                            onChange={value => setAttributes({ descSize: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
}
