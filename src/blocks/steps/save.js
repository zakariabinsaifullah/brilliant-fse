/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { blockStyle } = attributes;

    const blockProps = useBlockProps.save( { style: blockStyle || {} } );

    return (
        <div { ...blockProps }>
            <div className="brilliant-steps__inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
