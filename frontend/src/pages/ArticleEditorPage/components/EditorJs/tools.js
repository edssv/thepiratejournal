import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        config: { levels: [2, 3], defaultLevel: 2 },
    },

    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: `${process.env.REACT_APP_API_URL}/upload`, // Your backend file uploader endpoint
                byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            },
        },
    },
    list: List,
    delimiter: Delimiter,
    marker: Marker,
    inlineCode: InlineCode,
    // warning: {
    //     class: Warning,
    //     inlineToolbar: true,
    //     shortcut: 'CMD+SHIFT+W',
    //     config: {
    //         titlePlaceholder: 'Title',
    //         messagePlaceholder: 'Message',
    //     },
    // },
};
