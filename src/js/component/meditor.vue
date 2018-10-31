<template>
  <div class="meditor-vue">
    <div ref="editor"></div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data()
    {
      return {
        editor: null,
      }
    },
    mounted: function ()
    {
      this.editor = meditor(this.$refs.editor);
      this.editor.setContent(this.value);
      this.editor.on('text-change', () => this.update());
    },
    methods: {
      update: function() {
        this.$emit('input', this.editor.getText() ? this.editor.getContent() : '');
      }
    }
  }
</script>
