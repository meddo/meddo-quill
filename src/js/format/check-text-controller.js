import BaseController from "../base/base-controller";

export default class CheckTextController extends BaseController
{
  static findActive(node)
  {
    return !$(node).find('.ql-show').is('.ql-inactive');
  }

  constructor(root, value)
  {
    super(root, value.text);
    this.$editor.addClass('ql-advanced-only');

    this.$checkbox = this.createCheckbox().appendTo(this.$editor);
    this.$checkbox.on('click', () => this.toggleActive());

    this.$toggle = this.createToggle().prependTo(this.$root);
    this.$toggle.on('click', () => this.toggleActive());
    this.$input.on('change', () => this.$toggle.text(this.$input.val()));

    this.setActive(value.active);

    this.$removeBtn = this.createRemoveBtn().appendTo(this.$editor);
    this.$removeBtn.on('click', () => this.$root.trigger('check-text:remove'));
  }

  setActive(active)
  {
    active ? this.$display.removeClass('ql-inactive') : this.$display.addClass('ql-inactive');
    active ? this.$checkbox.removeClass('ql-inactive') : this.$checkbox.addClass('ql-inactive');
    active ? this.$toggle.removeClass('ql-inactive') : this.$toggle.addClass('ql-inactive');
  }

  toggleActive()
  {
    this.$display.toggleClass('ql-inactive');
    this.$checkbox.toggleClass('ql-inactive');
    this.$toggle.toggleClass('ql-inactive');

    this.update(this.$input.val());
  }

  createToggle()
  {
    return $(`<span class="ql-toggle ql-simple-only">${this.$input.val()}</span>`);
  }

  createCheckbox()
  {
    return $(`
      <span class="ql-checkbox">
        <i class="ql-off"></i>
        <i class="fa fa-check ql-on"></i>      
      </span>
    `);
  }
}
