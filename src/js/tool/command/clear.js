import CommandTool from '../../base/command-tool';

export default class Clear extends CommandTool
{
  constructor()
  {
    super('remove', 'clear', 'Usuń formatowanie', function (quill)
    {
      quill.removeFormat(quill.getSelection());
    });
  }
}
