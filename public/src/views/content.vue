<template>
  <div>
    <page-title title="文档管理"></page-title>
    <div class="row nav-tab mb20">
      <div class="col-md-2">
        <button class="btn btn-primary">添加文档</button>
      </div>

      <div class="col-md-2">
        <select class="form-control" v-model="category" @change="getContents()">
          <option :value="''">全部</option>
          <template v-for="category in categories">
            <option :value="category.id">{{category.name}}</option>
            <template v-for="children1 in category.children">
              <option :value="children1.id">|------{{children1.name}}</option>
              <template v-for="children2 in children1.children">
                <option :value="children2.id">|------|------{{children2.name}}</option>
              </template>
            </template>
          </template>
        </select>
      </div>

      <div class="col-md-4">
        <input v-model="searchKey" class="form-control" type="text" @keyup.enter="getContents()"
               placeholder="请输入要查询的关键字"/>
      </div>

    </div>

    <div class="panel panel-primary mt20">
      <div class="panel-heading">文档列表</div>
      <table class="table table-striped table-hover table-bordered">
        <thead>
        <tr role="row">
          <th>封面</th>
          <th>标题</th>
          <th>创建时间</th>
          <th>类别</th>
          <th>阅读量</th>
          <th>显示</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="content in contents">
          <td><img :src="content.sImg" class="cover"/></td>
          <td>{{content.title}}</td>
          <td>{{content.date}}</td>
          <td>{{content.category.name}}</td>
          <td>{{content.clickNum}}</td>
          <td>{{content.state}}</td>
          <td>
            <button class="btn btn-success" @click="publishContent(content._id, true)" v-show="!content.state">发布
            </button>
            <button class="btn btn-warning" @click="publishContent(content._id, false)" v-show="content.state">取消发布
            </button>
            <button class="btn btn-default" @click="">修改</button>
            <button class="btn btn-danger" @click="delContents(content._id)">删除</button>
          </td>
        </tr>
        <tr v-if="contents.length <= 0">
          <td style="text-align: center; font-size: 26px;" colspan="7">没找到数据</td>
        </tr>
        </tbody>
      </table>
    </div>

    <pagination
      :totalPage="totalPage"
      :currentPage="currentpage"
      :changeCallback="parentCallback"
      v-if="totalPage > 1">
    </pagination>

  </div>
</template>

<script>
  import {getContents, delContents, updateContents} from '../apis/contents';
  import {getCategory} from '../apis/category';

  import pageTitle from '../components/page-title.vue';
  import pagination from '../components/pagination.vue';

  export default {
    components: {
      pageTitle,
      pagination
    },
    data      : function () {
      return {
        contents   : [],
        searchKey  : '',
        pageSize   : 10,
        totalPage  : 0,
        currentpage: 1,
        category   : '',
        categories : []
      };
    },
    methods   : {
      getCategory() {
        getCategory().then((data) => {
          this.categories = data;
        });
      },
      getContents() {
        getContents([], {
          page     : this.currentpage,
          count    : this.pageSize,
          category : this.category,
          searchKey: this.searchKey
        }).then((data) => {
          this.contents  = data.list;
          this.totalPage = Math.ceil(data.total / this.pageSize);
        });
      },
      delContents(id) {
        layer.confirm('确定要删除码吗？', {btn: ['确认', '取消']}, () => {
          delContents({}, [id]).then((data) => {
            layer.msg('删除成功', {icon: 1, time: 1000});
            this.getContents();
          }).catch((err) => {
            console.log(err);
            layer.msg('删除失败', {icon: 2, time: 1000});
          });
        });
      },
      publishContent(id, state) {
        updateContents({
          state: state
        }, [id]).then((data) => {
          this.getContents();
        }).catch((err) => {
          console.log(err);
        });
      },
      parentCallback(cPage)  {
        this.currentpage = cPage;
        this.getContents();
      }
    },
    created () {
      this.getContents();
      this.getCategory();
    }
  }
</script>
