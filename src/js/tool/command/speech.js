import CommandTool from '../../base/command-tool';

export default class Speech extends CommandTool
{
  constructor()
  {
    super('microphone', 'speech', 'Rozpocznij dyktowanie', function (quill)
    {
      this.active ? this.stop() : this.start();
    });

    this.active = false;

    try
    {
      this.$recognition = new webkitSpeechRecognition();
      this.$recognition.lang = 'pl-PL';
      this.$recognition.continuous = true;
      this.$recognition.onresult = (e) => this.apply(e);
    }
    catch (e)
    {
      this.$recognition = false;
      this.$root.hide();
      console.log('Speech recognition is not supported');
    }
  }

  start()
  {
    try
    {
      this.$recognition.start();
    }
    catch (e) {
      console.log('Speech recognition cannot be started', e);
      return;
    }

    this.active = true;
    this.$root.addClass('active-listening').attr('title', 'Zakończ dyktowanie');
    this.$root.find('i.fa').removeClass('fa-microphone').addClass('fa-microphone-slash');
  }

  stop()
  {
    this.$recognition.stop();
    this.active = false;
    this.$root.removeClass('active-listening').attr('title', 'Rozpocznij dyktowanie');
    this.$root.find('i.fa').removeClass('fa-microphone-slash').addClass('fa-microphone');
  }

  apply(event)
  {
    let selection = this.$quill.getSelection(true);
    let cursorPosition = selection.index + selection.length;

    this.$quill.insertText(cursorPosition, event.results[event.results.length-1][0].transcript);
  }
}
