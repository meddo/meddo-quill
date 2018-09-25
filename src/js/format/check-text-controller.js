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

    this.$checkbox = this.createCheckbox(value.active).appendTo(this.$editor);
    this.$checkbox.on('click', () => this.toggleActive());

    this.updateActive(value.active);

    this.$removeBtn = this.createRemoveBtn().appendTo(this.$editor);
    this.$removeBtn.on('click', () => this.$root.trigger('check-text:remove'));
  }

  updateActive(active)
  {
    active ? this.$display.removeClass('ql-inactive') : this.$display.addClass('ql-inactive');
    active ? this.$checkbox.removeClass('ql-inactive') : this.$checkbox.addClass('ql-inactive');
  }

  toggleActive()
  {
    this.$display.toggleClass('ql-inactive');
    this.$checkbox.toggleClass('ql-inactive');

    this.update(this.$input.val());
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
