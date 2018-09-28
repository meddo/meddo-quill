import Quill from 'quill';

export default class ShortText
{
  constructor()
  {
    this.$root = $(`
      <button type="button" class="ql-text-button short-text" title="Dodaj pole typu: krótki tekst"><i class="fa fa-pencil"></i><span>Tekst krótki</span></button>
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

    this.$container.on('short-text:remove', '.ql-short-text', (e) => {
      window.temp = Quill.find(e.currentTarget);
      Quill.find(e.currentTarget).destroy();
    });

    this.$toolbar.on('click', `.short-text`, () => {
      let range = this.$quill.getSelection(true);
      this.$quill.insertEmbed(range.index, 'short-text', {
        text: ''
      });
    });
  }
}
