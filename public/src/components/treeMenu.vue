<template>
  <li>
    <span @click="toggle">
      <i v-if="isFolder" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
      <i v-if="!isFolder" class="icon file-text"></i>
      {{ model.name }}

    </span>
    <span><a class='text-primary' role='button' @click="updateCategory(model)">编辑</a></span>
    <span><a class='text-primary' role='button' @click="delCategory(model.id)">删除</a></span>
    <span><a class='text-primary' role='button' @click="addCategory(model)">添加子类</a></span>

    <ul v-show="open" v-if="isFolder">
      <tree-menu v-for="item in model.children" :model="item"></tree-menu>
    </ul>
  </li>
</template>

<script>

  import {getCategory, delCategory, addCategory, updateCategory} from '../apis/category';

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
      isFolder: function() {
        return this.model.children && this.model.children.length
      }
    },
    methods: {
      toggle: function() {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      delCategory(id) {
        window.bus.$emit('delCategory', id);
      },
      addCategory(model) {
        window.bus.$emit('addCategory', model);
      },
      updateCategory(model) {
        window.bus.$emit('updateCategory', model);
      }
    }
  }
</script>

<style>
  ul {
    list-style: none;
  }
  i.icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .icon.folder {
    background-image: url(/static/assets/folder.png);
  }
  .icon.folder-open {
    background-image: url(/static/assets/folder-open.png);
  }
  .icon.file-text {
    background-image: url(/static/assets/file-text.png);
  }
  .tree-menu li {
    line-height: 1.5;
  }
</style>
