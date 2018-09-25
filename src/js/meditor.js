import Quill     from 'quill';
import Toolbar   from './module/toolbar';
import CheckText from './format/check-text-format';
import ShortText from './format/short-text-format';
import LongText  from './format/long-text-format';

Quill.register({
  'modules/toolbar': Toolbar,
  'formats/check-text': CheckText,
  'formats/short-text': ShortText,
  'formats/long-text': LongText,
}, true);

$.fn.meditor = function ()
{
  this.each(function ()
  {
    let instance = new Quill(this, {
      modules: {
        toolbar: {
          primary: [
            ['bold', 'italic', 'underline'],
            ['subscript', 'superscript'],
            ['clear', 'undo', 'redo'],
            ['template-select'],
            ['more'],
          ],
          secondary: [
            ['check-text', 'short-text', 'long-text']
          ]
        },
        clipboard: {
          matchVisual: false,
        }
      }
    });

    function update()
    {
      $('#printing').html($(instance.container).find('.ql-editor').html());
    }

    instance.on('text-change', function ()
    {
      update();
    });
  });
};
