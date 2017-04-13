<template>
  <script :id="editorID" type="text/plain"></script>
</template>

<script>
  const UE = window.UE;

  export default {
    props: ['editor', 'editorID'],
    events: {
      initialEeditor() {
        UE.delEditor(this.editorID);

        this.editor = UE.getEditor(this.editorID, {imageScaleEnabled: false});

        this.editor.ready(() => {
          this.
        });
      }
    }
  }
</script>
