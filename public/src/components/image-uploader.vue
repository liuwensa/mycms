<template>
  <div class="uploader">
    <div class="msg msg-{{msgType}}" v-show="hasMsg">{{msg}}</div>
    <div class="close-icon" @click="removeImage()" v-show="showRemove">&times;</div>
    <button class="add" type="button"><i class="fa fa-plus"></i></button>
    <table>
      <tbody>
      <tr>
        <td>
          <img :src="src"/>
        </td>
      </tr>
      </tbody>
    </table>
    <input @change='handleFile' type="file">
  </div>
</template>

<script>
  import {uploadImage} from '../apis/commons';
  export default {
    props  : ['src'],
    data() {
      return {
        showRemove: true,
        file      : '',
        msg       : '',
        msgType   : 'info',
        hasMsg    : false
      };
    },
    methods: {
      handleFile(event) {
        const reader = new FileReader();
        const file   = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const postData = {
            'Content-Type': file.type || 'multipart/form-data',
            file          : file
          };

          uploadImage(postData)
            .then((data) => {
              const imgInfo = data[0];

              const src    = `${imgInfo.imageUrl}${imgInfo.url}`;
              this.msgType = 'info';
              this.hasMsg  = true;
              this.msg     = `图片上传成功`;

//                this.src = reader.result;
              this.src = src;
              this.$emit('uploadImage', this.src)
            })
            .catch((err) => {
              this.msgType = 'error';
              this.hasMsg  = true;
              this.msg     = `图片上传失败`;
              console.log(err);
            });
        };
      },
      removeImage() {
        this.src = '';
        this.$emit('uploadImage', this.src)
      }
    }
  };
  /* eslint eol-last: 0*/
</script>

<style scoped>
  .uploader {
    position: relative;
    background-color: #fff;
    width: 360px;
    height: 270px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px;
    margin: 15px 30px 20px 0;
    display: inline-block;
  }

  .msg {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    color: white;
    padding: 5px;
    border-radius: 5px;
  }

  .msg:before {
    content: '';
    border: 5px solid transparent;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }

  .msg-error {
    background-color: red;
  }

  .msg-error:before {
    border-top-color: red;
  }

  .msg-info {
    background-color: powderblue;
  }

  .msg-info:before {
    border-top-color: powderblue;
  }

  .uploader table {
    width: 100%;
    height: 100%;
    background: #EEEEEE;
  }

  .uploader table tr > td {
    vertical-align: middle;
    text-align: center;
  }

  .uploader img {
    display: inline-block;
    max-height: 200px;
    max-width: 100%;
    vertical-align: middle;
    background: #333333;
  }

  .uploader .delete {
    position: absolute;
    top: 10px;
    right: 10px;
    -webkit-appearance: none;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #FF0000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=50);
    opacity: .5;
  }

  .uploader .delete:focus, .uploader .delete:hover {
    color: #FF0000;
    text-decoration: none;
    cursor: pointer;
    filter: alpha(opacity=80);
    opacity: .8;
  }

  .uploader .add {
    position: absolute;
    height: 80px;
    width: 80px;
    top: 50%;
    margin-top: -40px;
    left: 50%;
    margin-left: -40px;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    font-size: 60px;
    font-weight: 700;
    line-height: 1;
    color: #FFF;
    text-shadow: 0 1px 0 #000;
    filter: alpha(opacity=0);
    opacity: 0;
  }

  .uploader:focus .add, .uploader:hover .add {
    color: #FFF;
    text-decoration: none;
    cursor: pointer;
    filter: alpha(opacity=80);
    opacity: .8;
    -webkit-transition: opacity .5s ease-in-out;
    -moz-transition: opacity .5s ease-in-out;
    -ms-transition: opacity .5s ease-in-out;
    -o-transition: opacity .5s ease-in-out;
    transition: opacity .5s ease-in-out;
  }

  .uploader input[type=file] {
    opacity: 0;
    filter: alpha(opacity=0);
    position: absolute;
    height: 80px;
    width: 80px;
    top: 50%;
    margin-top: -40px;
    left: 50%;
    margin-left: -40px;
  }

  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(255, 0, 0, 0.6);
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 30px;
    border-radius: 0 4px 0 4px;
    color: white;
    cursor: pointer;
  }

  .close-icon:hover {
    background-color: red;
  }
</style>
