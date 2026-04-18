import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        title, 
        description, 
        headingTag,
        titleColor,
        descriptionColor
    } = attributes;

    return (
        <li {...useBlockProps.save({ className: 'timeline-item' })}>
            <div>
                <RichText.Content 
                    tagName={headingTag || 'time'} 
                    value={title} 
                    style={{ color: titleColor }}
                />
                <RichText.Content 
                    tagName="p" 
                    className="step-description" 
                    value={description} 
                    style={{ color: descriptionColor }}
                />
            </div>
        </li>
    );
}
