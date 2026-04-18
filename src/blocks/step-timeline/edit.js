/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import './editor.scss';
import Inspector from './inspector';

// Block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const {
        lineColor,
        dotColor,
        blockStyle
    } = attributes;

    // CSS Custom Properties
    const cssCustomProperties = {
        '--line-color': lineColor || 'rgba(165, 9, 226, 0.814)',
        '--dot-color': dotColor || '#1006de'
    };

    // Update block style when CSS properties change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [lineColor, dotColor]);

    // Inner blocks configuration
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'timeline-list' },
        {
            allowedBlocks: ['brilliant/step-timeline-item'],
            template: [
                ['brilliant/step-timeline-item', { title: 'Step 1' }],
                ['brilliant/step-timeline-item', { title: 'Step 2' }],
                ['brilliant/step-timeline-item', { title: 'Step 3' }],
                ['brilliant/step-timeline-item', { title: 'Step 4' }],
                ['brilliant/step-timeline-item', { title: 'Step 5' }]
            ],
            templateLock: false
        }
    );

    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="insert"
                        label={__('Add Step', 'brilliant')}
                        onClick={() => {
                            const innerBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
                            const newBlock = wp.blocks.createBlock('brilliant/step-timeline-item');
                            wp.data.dispatch('core/block-editor').insertBlock(newBlock, innerBlocks.length, clientId);
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>

            {isSelected && <Inspector {...props} />}

            <div {...blockProps}>
                <section className="timeline">
                    <ol {...innerBlocksProps} />
                </section>
            </div>
        </>
    );
};

export default Edit;
