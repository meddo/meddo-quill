import Quill from 'quill';
const Inline = Quill.import('blots/inline');

export default class LineHeightFormat extends Inline
{
}

LineHeightFormat.tagName = 'div';
LineHeightFormat.blotName = 'line-height';
LineHeightFormat.className = 'ql-line-height';
