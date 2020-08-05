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
import InterimSpeech from './blot/interim-speech';
import SmartBreak from './blot/smart-break';
import newlineMatcher from './matcher/newline-matcher';

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
  'blots/interim-speech': InterimSpeech,
  'blots/smart-break': SmartBreak,
}, true);

window.meditor = function (el) {
  let instance = new Quill(el, {
    modules: {
      toolbar: {
        primary: [
          ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'line-height'],
          ['list-ul', 'list-ol'],
          ['clear', 'undo', 'redo'],
          ['speech'],
          ['template-select'],
          ['more'],
        ],
        secondary: [
          ['check-text', 'dropdown-text'],
          [{label: 'Tekst:'}, 'short-text', 'medium-text', 'long-text'],
        ]
      },
      content: true,
      statusbar: true,
      clipboard: {
        matchVisual: false,
        matchers: [
          ['BR', newlineMatcher]
        ]
      },
      keyboard: {
        bindings: {
          //https://github.com/quilljs/quill/issues/252#issuecomment-292565427
          linebreak: {
            key: 13,
            shiftKey: true,
            handler: function (range) {
              let currentLeaf = this.quill.getLeaf(range.index)[0];
              let nextLeaf = this.quill.getLeaf(range.index + 1)[0];

              this.quill.insertEmbed(range.index, 'smartbreak', true, 'user');

              // Insert a second break if:
              // At the end of the editor, OR next leaf has a different parent (<p>)
              if (nextLeaf === null || (currentLeaf.parent !== nextLeaf.parent)) {
                this.quill.insertEmbed(range.index, 'smartbreak', true, 'user');
              }

              // Now that we've inserted a line break, move the cursor forward
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
            }
          }
        }
      }
    }
  });

  //https://github.com/quilljs/quill/issues/252#issuecomment-292565427
  let length = instance.getLength();
  let text = instance.getText(length - 2, 2);

  // Remove extraneous new lines
  if (text === '\n\n') {
    instance.deleteText(instance.getLength() - 2, 2)
  }

  $(el).get(0).meditor = instance;
  return instance;
};

if (typeof Vue !== 'undefined') {
  Vue.component('meditor', MeditorVue);
}
