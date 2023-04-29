export const i18n = {
  /**
   * @type {I18nDictionary}
   */
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': 'Нажмите, чтобы настроить',
          'or drag to move': 'или перетащите'
        }
      },
      inlineToolbar: {
        converter: {
          'Convert to': 'Конвертировать в'
        }
      },
      toolbar: {
        toolbox: {
          Add: 'Добавить'
        }
      }
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
      InlineCode: 'Моноширинный'
    },

    /**
     * Section for passing translations to the external tools classes
     */
    tools: {
      warning: {
        Title: 'Название',
        Message: 'Сообщение'
      },
      link: {
        'Add a link': 'Вставьте ссылку'
      },
      stub: {
        'The block can not be displayed correctly.': 'Блок не может быть отображен'
      }
    },
    blockTunes: {
      delete: {
        Delete: 'Удалить'
      },
      moveUp: {
        'Move up': 'Переместить вверх'
      },
      moveDown: {
        'Move down': 'Переместить вниз'
      }
    }
  }
};
