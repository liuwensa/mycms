<template>
  <div class="form-group">
    <label class="col-md-1 control-label">
      <span class="text-danger" v-show="required">*&nbsp;</span>
      {{ label }}
    </label>
    <div class="col-md-8">
      <div class="form-control">
        <div class="tags-container">
          <div class="tag" v-for="tag in tags" track-by="$index">
            {{tag}}
            <i class="glyphicon glyphicon-remove icon-remove-tag" @click="removeTag(tag)"></i>
          </div>
          <input class="tag-input" type="text" v-model="tag" @keydown.enter="addTag" :placeholder="getPlaceholder()">
          <span class="fa arrow"
                :class="{'show-select': showSelect}"
                @click="toggleSelect"
                v-show="selectMode">
          </span>
          <ul v-show="showSelect" class="select-options">
            <li v-for="option in options"
                class="select-option"
                @click="selectTag(option)">
              {{ option }}
            </li>
            <li class="select-option text-danger" v-show="options.length === 0">暂无常用标签</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {showAlert} from '../vuex/util/actions';
  import inArray from '../services/in-array';

  export default {
    props  : ['label', 'tags', 'placeholder', 'required', 'options', 'selectMode'],
    data() {
      return {
        tag       : '',
        showSelect: false
      };
    },
    vuex   : {
      actions: {
        showAlert
      }
    },
    methods: {
      addTag() {
        const tags = this.tags;
        const tag  = this.tag;

        if (inArray(tags, tag)) {
          this.showAlert('不能添加重复的标签');
        } else {
          this.tags.push(this.tag);
        }

        this.tag = '';
      },
      removeTag(tag) {
        const tagIndex = this.tags.indexOf(tag);

        this.tags.splice(tagIndex, 1);
      },
      getPlaceholder() {
        if (this.tags.length) {
          return '';
        } else {
          return this.placeholder || this.label;
        }
      },
      toggleSelect() {
        this.showSelect = !this.showSelect;
      },
      selectTag(tag) {
        const tags = this.tags;

        if (inArray(tags, tag)) {
          this.showAlert('不能添加重复的标签');
        } else {
          this.tags.push(tag);
        }
      }
    }
  };
  /* eslint eol-last: 0*/
</script>

<style scoped>
  .tags-container {
    position: relative;
  }

  .tag {
    display: inline-block;
    margin: 1px 5px 1px 0px;
    padding: 1px 5px;
    background-color: #31b0d5;
    border-color: #269abc;
    border-radius: 3px;
    color: #fff;
  }

  .tag-input {
    border: none;
    outline: none;
    display: inline-block;
    width: 600px;
  }

  .icon-remove-tag {
    cursor: pointer;
    padding: 1px;
  }

  .icon-remove-tag:hover {
    background-color: red;
  }

  .arrow {
    position: absolute;
    right: 0;
    padding: 0 10px;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
  }

  .arrow.show-select {
    transform: rotate(-90deg);
  }

  .select-options {
    padding-left: 10px;
    margin: 10px 0;
    border: 1px solid #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
    list-style: none;
    position: absolute;
    left: -12px;
    z-index: 1000;
    width: 100%;
  }

  .select-option {
    padding: 5px 10px;
  }
</style>
