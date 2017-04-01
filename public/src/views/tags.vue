<template>
  <div>
    <page-title title="文档标签管理"></page-title>
    <div class="row nav-tab mb20">
      <div class="col-md-4">
        <button class="btn btn-primary" @click="initEdit()">添加文档标签</button>
      </div>
    </div>

    <div class="panel panel-primary mt20">
      <div class="panel-heading">文档标签列表</div>
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr role="row">
          <th>名称</th>
          <th>别名</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tag in tags">
          <td>{{tag.name}}</td>
          <td>{{tag.alias}}</td>
          <td>{{tag.comments}}</td>
          <td>
            <button class="btn btn-default" @click="editTag(tag)">修改</button>
            <button class="btn btn-danger" @click="delTag(tag._id)">删除</button>
          </td>
        </tr>
        <tr v-if="tags.length <= 0">
          <td style="text-align: center; font-size: 26px;" colspan="4">没找到数据</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="addNewTag" tabindex="1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" v-if="updateID">修改文档标签</h4>
            <h4 class="modal-title" v-else>添加文档标签</h4>
          </div>
          <div class="modal-body">
            <form role="form" class="form-horizontal">
              <div class="form-group">
                <label class="control-label col-sm-4">名称</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入名称" v-model="newTag.name" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">别名</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入别名" v-model="newTag.alias" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">备注</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入备注" v-model="newTag.comments"/></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" @click="hideEdit()">关闭</button>
                <button type="submit" class="btn btn-primary" @click="submitData()">提交</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getTags, delTags, addTags, updateTags} from '../apis/tags';

  import pageTitle from '../components/page-title.vue';

  export default {
    components: {
      pageTitle
    },
    data      : function () {
      return {
        tags: [],
        newTag   : {},
        updateID  : 0
      };
    },
    methods   : {
      getTags() {
        getTags().then((data) => {
          this.tags = data;
        });
      },
      delTag(id) {
        layer.confirm('确定要删除码吗？', {btn: ['确认', '取消']}, () => {
          delTags({}, [id]).then((data) => {
            layer.msg('删除成功', {icon: 1, time: 1000});
            this.getTags();
          }).catch((err) => {
            console.log(err);
            layer.msg('删除失败', {icon: 2, time: 1000});
          });
        });
      },
      submitData() {
        const newTag = this.newTag;

        if (!newTag.name) {
          layer.msg('名称不能为空', {icon: 1, time: 1000});
          return;
        }

        if (!newTag.alias) {
          layer.msg('别名不能为空', {icon: 1, time: 1000});
          return;
        }

        let subFun;
        const params = [];

        if (this.updateID) {
          subFun = updateTags;
          params.push(this.updateID);
        } else {
          subFun = addTags;
        }

        subFun(newTag, params).then(() => {
          this.hideEdit();
          this.getTags();
        });
      },
      editTag(tag) {
        this.newTag = tag;
        this.initEdit(tag._id);
      },
      initEdit(id) {
        $('#addNewTag').modal('show');
        this.updateID = id || 0;
      },
      hideEdit() {
        $('#addNewTag').modal('hide');
        this.updateID = 0;
        this.newTag  = {};
      }
    },
    created () {
      this.getTags();
    }
  }
</script>
