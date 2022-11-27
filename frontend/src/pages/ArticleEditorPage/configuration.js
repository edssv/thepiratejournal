import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import customBlock from './customBlock';

const Configuration = (dataBlocks) => {
    return {
        holder: 'editorjs',
        autofocus: false,
        placeholder: 'Давай напишем классную статью!',
        onChange: (event) => {
            console.log('change', event);
        },
        tools: {
            header: {
                class: Header,
                config: { levels: [3, 4], defaultLevel: 3 },
            },

            image: {
                class: ImageTool,
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
        },
        block: customBlock,
        defaultBlock: 'paragraph',
        data: {
            blocks: dataBlocks,
        },
        blockTunes: {
            delete: {
                Delete: 'Удалить',
            },
            moveUp: {
                'Move up': 'Переместить вверх',
            },
            moveDown: {
                'Move down': 'Переместить вниз',
            },
        },
        i18n: {
            /**
             * @type {I18nDictionary}
             */
            messages: {
                ui: {
                    blockTunes: {
                        toggler: {
                            'Click to tune': 'Нажмите, чтобы настроить',
                            'or drag to move': 'или перетащите',
                        },
                    },
                    inlineToolbar: {
                        converter: {
                            'Convert to': 'Конвертировать в',
                        },
                    },
                    toolbar: {
                        toolbox: {
                            Add: 'Добавить',
                        },
                    },
                },

                toolNames: {
                    Text: 'Параграф',
                    Heading: 'Заголовок',
                    Image: 'Изображение',
                    List: 'Список',
                    Warning: 'Примечание',
                    Checklist: 'Чеклист',
                    Quote: 'Цитата',
                    Code: 'Код',
                    Delimiter: 'Разделитель',
                    'Raw HTML': 'HTML-фрагмент',
                    Table: 'Таблица',
                    Link: 'Ссылка',
                    Marker: 'Маркер',
                    Bold: 'Полужирный',
                    Italic: 'Курсив',
                    InlineCode: 'Моноширинный',
                },

                /**
                 * Section for passing translations to the external tools classes
                 */
                tools: {
                    warning: {
                        Title: 'Название',
                        Message: 'Сообщение',
                    },
                    link: {
                        'Add a link': 'Вставьте ссылку',
                    },
                    stub: {
                        'The block can not be displayed correctly.': 'Блок не может быть отображен',
                    },
                },
                blockTunes: {
                    delete: {
                        Delete: 'Удалить',
                    },
                    moveUp: {
                        'Move up': 'Переместить вверх',
                    },
                    moveDown: {
                        'Move down': 'Переместить вниз',
                    },
                },
            },
        },
    };
};

export default Configuration;
