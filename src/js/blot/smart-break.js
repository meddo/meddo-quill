import Quill from 'quill'

const Embed = Quill.import('blots/embed');
const Break = Quill.import('blots/break');

export default class SmartBreak extends Break {
    insertInto(parent, ref) {
        Embed.prototype.insertInto.call(this, parent, ref)
    }

    length() {
        return 1;
    }

    value() {
        return '\n';
    }
}

SmartBreak.blotName = 'smartbreak';
SmartBreak.tagName = 'BR';
