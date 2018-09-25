export default class BaseController
{
  static findText(node)
  {
    return $(node).find('.ql-show').text();
  }

  constructor(root, text)
  {
    this.$root = $(root);

    this.$display = this.createDisplay(text).appendTo(this.$root);
    this.$editor = this.createEditor().appendTo(this.$root);

    this.$input = this.createInput().appendTo(this.$editor);
    this.$input.on('input', (e) => this.update($(e.currentTarget).val()));

    this.update(this.$display.text());
  }

  update(text)
  {
    this.$display.text(text);
    this.$input.val(text);
  }

  createDisplay(text)
  {
    return $(`<span class="ql-show">${text}</span>`);
  }

  createEditor()
  {
    return $('<span class="ql-edit"></span>');
  }

  createInput()
  {
    return $('<input type="text" class="ql-input">');
  }

  createRemoveBtn()
  {
    return $(`
      <span class="ql-button ql-advanced-only" title="Usuń pole">
        <i class="fa fa-times"></i>
      </span>
    `);
  }
}
