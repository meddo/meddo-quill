import BaseController from "../base/base-controller";

export default class LongTextController extends BaseController
{
  constructor(root, value)
  {
    super(root, value.text);

    this.$removeBtn = this.createRemoveBtn().appendTo(this.$editor);
    this.$removeBtn.on('click', () => this.$root.trigger('long-text:remove'));
  }
}
