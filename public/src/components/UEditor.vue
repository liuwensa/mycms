<template>
  <script :id="randomId" name="content" type="text/plain"></script>
</template>

<script>
  export default {
    name: 'VueUEditor',
    data () {
      return {
        // 为了避免麻烦，每个编辑器实例都用不同的 id
        randomId: 'editor_' + (Math.random() * 100000000000000000),
      };
    },
    created () {
      this.$nextTick(() => {
        this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig);
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.instance.addListener('ready', () => {
          this.$emit('ready', this.instance);
        });
      });
    },
    beforeDestroy () {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.instance !== null && this.instance.destroy) {
        this.instance.destroy();
      }
    }
  };
</script>
