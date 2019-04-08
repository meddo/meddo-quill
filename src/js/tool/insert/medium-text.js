import Quill from 'quill';

export default class MediumText
{
  constructor()
  {
    this.$root = $(`
      <button type="button" class="ql-text-button medium-text" title="Dodaj pole typu: średni tekst"><i class="fa fa-pencil"></i><span>Średni</span></button>
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

    this.$container.on('medium-text:remove', '.ql-medium-text', (e) => {
      window.temp = Quill.find(e.currentTarget);
      Quill.find(e.currentTarget).destroy();
    });

    this.$toolbar.on('click', `.medium-text`, () => {
      let range = this.$quill.getSelection(true);
      this.$quill.insertEmbed(range.index, 'medium-text', {
        text: ''
      });
    });
  }
}
