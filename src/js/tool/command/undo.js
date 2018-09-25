import CommandTool from '../../base/command-tool';

export default class Undo extends CommandTool
{
  constructor()
  {
    super('undo', 'undo', 'Cofnij', function (quill)
    {
      quill.history.undo();
    });
  }
}
