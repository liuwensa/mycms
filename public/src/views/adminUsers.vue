<template>
  <div>
    <page-title title="系统用户管理"></page-title>
    <div class="row nav-tab mb20">
      <div class="col-md-4">
        <button class="btn btn-primary" @click="initEdit()">添加系统用户</button>
      </div>
    </div>

    <div class="panel panel-primary mt20">
      <div class="panel-heading">系统用户列表</div>
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr role="row">
          <th>用户名</th>
          <th>用户类型</th>
          <th>姓名</th>
          <th>联系方式</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in adminUsers">
          <td>{{user.userName}}</td>
          <td>{{user.group.name}}</td>
          <td>{{user.name}}</td>
          <td>{{user.phoneNum}}</td>
          <td>{{user.email}}</td>
          <td>
            <button class="btn btn-default" @click="editUser(user)">修改</button>
            <button class="btn btn-danger" @click="delUser(user._id)">删除</button>
          </td>
        </tr>
        <tr v-if="adminUsers.length <= 0">
          <td style="text-align: center; font-size: 26px;" colspan="3">没找到数据</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="addNewAdminUser" tabindex="1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" v-if="updateID">修改用户信息</h4>
            <h4 class="modal-title">添加新用户</h4>
          </div>
          <div class="modal-body">
            <form role="form" class="form-horizontal">
              <div class="form-group">
                <label class="control-label col-sm-4">用户名</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入用户名" v-model="newUser.userName" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">姓名</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入姓名" v-model="newUser.name" required/>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">用户组</label>
                <div class="col-sm-6">
                  <select class="form-control" v-model="newUser.group">
                    <option v-for="(group, index) in groups"
                            :value="group._id"
                            :selected="0==index">{{group.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">电话</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入电话" v-model="newUser.phoneNum"/></div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-4">邮箱</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" placeholder="请输入邮箱" v-model="newUser.email"/>
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
  import {getAdminUsers, delAdminUser, addAdminUser, updateAdminUser} from '../apis/adminUser';

  import pageTitle from '../components/page-title.vue';

  export default {
    components: {
      pageTitle
    },
    data      : function () {
      return {
        adminUsers: [],
        groups    : [
          {
            _id : 'rkCGFSFr',
            name: '管理员'
          }
        ],
        newUser   : {},
        updateID  : 0
      };
    },
    methods   : {
      getAdminUsers() {
        getAdminUsers().then((data) => {
          this.adminUsers = data;
        });
      },
      delUser(id) {
        layer.confirm('确定要删除码吗？', {btn: ['确认', '取消']}, () => {
          delAdminUser({}, [id]).then((data) => {
            layer.msg('删除成功', {icon: 1, time: 1000});
            this.getAdminUsers();
          }).catch((err) => {
            console.log(err);
            layer.msg('删除失败', {icon: 2, time: 1000});
          });
        });
      },
      submitData() {
        const newUser = this.newUser;

        if (!newUser.userName) {
          layer.msg('用户名不能为空', {icon: 1, time: 1000});
          return;
        }

        if (!newUser.name) {
          layer.msg('姓名不能为空', {icon: 1, time: 1000});
          return;
        }

        if (!newUser.group) {
          layer.msg('用户组不能为空', {icon: 1, time: 1000});
          return;
        }

        let subFun;
        const params = [];

        if (this.updateID) {
          subFun = updateAdminUser;
          params.push(this.updateID);
        } else {
          subFun = addAdminUser;
        }

        subFun(newUser, params).then(() => {
          this.hideEdit();
          this.getAdminUsers();
        });
      },
      editUser(user) {
        this.newUser = user;
        this.newUser.group = user.group._id;
        this.initEdit(user._id);
      },
      initEdit(id) {
        $('#addNewAdminUser').modal('show');
        this.updateID = id || 0;
      },
      hideEdit() {
        $('#addNewAdminUser').modal('hide');
        this.updateID = 0;
        this.newUser  = {};
      }
    },
    created () {
      this.getAdminUsers();
    }
  }
</script>
