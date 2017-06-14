<template>
  <div>
    <page-title title="目录管理"></page-title>
    <div class="row nav-tab mb20">
      <div class="col-md-4">
        <button class="btn btn-primary" @click="initEdit()">添加一级目录</button>
      </div>
    </div>

    <div class="panel panel-primary mt20">
      <div class="panel-heading">目录列表</div>
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr role="row">
          <th>一级目录</th>
          <th>二级目录</th>
          <th>三级目录</th>
          <th>路由</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="menu in menus">
          <tr>
            <td>{{menu.name}}</td>
            <td>------</td>
            <td>------</td>
            <td></td>
            <td>
              <button class="btn btn-success" @click="addMenus(menu)">添加子类</button>
              <button class="btn btn-default" @click="updateMenus(menu)">修改</button>
              <button class="btn btn-danger" @click="delMenus(menu.id)">删除</button>
            </td>
          </tr>

          <template v-for="children1 in menu.children">
            <tr>
              <td></td>
              <td>{{children1.name}}</td>
              <td>------</td>
              <td></td>
              <td>
                <button class="btn btn-success" @click="addMenus(children1)">添加子类</button>
                <button class="btn btn-default" @click="updateMenus(children1)">修改</button>
                <button class="btn btn-danger" @click="delMenus(children1.id)">删除</button>
              </td>
            </tr>

            <template v-for="children2 in children1.children">
              <tr>
                <td></td>
                <td></td>
                <td>{{children2.name}}</td>
                <td>{{children2.route}}</td>
                <td>
                  <button class="btn btn-default" @click="updateMenus(children2)">修改</button>
                  <button class="btn btn-danger" @click="delMenus(children2.id)">删除</button>
                </td>
              </tr>
            </template>
          </template>
        </template>

        <tr v-if="menus.length <= 0">
          <td style="text-align: center; font-size: 26px;" colspan="5">没找到数据</td>
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
            <h4 class="modal-title" v-if="updateID">编辑目录</h4>
            <h4 class="modal-title" v-else>添加目录</h4>
          </div>
          <div class="modal-body">
            <form role="form" class="form-horizontal">
              <div class="form-group">
                <label class="control-label col-sm-4">目录父级</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" v-model="newMenus.parentID" readonly/>
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-sm-4">目录名称</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入名称" v-model="newMenus.name" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">目录URL</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入URL" v-model="newMenus.route"/>
                </div>
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
  import {getMenus, delMenus, addMenus, updateMenus} from '../apis/menus';

  import pageTitle from '../components/page-title.vue';

  export default {
    components: {
      pageTitle
    },
    data      : function () {
      return {
        menus : [],
        newMenus: {},
        updateID   : 0
      };
    },
    methods   : {
      getMenus() {
        getMenus().then((data) => {
          this.menus = data;
        });
      },
      delMenus(id) {
        layer.confirm('确定要删除码吗？', {btn: ['确认', '取消']}, () => {
          delMenus({}, [id]).then((data) => {
            layer.msg('删除成功', {icon: 1, time: 1000});
            this.getMenus();
          }).catch((err) => {
            console.log(err);
            layer.msg('删除失败', {icon: 2, time: 1000});
          });
        });
      },
      submitData() {
        const newMenus = this.newMenus;

        if (!newMenus.name) {
          layer.msg('名称不能为空', {icon: 1, time: 1000});
          return;
        }

        let subFun;
        const params      = [];

        if (this.updateID) {
          subFun = updateMenus;
          params.push(this.updateID);
        } else {
          subFun = addMenus;
        }

        subFun(newMenus, params).then(() => {
          this.hideEdit();
          this.getMenus();
        });
      },
      initEdit(id) {
        $('#addNewCategory').modal('show');
        this.updateID = id || 0;
      },
      hideEdit() {
        $('#addNewCategory').modal('hide');
        this.updateID    = 0;
        this.newMenus = {};
      },
      addMenus(model)  {
        this.newMenus = {
          parentID  : model.id
        };
        this.initEdit(0);
      },
      updateMenus(model) {
        this.newMenus = model;
        this.initEdit(model.id);
      }
    },
    created() {
      this.getMenus();
    }
  }
</script>
