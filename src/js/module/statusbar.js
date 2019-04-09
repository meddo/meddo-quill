import BaseModule from '../base/base-module';

export default class Statusbar extends BaseModule
{
  constructor(quill, options)
  {
    super(quill, options);
    this.initialize();
  }

  initialize()
  {
    this.$status = this.createStatusbar();
    console.log('appending');
    $(this.$quill.container).append(this.$status);
  }

  createStatusbar()
  {
    return $(`
      <div class="ql-statusbar ql-advanced-only">
        <p>Tryb edycji pól szablonów</p>
      </div>
    `);
  }
}
