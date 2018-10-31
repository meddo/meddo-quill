import BaseModule from '../base/base-module';

import Undo from '../tool/command/undo';
import Redo from '../tool/command/redo';
import Clear from '../tool/command/clear';
import Speech from '../tool/command/speech';
import More from '../tool/command/more';

import Bold from '../tool/inline/bold';
import Italic from '../tool/inline/italic';
import Underline from '../tool/inline/underline';
import LineHeight from '../tool/inline/line-height';

import Subscript from '../tool/block/subscript';
import Superscript from '../tool/block/superscript';

import TemplateSelect from '../tool/custom/template-select';

import CheckText from '../tool/insert/check-text';
import ShortText from '../tool/insert/short-text';
import LongText from '../tool/insert/long-text';

let tools = {
  'undo': Undo,
  'redo': Redo,
  'clear': Clear,
  'speech': Speech,
  'more': More,
  'bold': Bold,
  'italic': Italic,
  'underline': Underline,
  'line-height': LineHeight,
  'subscript': Subscript,
  'superscript': Superscript,
  'template-select': TemplateSelect,
  'check-text': CheckText,
  'short-text': ShortText,
  'long-text': LongText,
};

export default class Toolbar extends BaseModule
{
  constructor(quill, options)
  {
    super(quill, options);
    this.initialize();
  }

  initialize()
  {
    this.$toolbar = $('<div class="ql-toolbar"></div>');
    this.$primary = $('<div class="ql-primary"></div>');
    this.$secondary = $('<div class="ql-secondary"></div>');

    ['primary', 'secondary'].forEach((priority) =>
    {
      (this.$options[priority] || []).forEach((group) =>
      {
        group.forEach((name) =>
        {
          let tool = new tools[name]();

          tool.register(this.$quill);
          tool.render(this[`$${priority}`]);
          tool.bind(this.$toolbar);
        });

        this[`$${priority}`].append($('<span class="ql-separator"></span>'));
      });
    });

    this.$toolbar.append(this.$primary);
    this.$toolbar.append(this.$secondary);

    $(this.$quill.container).prepend(this.$toolbar);
  }
}
