<template>
  <div>
    <div class="oss_file">
      <input type="file" :id="id" :multiple="multiple" @change="doUpload"/>
    </div>
  </div>
  </div>
</template>
<script>
  export default{
    props:{
      multiple:{
        type: Boolean,
        twoWay:false
      },
      id:{
        type: String,
        twoWay:false
      },
      url:{
        type: Array,
        twoWay:true
      }
    },
    data(){
      return{
        region:'oss-cn-shenzhen.aliyuncs.com',
        bucket:'cedar-test',
      };
    },
    methods:{
      doUpload(){
        const _this = this;
        _this.axios.get(_this.GLOBAL.API.insecure+'/oss/api').then((result) => {
          const resultData = result.data;
          //console.log(JSON.stringify(result.data),'----result')
          const client = new OSS.Wrapper({
            endpoint:_this.region,
            accessKeyId: resultData.data.accessKeyId,
            accessKeySecret: resultData.data.accessKeySecret,
            stsToken: resultData.data.securityToken,
            bucket:_this.bucket
          })
          const files = document.getElementById(_this.id);
          if(files.files){
            const fileLen = document.getElementById(_this.id).files
            const resultUpload = [];
            for (let i = 0; i < fileLen.length; i++) {
                if(fileLen > 9){
                    _this.Gtip('最多上传9张');
                    return
                }
              const file = fileLen[i];
              const storeAs = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop();//file.name;
              client.multipartUpload(storeAs, file, {

              }).then((results) => {
                  console.log(results,'--upload---results');
                if(results.url){
                  resultUpload.push(results.url);
                }
              }).catch((err) => {
                console.log(err);
              });
            }
            _this.url = resultUpload;
            this.$emit('url', _this.url)
          }
        });
      },
      // 随机生成文件名
      random_string(len) {
        len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for (let i = 0; i < len; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      }

    }
  };
</script>
<style type="text/css">
  .oss_file {
    height: 100px;
    width: 100%;

  }
  .oss_file  input {
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

</style>
