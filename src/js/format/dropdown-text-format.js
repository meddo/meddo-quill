import Quill from 'quill';
import Controller from './dropdown-text-controller';
const InlineEmbed = Quill.import('blots/embed');

export default class DropdownTextFormat extends InlineEmbed
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
      text: Controller.findText(node),
      options: Controller.findOptions(node)
    }
  }

  remove() {
    // Block delete & backspace removal of short codes.
  }
}

DropdownTextFormat.tagName = 'span';
DropdownTextFormat.blotName = 'dropdown-text';
DropdownTextFormat.className = 'ql-dropdown-text';
