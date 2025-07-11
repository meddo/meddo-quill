import BaseModule from '../base/base-module';

export default class Content extends BaseModule
{
  constructor(quill, options)
  {
    super(quill, options);
    this.initialize();
  }

  initialize()
  {
    this.$id = $(this.$quill.container).attr('data-id');
    this.$name = $(this.$quill.container).attr('data-name');

    this.$quill.getContent = () => this.getContent();
    this.$quill.setContent = content => this.setContent(content);
    this.$quill.appendContent = content => this.appendContent(content);
    this.$quill.clearContent = () => this.clearContent();

    this.$preview = $(`<div class="ql-preview"></div>`);
    this.$input = $(`<textarea class="ql-content" id="${this.$id}" name="${this.$name}">`);
    this.$quill.on('text-change', () => this.updateContent());

    $(this.$quill.container).prepend(this.$input);
    $(this.$quill.container).prepend(this.$preview);
  }

  getContent()
  {
    return $(this.$quill.container).find('.ql-editor').html();
  }

  updateContent()
  {
    this.$input.val(this.getContent());
    this.$input.trigger('change');

    this.$preview.html(this.getContent());
  }

  appendContent(content)
  {
    this.setContent(this.getContent() + content);
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

    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }

    setTimeout(() => {
      this.$quill.setSelection(this.$quill.getLength(), 0);
    }, 10);
  }

  clearContent()
  {
    this.$quill.setContents([{insert: '\n'}]);
  }
}
