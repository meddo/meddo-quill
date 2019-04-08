import Quill from 'quill';
import MeditorVue from './component/meditor';
import Content from './module/content';
import Toolbar from './module/toolbar';
import Statusbar from './module/statusbar';
import LineHeight from './format/line-height-format';
import CheckText from './format/check-text-format';
import DropdownText from './format/dropdown-text-format';
import ShortText from './format/short-text-format';
import MediumText from './format/medium-text-format';
import LongText from './format/long-text-format';

Quill.register({
  'modules/content': Content,
  'modules/toolbar': Toolbar,
  'modules/statusbar': Statusbar,
  'formats/line-height': LineHeight,
  'formats/check-text': CheckText,
  'formats/dropdown-text': DropdownText,
  'formats/short-text': ShortText,
  'formats/medium-text': MediumText,
  'formats/long-text': LongText,
}, true);

window.meditor = function (el)
{
  let instance = new Quill(el, {
    modules: {
      toolbar: {
        primary: [
          ['bold', 'italic', 'underline', 'strike', 'line-height', 'subscript', 'superscript'],
          ['clear', 'undo', 'redo'],
          ['speech'],
          ['template-select'],
          ['more'],
        ],
        secondary: [
          ['check-text', 'dropdown-text'],
          [{label: 'TEKST:'}, 'short-text', 'medium-text', 'long-text'],
        ]
      },
      content: true,
      statusbar: true,
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
