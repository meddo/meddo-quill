import Quill from 'quill';

export default class CheckText
{
  constructor()
  {
    this.$root = $(`
      <button type="button" class="ql-text-button check-text" title="Dodaj pole typu: checkbox"><i class="fa fa-check-square-o"></i><span>Checkbox</span></button>
    `);
  }

  render(row)
  {
    $(row).append(this.$root);
  }

  register(quill)
  {
    this.$quill = quill;
    this.$container = $(this.$quill.container);
  }

  bind(toolbar)
  {
    this.$toolbar = $(toolbar);

    this.$container.on('check-text:remove', '.ql-check-text', (e) => {
      window.temp = Quill.find(e.currentTarget);
      Quill.find(e.currentTarget).destroy();
    });

    this.$toolbar.on('click', `.check-text`, () => {
      let range = this.$quill.getSelection(true);
      this.$quill.insertEmbed(range.index, 'check-text', {
        text: ''
      });
    });
  }
}
