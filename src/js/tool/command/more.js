import CommandTool from '../../base/command-tool';

export default class Clear extends CommandTool
{
  constructor()
  {
    super('cog', 'secondary-toggle', 'Zaawansowane', function ()
    {
      $(this.$quill.root).toggleClass('ql-advanced');
      this.$toolbar.toggleClass('ql-show-secondary');
    });
  }
}
