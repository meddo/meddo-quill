import Quill from 'quill';

export default class DropdownText
{
  constructor()
  {
    this.$root = $(`
      <button type="button" class="ql-text-button dropdown-text" title="Dodaj pole typu: lista wyboru"><i class="fa fa-bars"></i><span>Lista wyboru</span></button>
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

    this.$container.on('dropdown-text:remove', '.ql-dropdown-text', (e) => {
      window.temp = Quill.find(e.currentTarget);
      Quill.find(e.currentTarget).destroy();
    });

    this.$toolbar.on('click', `.dropdown-text`, () => {
      let range = this.$quill.getSelection(true);
      this.$quill.insertEmbed(range.index, 'dropdown-text', {
        text: '',
        options: [],
      });
    });
  }
}
