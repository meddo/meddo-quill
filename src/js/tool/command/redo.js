import CommandTool from '../../base/command-tool';

export default class Redo extends CommandTool
{
  constructor()
  {
    super('repeat', 'redo', 'Ponów', function (quill)
    {
      quill.history.redo();
    });
  }
}
