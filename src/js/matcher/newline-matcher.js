import Quill from 'quill'

const Delta = Quill.import('delta');

export default function newlineMatcher() {
  let newDelta = new Delta();
  newDelta.insert({'smartbreak': ''});

  return newDelta;
}
