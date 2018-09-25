export default class InlineTool
{
  constructor(icon, name, tooltip)
  {
    this.$name = name;
    this.$root = $(`<button class="ql-button ${name}" title="${tooltip}"><i class="fa fa-${icon}"></i></button>`);
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

    this.$toolbar.on('click', `.${this.$name}`, () => this.toggle());
    this.$quill.on('selection-change', (range) => this.update(range ? this.$quill.getFormat(range) : {}));
  }

  toggle()
  {
    this.$quill.format(this.$name, !this.$quill.getFormat()[this.$name]);
    this.update();
  }

  update(current = null)
  {
    if (current === null) current = this.$quill.getFormat();
    current[this.$name] ? this.$root.addClass('active') : this.$root.removeClass('active');
  }
}
