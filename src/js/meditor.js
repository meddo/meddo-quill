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

// import SmartBreak from './blot/smart-break';
//TODO: move to blot (smart-break doesn't work tho)

let Parchment = Quill.import('parchment');
let Break = Quill.import('blots/break');
let Embed = Quill.import('blots/embed');
Break.prototype.insertInto = function (parent, ref) {
  Embed.prototype.insertInto.call(this, parent, ref)
};
Break.prototype.length = function () {
  return 1;
};
Break.prototype.value = function () {
  return '\n';
};
Quill.register(Break);

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
  // 'blots/smart-break': SmartBreak,
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
      },
      keyboard: {
        bindings: {
          handleEnter: {
            key: 13,
            handler: function (range, context) {
              if (range.length > 0) {
                this.quill.scroll.deleteAt(range.index, range.length);  // So we do not trigger text-change
              }

              let lineFormats = Object.keys(context.format).reduce(function (lineFormats, format) {
                if (Parchment.query(format, Parchment.Scope.BLOCK) && !Array.isArray(context.format[format])) {
                  lineFormats[format] = context.format[format];
                }
                return lineFormats;
              }, {});
              let previousChar = this.quill.getText(range.index - 1, 1);
              // Earlier scroll.deleteAt might have messed up our selection,
              // so insertText's built in selection preservation is not reliable
              this.quill.insertText(range.index, '\n', lineFormats, Quill.sources.USER);
              if (previousChar == '' || previousChar == '\n') {
                this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
              } else {
                this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              }
              this.quill.selection.scrollIntoView(this.quill.container);
              Object.keys(context.format).forEach((name) => {
                if (lineFormats[name] != null) return;
                if (Array.isArray(context.format[name])) return;
                if (name === 'link') return;
                this.quill.format(name, context.format[name], Quill.sources.USER);
              });
            }
          },
          linebreak: {
            key: 13,
            shiftKey: true,
            handler: function (range) {
              let currentLeaf = this.quill.getLeaf(range.index)[0];
              let nextLeaf = this.quill.getLeaf(range.index + 1)[0];

              //TODO: change to smartbreak after moving to new blot
              this.quill.insertEmbed(range.index, 'break', true, 'user');

              // Insert a second break if:
              // At the end of the editor, OR next leaf has a different parent (<p>)
              if (nextLeaf === null || (currentLeaf.parent !== nextLeaf.parent)) {
                //TODO: change to smartbreak after moving to new blot
                this.quill.insertEmbed(range.index, 'break', true, 'user')
              }

              // Now that we've inserted a line break, move the cursor forward
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT)
            }
          }
        }
      }
    }
  });

  $(el).get(0).meditor = instance;
  return instance;
};

if (typeof Vue !== 'undefined') {
  Vue.component('meditor', MeditorVue);
}
