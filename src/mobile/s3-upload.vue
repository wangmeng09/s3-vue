<template>
  <div class="s3-fileUpload">

    <!--历史附件-->
    <ul class="upload-list upload-list--picture-card">
      <li tabindex="0" class="upload-list__item " v-for="file in filelist">
        <a :href="file.annexUrl" download class=""></a>
        <span>{{file.annexName}}</span>
        <i  @click="deleteFile(file.annexUrl)">删除</i>
      </li>
    </ul>
    <div class="aboutFile">
      <div tabindex="0" class="upload upload--picture-card">
        <i class="icon-plus">+</i>
        <input type="file" name="file" class="upload--input" @change="upload">
      </div>

      <div class="fileReader">
        <span v-if="fileupload && !preview">{{fileupload.name}}</span>
        <img  v-if="fileupload && preview" :src="imageSrc" alt="">
        <span v-if="!fileupload">添加附件内容</span>
      </div>

      <div v-if="fileupload" class="fileLoading">
        <span>{{fileLoading}}</span>
      </div>
    </div>

    <div class="page-progress-wrapper">
      <mt-button size="small" type="primary" @click.native="uploadFile" class="skin-back">上传文件</mt-button>
      <mt-progress :value="progress" v-if="progressShow" transition="progress-fade">
        <div slot="end">{{ progress }}%</div>
      </mt-progress>
    </div>


  </div>
</template>
<script>

  export default {
    name:'s3-upload',
    props: {
      fileLoading: {
        type: String,
        default: '上传中...'
      },
      filelist:{
        type:Array
      }
    },
    data () {
      return {
        fileupload: '',
        imageSrc:'',
        progressShow:false,
        progress:0
      }
    },
    methods: {
      //预览文件
      upload(e) {
        var that = this;
        var fileupload = e.target.files[0];
        this.fileupload = fileupload;
        let fileReader = new FileReader();
        if(this.fileupload.type.indexOf("image")>-1){
          this.preview = true;
          fileReader.readAsDataURL(this.fileupload)
          fileReader.onload = function(){
            that.imageSrc = this.result;
          }
        }

      },
      //上传文件
      uploadFile() {
        if(this.fileupload.name.lastIndexOf(".")>-1){
          let res = s3.checkFile(this.fileupload);
          if (res.status =='400'){
            this.fileLoading = res.retMsg;
          }else{
            this.$emit('sendFile',this.fileupload)
          }
        }

      },
      //删除上传文件
      deleteFile(url){
        // 子组件中触发父组件方法deleteFile并传值url
        this.$emit('deleteFile', url)
      },
      //显示进度条
      onprogress (event) {
        this.progressShow = true;
        //如果此函数为axios回调
        console.log(event);
        this.progress = Math.round((event.loaded * 100) / event.total);
        if(this.progress==100){
          this.progressShow = false;
        }
      },


    },
    watch: {
      value(val) {
        if (val >= 100) {
          this.uploading = false;
          this.progressVisible = false;
          setTimeout(() => Toast({ message: '上传成功', position: 'bottom', duration: 1000 }), 200);
          clearTimeout(this.timer);
        }
      }
    },
    created(){
//      s3.setAllow(['txt']);
    },
  }
</script>
<style>
  .s3-fileUpload .upload-list--picture-card {
    margin: 0;
    display: inline;
    vertical-align: top;
    padding: 0;
    list-style: none;
  }
  .s3-fileUpload .upload--picture-card {
    position: relative;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    cursor: pointer;
    line-height: 96px;
    vertical-align: top;
    display: inline-block;
    text-align: center;
    outline: none;
  }
  .s3-fileUpload .upload--picture-card i {
    font-size: 28px;
    color: #8c939d;
    font-style: normal;
  }
  .s3-fileUpload .upload--input {
    opacity: 0;
    top: 0;left: 0;
    position: absolute;
    width: 100px;
    height: 100px;
  }
  .s3-fileUpload .aboutFile{
    height: 100px;
    overflow: hidden;
  }
  .s3-fileUpload .aboutFile>div{
    float: left;
  }
  .s3-fileUpload .fileReader{
    height: 100%;
    line-height: 100px;
    margin-left: 10px;
  }
  .s3-fileUpload .fileReader>img{
    width: 100px;
    height: 100px;
  }
  .s3-fileUpload .fileLoading{
    height: 100%;
    line-height: 100px;
    margin-left: 10px;
  }
  .s3-fileUpload .page-progress-wrapper .mint-button{
    margin-top: 15px;
  }
</style>
