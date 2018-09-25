<template>
  <div
    class="meditor-component"
  >
    <div ref="editor" v-html="content"></div>
  </div>
</template>

<script>
  export default {
    data()
    {
      return {
        editor: null,
      }
    },
    mounted: function ()
    {
      this.editor = $(this.$refs.editor).meditor();
      this.editor.on('change', () => this.update());
    },
    methods: {
      update: function() {
        this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
      }
    }
  }
</script>
