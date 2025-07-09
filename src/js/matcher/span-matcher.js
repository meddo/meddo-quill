import Quill from 'quill'

const Delta = Quill.import('delta');

export default function spanMatcher(node, delta) {
  if (node.innerHTML === '<br>') {
    return new Delta();
  }

  return delta;
}
