<template>
  <div>
    <page-title title="系统用户管理"></page-title>
    <div class="row">
      <div class="col-md-12">
        <div class="box box">
          <div class="box-header with-border">
            <h3 class="box-title">用户信息</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body">
            <div class="table-responsive">
              <table class="table no-margin">
                <tbody>
                <tr>
                  <td>用户账号</td>
                  <td><span class="label label-success">{{userInfo.name}}</span></td>
                  <td>用户名</td>
                  <td><span class="label label-success">{{userInfo.userName}}</span></td>
                </tr>
                <tr>
                  <td>用户组</td>
                  <td><span class="label label-success">{{userInfo.group.name}}</span></td>
                  <td>最后登录时间</td>
                  <td><span class="label label-success">{{userInfo.date}}</span></td>
                </tr>
                <tr>
                  <td>最后登录ip</td>
                  <td><span class="label label-success">444</span></td>
                  <td>登录次数</td>
                  <td><span class="label label-success">100</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">资源统计</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body">
            <div class="table-responsive">
              <table class="table no-margin">
                <tbody>
                <tr>
                  <td><a href="">文档统计</a></td>
                  <td>0</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import pageTitle from '../components/page-title.vue';
  export default {
    components: {
      pageTitle
    },
    data      : function () {
      return {
        userInfo: window.userInfo
      };
    },
    methods   : {}
  }
</script>
