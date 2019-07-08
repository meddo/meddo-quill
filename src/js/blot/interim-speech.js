import Quill from 'quill';

const InlineEmbed = Quill.import('blots/embed');

export default class InterimSpeech extends InlineEmbed {

}

InterimSpeech.tagName = 'span';
InterimSpeech.blotName = 'interim-speech';
InterimSpeech.className = 'ql-interim-speech';
