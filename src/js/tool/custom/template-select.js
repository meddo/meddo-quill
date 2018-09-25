export default class TemplateSelect
{
  constructor()
  {
    this.$root = $(`<div class="ql-spanner"></div>`);

    this.$select = $(`
      <button class="ql-select template-select" title="Wybór szablonu">
        <div class="ql-title">Wczytaj szablon</div>
        <div class="ql-icon"><i class="fa fa-chevron-down"></i></div>
      </button>
    `);

    this.$dropdown = $(`<div class="ql-dropdown"></div>`);
  }

  render(row)
  {
    row.append(this.$root);
  }

  register(quill)
  {
    this.$quill = quill;
    this.$resource = $(this.$quill.container).attr('data-template-resource');
    $.ajax({url: this.$resource}).then(data => this.load(data));
  }

  bind(toolbar)
  {
    this.$toolbar = toolbar;
    this.$toolbar.on('click', '.template-select', () => this.toggle());
    this.$root.on('click', '.ql-option', (e) => this.select(parseInt($(e.currentTarget).attr('data-id'))));
  }

  toggle()
  {
    this.$select.toggleClass('active');
  }

  select(id)
  {
    this.$quill.clipboard.dangerouslyPasteHTML(this.$options.find(option => option.id === id).content);
  }

  load(data)
  {
    this.$options = data;
    data.forEach(template => this.$dropdown.append(`<div class="ql-option" data-id="${template.id}">${template.name}</div>`));
    this.$select.append(this.$dropdown);
    this.$root.append(this.$select);
  }
}
