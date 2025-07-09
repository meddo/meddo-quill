import Quill from 'quill'

const Delta = Quill.import('delta');

export default function brMatcher(node, delta) {
  return { ops: [{ insert: { 'softbreak': true } }] };
}
