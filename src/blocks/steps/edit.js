/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import './editor.scss';

const TEMPLATE = [
    ['brilliant/step', { stepNumber: '01', showArrow: true }],
    ['brilliant/step', { stepNumber: '02', showArrow: true }],
    ['brilliant/step', { stepNumber: '03', showArrow: false }]
];

export default function Edit(props) {
    const { attributes, setAttributes, clientId } = props;
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

    // Sync CSS custom properties → blockStyle for the frontend
    useEffect(() => {
        setAttributes({
            blockStyle: {
                // '--cols-d': String(columns?.Desktop ?? 3),
                // '--cols-t': String(columns?.Tablet ?? 1),
                // '--cols-m': String(columns?.Mobile ?? 1),
                '--gap-d': gaps?.Desktop ?? '50px',
                '--gap-t': gaps?.Tablet ?? '50px',
                '--gap-m': gaps?.Mobile ?? '50px',
                ...(circleSize && { '--circle-size': circleSize }),
                ...(circleBg && { '--circle-bg': circleBg }),
                ...(circleBorderColor && { '--circle-border-color': circleBorderColor }),
                ...(badgeBg && { '--badge-bg': badgeBg }),
                ...(badgeColor && { '--badge-color': badgeColor }),
                ...(iconColor && { '--icon-color': iconColor }),
                ...(iconSize && { '--icon-size': iconSize }),
                ...(arrowColor && { '--arrow-color': arrowColor }),
                ...(titleColor && { '--title-color': titleColor }),
                ...(titleSize && { '--title-size': titleSize }),
                ...(descColor && { '--desc-color': descColor }),
                ...(descSize && { '--desc-size': descSize })
            }
        });
    }, [
        columns,
        gaps,
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
    ]);

    const { insertBlock } = useDispatch('core/block-editor');
    const innerBlocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

    const blockProps = useBlockProps({
        style: {
            // '--cols-d': String(columns?.Desktop ?? 3),
            // '--cols-t': String(columns?.Tablet ?? 2),
            // '--cols-m': String(columns?.Mobile ?? 1),
            '--gap-d': gaps?.Desktop ?? '50px',
            '--gap-t': gaps?.Tablet ?? '50px',
            '--gap-m': gaps?.Mobile ?? '50px',
            ...(circleSize && { '--circle-size': circleSize }),
            ...(circleBg && { '--circle-bg': circleBg }),
            ...(circleBorderColor && { '--circle-border-color': circleBorderColor }),
            ...(badgeBg && { '--badge-bg': badgeBg }),
            ...(badgeColor && { '--badge-color': badgeColor }),
            ...(iconColor && { '--icon-color': iconColor }),
            ...(iconSize && { '--icon-size': iconSize }),
            ...(arrowColor && { '--arrow-color': arrowColor }),
            ...(titleColor && { '--title-color': titleColor }),
            ...(titleSize && { '--title-size': titleSize }),
            ...(descColor && { '--desc-color': descColor }),
            ...(descSize && { '--desc-size': descSize })
        }
    });

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'brilliant-steps__inner' },
        {
            allowedBlocks: ['brilliant/step'],
            template: TEMPLATE,
            templateLock: false,
            orientation: 'horizontal'
        }
    );

    return (
        <>
            <Inspector {...props} />

            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="insert"
                        label={__('Add Step', 'brilliant')}
                        onClick={() => {
                            const nextNum = String(innerBlocks.length + 1).padStart(2, '0');
                            const newBlock = wp.blocks.createBlock('brilliant/step', {
                                stepNumber: nextNum,
                                showArrow: false
                            });
                            insertBlock(newBlock, innerBlocks.length, clientId);
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>

            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
}
