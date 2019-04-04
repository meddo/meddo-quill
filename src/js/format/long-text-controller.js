import BaseController from "../base/base-controller";

export default class LongTextController extends BaseController
{
  static findOptions(node)
  {
    return $(node).find('.ql-option').toArray().map(option => $(option).text());
  }

  constructor(root, value)
  {
    super(root, value.text);
    this.$dropdown = this.createDropdown(value.options).appendTo(this.$root);

    this.$addBtn = this.createAddBtn().appendTo(this.$editor);
    this.$addBtn.on('click', () => this.addOption(this.$input.val()));

    this.dropdownBtn = this.createDropdownBtn().appendTo(this.$editor);
    this.dropdownBtn.on('click', () => this.toggleDropdown());

    this.$removeBtn = this.createRemoveBtn().appendTo(this.$editor);
    this.$removeBtn.on('click', () => this.$root.trigger('long-text:remove'));

    this.$root.on('click', '.ql-option', e => this.selectOption($(e.currentTarget).text()));
    this.$root.on('click', '.ql-button.remove-option', e => this.removeOption(e));
  }

  createOption(text)
  {
    return `<span class="ql-option"><span class="ql-title">${text}</span><span class="ql-button ql-advanced-only remove-option"><i class="fa fa-times"></i></span></span>`;
  }

  addOption(text)
  {
    if (text.length < 1)
      return;

    this.$dropdown.prepend(this.createOption(text));
    this.update('');
  }

  removeOption(event)
  {
    event.stopPropagation();
    $(event.currentTarget).parents('.ql-option').remove();
  }

  selectOption(text)
  {
    this.update(text);
    if (!this.$root.parents('.ql-editor').is('.ql-advanced')) this.toggleDropdown();
  }

  toggleDropdown()
  {
    this.$root.toggleClass('ql-show-dropdown');
  }

  createDropdown(options)
  {
    return $(`<span class="ql-dropdown">${options.map(option => this.createOption(option)).join('')}</span>`);
  }

  createAddBtn()
  {
    return $(`
      <span class="ql-button ql-advanced-only ql-when-dropdown-only" title="Zapisz wartość">
        <i class="fa fa-plus-circle"></i>
      </span>
    `);
  }

  createDropdownBtn()
  {
    return $(`
      <span class="ql-button ql-dropdown-toggle" title="Pokaż opcje">
        <i class="fa fa-chevron-down"></i>
      </span>
    `);
  }
}
