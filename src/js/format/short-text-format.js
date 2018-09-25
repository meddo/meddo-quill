import Quill from 'quill';
import Controller from './short-text-controller';
const InlineEmbed = Quill.import('blots/embed');

export default class ShortTextFormat extends InlineEmbed
{
  constructor(node) {
    super(node);
    this.destroy = super.remove;
  }

  static create(value)
  {
    let node = super.create();
    new Controller(node, value);
    return node;
  }

  static value(node)
  {
    return {
      text: Controller.findText(node)
    }
  }

  remove() {
    // Block delete & backspace removal of short codes.
  }
}

ShortTextFormat.tagName = 'span';
ShortTextFormat.blotName = 'short-text';
ShortTextFormat.className = 'ql-short-text';
