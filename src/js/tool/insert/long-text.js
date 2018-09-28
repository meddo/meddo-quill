import Quill from 'quill';

export default class LongText
{
  constructor()
  {
    this.$root = $(`
      <button type="button" class="ql-text-button long-text" title="Dodaj pole typu: długi tekst"><i class="fa fa-bars"></i><span>Tekst długi</span></button>
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

    this.$container.on('long-text:remove', '.ql-long-text', (e) => {
      window.temp = Quill.find(e.currentTarget);
      Quill.find(e.currentTarget).destroy();
    });

    this.$toolbar.on('click', `.long-text`, () => {
      let range = this.$quill.getSelection(true);
      this.$quill.insertEmbed(range.index, 'long-text', {
        text: '',
        options: [],
      });
    });
  }
}
