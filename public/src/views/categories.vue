<template>
  <div>
    <page-title title="文档类别管理"></page-title>
    <div class="row nav-tab mb20">
      <div class="col-md-4">
        <button class="btn btn-primary" @click="initEdit()">添加文档类别</button>
      </div>
    </div>

    <div class="panel panel-primary mt20">
      <div class="panel-heading">文档类别列表</div>
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr role="row">
          <th>一级分类</th>
          <th>二级分类</th>
          <th>三级分类</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="category in categories">
          <tr>
            <td>{{category.name}}</td>
            <td>------</td>
            <td>------</td>
            <td>
              <button class="btn btn-success" @click="addCategory(category)">添加子类</button>
              <button class="btn btn-default" @click="updateCategory(category)">修改</button>
              <button class="btn btn-danger" @click="delCategory(category.id)">删除</button>
            </td>
          </tr>

          <template v-for="children1 in category.children">
            <tr>
              <td></td>
              <td>{{children1.name}}</td>
              <td>------</td>
              <td>
                <button class="btn btn-success" @click="addCategory(children1)">添加子类</button>
                <button class="btn btn-default" @click="updateCategory(children1)">修改</button>
                <button class="btn btn-danger" @click="delCategory(children1.id)">删除</button>
              </td>
            </tr>

            <template v-for="children2 in children1.children">
              <tr>
                <td></td>
                <td></td>
                <td>{{children2.name}}</td>
                <td>
                  <button class="btn btn-default" @click="updateCategory(children2)">修改</button>
                  <button class="btn btn-danger" @click="delCategory(children2.id)">删除</button>
                </td>
              </tr>
            </template>
          </template>
        </template>

        <tr v-if="categories.length <= 0">
          <td style="text-align: center; font-size: 26px;" colspan="4">没找到数据</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="addNewCategory" tabindex="1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" v-if="updateID">编辑分类</h4>
            <h4 class="modal-title" v-else>添加分类</h4>
          </div>
          <div class="modal-body">
            <form role="form" class="form-horizontal">
              <div class="form-group">
                <label class="control-label col-sm-4">父类别</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" v-model="newCategory.parentID" readonly/>
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-sm-4">类别名称</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入名称" v-model="newCategory.name" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">是否显示</label>
                <div class="col-sm-6">
                  <input type="checkbox" class="checkbox-inline" v-model="newCategory.state"/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">URL</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入URL" v-model="newCategory.homePage" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">排序</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入排序顺序编号" v-model="newCategory.sortId"
                         required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">关键字</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入关键字" v-model="newCategory.keywords"/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">描述</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入描述" v-model="newCategory.comments"/></div>
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
  import {getCategory, delCategory, addCategory, updateCategory} from '../apis/category';

  import pageTitle from '../components/page-title.vue';

  export default {
    components: {
      pageTitle
    },
    data      : function () {
      return {
        categories : [],
        newCategory: {},
        updateID   : 0
      };
    },
    methods   : {
      getCategory() {
        getCategory().then((data) => {
          this.categories = data;
        });
      },
      delCategory(id) {
        layer.confirm('确定要删除码吗？', {btn: ['确认', '取消']}, () => {
          delCategory({}, [id]).then((data) => {
            layer.msg('删除成功', {icon: 1, time: 1000});
            this.getCategory();
          }).catch((err) => {
            console.log(err);
            layer.msg('删除失败', {icon: 2, time: 1000});
          });
        });
      },
      submitData() {
        const newCategory = this.newCategory;

        if (!newCategory.name) {
          layer.msg('名称不能为空', {icon: 1, time: 1000});
          return;
        }

        if (!newCategory.homePage) {
          layer.msg('URL不能为空', {icon: 1, time: 1000});
          return;
        }
        newCategory.state = newCategory.state ? 1 : 0;
        let subFun;
        const params      = [];

        if (this.updateID) {
          subFun = updateCategory;
          params.push(this.updateID);
        } else {
          subFun = addCategory;
        }

        subFun(newCategory, params).then(() => {
          this.hideEdit();
          this.getCategory();
        });
      },
      initEdit(id) {
        $('#addNewCategory').modal('show');
        this.updateID = id || 0;
      },
      hideEdit() {
        $('#addNewCategory').modal('hide');
        this.updateID    = 0;
        this.newCategory = {};
      },
      addCategory(model)  {
        this.newCategory = {
          parentID  : model.id,
          sortPath  : model.sortPath,
          defaultUrl: model.defaultUrl,
          state     : 1
        };
        this.initEdit(0);
      },
      updateCategory(model) {
        this.newCategory = model;
        if (this.newCategory.state == 0) {
          this.newCategory.state = false;
        } else {
          this.newCategory.state = true;
        }
        this.initEdit(model.id);
      }
    },
    created() {
      this.getCategory();
    }
  }
</script>
