import BaseModule from '../base/base-module';

export default class Toolbar extends BaseModule
{
  constructor(quill, options)
  {
    super(quill, options);
    this.initialize();
  }

  initialize()
  {
    this.$name = $(this.$quill.container).attr('data-name');

    this.$quill.getContent = () => this.getContent();
    this.$quill.setContent = content => this.setContent(content);
    this.$quill.appendContent = content => this.appendContent(content);
    this.$quill.clearContent = () => this.clearContent();

    this.$input = $(`<input type="text" class="ql-content" name="${this.$name}">`);
    this.$quill.on('text-change', () => this.updateContent());

    $(this.$quill.container).prepend(this.$input);
  }

  getContent()
  {
    return $(this.$quill.container).find('.ql-editor').html();
  }

  updateContent()
  {
    this.$input.val(this.getContent());
  }

  appendContent(content)
  {
    this.setContent(this.getContent() + "\n" + content);
  }

  setContent(content)
  {
    if (content && content.length)
    {
      this.$quill.clipboard.dangerouslyPasteHTML(content);
    }
    else
    {
      this.clearContent();
    }
  }

  clearContent()
  {
    this.$quill.setContents([{insert: '\n'}]);
  }
}
