import BaseController from "../base/base-controller";

export default class MediumTextController extends BaseController
{
  constructor(root, value)
  {
    super(root, value.text);

    this.$removeBtn = this.createRemoveBtn().appendTo(this.$editor);
    this.$removeBtn.on('click', () => this.$root.trigger('medium-text:remove'));
  }
}
