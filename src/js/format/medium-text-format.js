import Quill from 'quill';
import Controller from './medium-text-controller';
const InlineEmbed = Quill.import('blots/embed');

export default class MediumTextFormat extends InlineEmbed
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

MediumTextFormat.tagName = 'span';
MediumTextFormat.blotName = 'medium-text';
MediumTextFormat.className = 'ql-medium-text';
