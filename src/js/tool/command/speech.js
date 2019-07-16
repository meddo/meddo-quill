import CommandTool from '../../base/command-tool';

export default class Speech extends CommandTool {
    constructor() {
        super('microphone', 'speech', 'Rozpocznij dyktowanie', function (quill) {
            this.active ? this.stop() : this.start();
        });

        this.active = false;

        try {
            this.$recognition = new webkitSpeechRecognition();
            this.$recognition.lang = 'pl-PL';
            this.$recognition.continuous = true;
            this.$recognition.interimResults = true;
            this.$recognition.onresult = (e) => this.apply(e);
            this.$recognition.onend = (e) => this.stop();
        } catch (e) {
            this.$recognition = false;
            this.$root.hide();
            console.log('Speech recognition is not supported');
        }
    }

    start() {
        try {
            this.$recognition.start();
            let selection = this.$quill.getSelection(true);
            this.$quill.insertEmbed(selection.index, 'interim-speech', '');
        } catch (e) {
            console.log('Speech recognition cannot be started', e);
            return;
        }

        this.active = true;
        this.$root.addClass('active-listening').attr('title', 'Zakończ dyktowanie');
        this.$root.find('i.fa').removeClass('fa-microphone').addClass('fa-microphone-slash');
    }

    stop() {
        this.$recognition.stop();
        this.active = false;
        this.$root.removeClass('active-listening').attr('title', 'Rozpocznij dyktowanie');
        this.$root.find('i.fa').removeClass('fa-microphone-slash').addClass('fa-microphone');
        $('.ql-interim-speech').remove();
    }

    apply(event) {
        $('.ql-interim-speech').text('');
        let speechTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                speechTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        $('.ql-interim-speech').text(interimTranscript);

        if (speechTranscript) {
            $('.ql-interim-speech').text('');

            speechTranscript = speechTranscript
                .replace(/ ?kropka/ig, '.')
                .replace(/ ?przecinek/ig, ',')
                .replace(/ ?nowa linia/ig, '\n')
                .replace(/ ?myślnik/ig, '-')
                .replace(/^(.)/ig, function (s) {
                    return s.toUpperCase()
                });

            let selection = this.$quill.getSelection(true);
            let cursorPosition = selection.index + selection.length;
            // tip: insertować w trybie modelu danych quilla
            this.$quill.insertText(cursorPosition, speechTranscript);
        }
    }
}
