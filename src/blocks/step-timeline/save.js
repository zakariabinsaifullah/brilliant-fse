import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { blockStyle } = attributes;

    return (
        <div {...useBlockProps.save({ style: blockStyle })}>
            <section className="timeline">
                <ol className="timeline-list">
                    <InnerBlocks.Content />
                </ol>
            </section>
        </div>
    );
}
