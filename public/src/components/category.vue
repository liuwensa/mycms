<template>
  <select class="form-control typeselect" v-model="value" @change="onchange($event)">
    <option :value="" v-if="categories[0] && categories[0].id">请选择</option>
    <template v-for="category in categories">
      <option v-if="category[key] || category.id || category.id == 0" :value="key?category[key]:category.id">{{category.name}}</option>
      <template v-for="children1 in category.children">
        <option :value="key?children1[key]:children1.id">|------{{children1.name}}</option>
        <template v-for="children2 in children1.children">
          <option :value="key?children2[key]:children2.id">|------|------{{children2.name}}</option>
        </template>
      </template>
    </template>
  </select>
</template>

<script>
  export default {
    props: ['value', 'categories', 'key', 'name', 'index', 'isall'],
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
