import CommandTool from '../../base/command-tool';

export default class Clear extends CommandTool
{
  constructor()
  {
    super('magic', 'secondary-toggle', 'Pola szablonów', function ()
    {
      $(this.$quill.container).toggleClass('ql-advanced');
      this.$toolbar.toggleClass('ql-show-secondary');
    });
  }
}
