<template>
  <div>
    <page-title v-if="!id" title="添加文档"></page-title>
    <page-title v-if="id" title="修改文档"></page-title>

    <div class="row">
      <div class="col-md-12">
        <div class="well">
          <form role="form" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-1">
                <span class="text-danger">*&nbsp;</span>文章标题
              </label>
              <div class="col-md-8 input-container">
                <input type="text" class="form-control" placeholder="文档标题" v-model="content.title" required/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">
                <span class="text-danger">*&nbsp;</span>简短标题
              </label>
              <div class="col-md-8 input-container">
                <input type="text" class="form-control" placeholder="简短标题" v-model="content.stitle" required/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">原创</label>
              <div class="col-md-8">
                <label><input type="checkbox" class="checkbox-inline" v-model="content.isoriginal"/></label>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">来源</label>
              <div class="col-md-8">
                <input type="text" class="form-control" placeholder="来源" v-model="content.source" required/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">TAG标签</label>
              <div class="col-md-8">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="content.tags" onclick="showTagsMenu()"
                         placeholder="标签用逗号隔开，单个标签不可超过6个字，不得超过4个标签" required/>
                  <div class="input-group-btn">
                    <button type="button" class="btn btn-default dropdown-toggle" id="menuBtn"
                            onclick="showTagsMenu(); return false;">
                      选择
                      <span class="fa fa-caret-down"></span>
                    </button>
                    <div id="menuContent" class="menuContent dropdown-menu"
                         style="display:none; position: absolute;z-index: 999">
                      <ul class="ztree" id="tagsTree"
                          style="margin-top: 0;width: 180px;max-height: 200px;overflow-y: auto;padding: 10px;background: #fff;"></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">封面图片</label>
              <div class="col-md-8">
                <image-uploader :src="content.coverImage" v-on:uploadImage='listenToMyBoy'></image-uploader>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">文章类别</label>
              <div class="col-md-8">
                <select class="form-control" v-model="content.sortPath">
                  <template v-for="category in categories">
                    <option :value="category.sortPath">{{category.name}}</option>
                    <template v-for="children1 in category.children">
                      <option :value="children1.sortPath">|------{{children1.name}}</option>
                      <template v-for="children2 in children1.children">
                        <option :value="children2.sortPath">|------|------{{children2.name}}</option>
                      </template>
                    </template>
                  </template>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-md-1">内容摘要</label>
              <div class="col-md-8">
                <textarea class="form-control" rows="3" cols="3" v-model="content.discription" placeholder="内容摘要" required></textarea>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-1">文章详情</label>
              <div class="col-md-8">
                <textarea class="form-control" v-model="content.content" placeholder="请输入文章详情"></textarea>
              </div>
            </div>

            <div class="text-danger text-center">
              <p v-for="error in errors">{{error}}</p>
            </div>

            <div class="text-center">
              <button type="button" class="btn btn-primary" @click="postData">提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getContent, addContents, updateContents} from '../apis/contents';
  import {getCategory} from '../apis/category';

  import pageTitle from '../components/page-title.vue';
  import imageUploader from '../components/image-uploader.vue';

  export default {
    components: {
      pageTitle,
      imageUploader
    },
    data      : function () {
      return {
        errors    : [],
        categories: [],
        id        : 0,
        content   : {
          title      : '',
          stitle     : '',
          category   : '',
          sortPath   : '',
          tags       : '',
          keywords   : '',
          coverImage : '',
          discription: '',
          content    : '',
          source     : '',
          publisher  : '',
          author     : '',
          isTop      : 0,
          isoriginal : true
        }
      };
    },
    methods   : {
      getCategory() {
        getCategory().then((data) => {
          this.categories = data;
        });
      },
      postData() {
        let subFun;

        const sortPath = this.content.sortPath;

        const categories = sortPath.split(',');
        this.content.category = categories[categories.length - 1];

        const params = [];

        if (this.id) {
          subFun = updateContents;
          params.push(this.id);
        } else {
          subFun = addContents;
        }

        subFun(this.content, params).then(() => {
          this.$router.go(-1);
        });
      },
      listenToMyBoy (src) {
        this.content.coverImage = src
      }
    },
    created () {
      this.id = this.$route.params.id;
      this.getCategory();
      if (this.id) {
        getContent([this.id], {}).then((data) => {
          this.content = data;
        });
      }
    }
  }
</script>
