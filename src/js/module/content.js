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

    this.$quill.setContent = content => this.setContent(content);
    this.$quill.getContent = () => this.getContent();

    this.$input = $(`<input class="ql-content" type="text" name="${this.$name}">`);
    this.$quill.on('text-change', () => this.updateContent());

    $(this.$quill.container).prepend(this.$input);
  }

  updateContent()
  {
    this.$input.val(this.getContent());
  }

  setContent(content)
  {
    this.$quill.clipboard.dangerouslyPasteHTML(content);
  }

  getContent()
  {
    return $(this.$quill.container).find('.ql-editor').html();
  }
}
