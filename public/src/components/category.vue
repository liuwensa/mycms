<template>
  <li>
    <span @click="toggle">
      <i v-if="isFolder" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
      <i v-if="!isFolder" class="icon file-text"></i>
      {{ model.name }}

    </span>
    <ul v-show="open" v-if="isFolder">
      <tree-menu v-for="item in model.children" :model="item"></tree-menu>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'treeMenu',
    props: ['model'],
    data() {
      return {
        action: '',
        open: true,
        isFolder: true
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
