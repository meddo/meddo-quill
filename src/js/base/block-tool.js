export default class BlockTool
{
  constructor(icon, format, value, tooltip)
  {
    this.$format = format;
    this.$value = value;

    this.$root = $(`<button type="button" class="ql-button ${format}" value="${value}" title="${tooltip}"><i class="fa fa-${icon}"></i></button>`);
  }

  render(row)
  {
    row.append(this.$root);
  }

  register(quill)
  {
    this.$quill = quill;
  }

  bind(toolbar)
  {
    this.$toolbar = toolbar;

    this.$toolbar.on('click', `.${this.$format}[value=${this.$value}]`, () => this.toggle());
    this.$quill.on('selection-change', (range) => this.update(range ? this.$quill.getFormat(range) : {}));
    // this.$quill.on('text-change', () => this.update()); // TODO: fuck, this grabs focus from short-code input!
  }

  toggle()
  {
    this.$quill.format(this.$format, this.$quill.getFormat()[this.$format] === this.$value ? '' : this.$value);
    this.update();
  }

  update(current = null)
  {
    if (current === null) current = this.$quill.getFormat();
    current[this.$format] === this.$value ? this.$root.addClass('active') : this.$root.removeClass('active');
  }
}
