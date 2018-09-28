export default class CommandTool
{
  constructor(icon, name, tooltip, callable)
  {
    this.$name = name;
    this.$callable = callable;

    this.$root = $(`<button type="button" class="ql-button ${name}" title="${tooltip}"><i class="fa fa-${icon}"></i></button>`);
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
    this.$toolbar.on('click', `.${this.$name}`, () => this.$callable(this.$quill));
  }
}
