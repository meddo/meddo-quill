import Quill from 'quill'

const Embed = Quill.import('blots/embed');
const Break = Quill.import('blots/break');

export default class SmartBreak extends Break {
    static insertInto(parent, ref) {
        Embed.prototype.insertInto.call(this, parent, ref)
    }

    static length() {
        return 1;
    }

    static value() {
        return '\n';
    }
}

SmartBreak.blotName = 'smartbreak';
