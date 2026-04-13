import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    icon: {
        src: (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#1f1f1f">
                <path d="M240-320h320v-80H240zm0-160h480v-80H240zm-80 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160zm0-80h640v-400H447l-80-80H160zm0 0v-480z" />
            </svg>
        )
    },
    edit: Edit,
    save: Save
});
