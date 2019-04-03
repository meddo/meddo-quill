import Quill from 'quill';
import Input from './module/content';
import Toolbar from './module/toolbar';
import LineHeight from './format/line-height-format';
import CheckText from './format/check-text-format';
import ShortText from './format/short-text-format';
import LongText from './format/long-text-format';
import MeditorVue from './component/meditor';

Quill.register({
  'modules/input': Input,
  'modules/toolbar': Toolbar,
  'formats/line-height': LineHeight,
  'formats/check-text': CheckText,
  'formats/short-text': ShortText,
  'formats/long-text': LongText,
}, true);

window.meditor = function (el)
{
  let instance = new Quill(el, {
    modules: {
      toolbar: {
        primary: [
          ['bold', 'italic', 'underline', 'line-height', 'subscript', 'superscript'],
          ['clear', 'undo', 'redo'],
          ['speech'],
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

  $(el).get(0).meditor = instance;
  return instance;
};

if (typeof Vue !== 'undefined') {
  Vue.component('meditor', MeditorVue);
}
