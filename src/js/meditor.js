import Quill from 'quill';
import Input from './module/content';
import Toolbar from './module/toolbar';
import CheckText from './format/check-text-format';
import ShortText from './format/short-text-format';
import LongText from './format/long-text-format';

Quill.register({
  'modules/input': Input,
  'modules/toolbar': Toolbar,
  'formats/check-text': CheckText,
  'formats/short-text': ShortText,
  'formats/long-text': LongText,
}, true);

window.meditor = function (el)
{
  return new Quill(el, {
    modules: {
      toolbar: {
        primary: [
          ['bold', 'italic', 'underline'],
          ['subscript', 'superscript'],
          ['clear', 'undo', 'redo'],
          ['template-select'],
          ['more'],
        ],
        secondary: [
          ['check-text', 'short-text', 'long-text']
        ]
      },
      input: true,
      clipboard: {
        matchVisual: false,
      }
    }
  });
};
