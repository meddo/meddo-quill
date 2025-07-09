import Quill from 'quill'

const Embed = Quill.import('blots/embed');

export default class SoftBreak extends Embed {
    static create(value) {
        return super.create();
    }

    static value(node) {
        return '\n';
    }
}

SoftBreak.blotName = 'softbreak';
SoftBreak.tagName = 'BR';
