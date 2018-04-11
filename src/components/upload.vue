<template>
  <div class="index">
    <div class="oss_file">
      <div class="vue-file-upload">
      <span class="Item-upload"></span>
      <input type="file" :id="id" multiple="false" @change="doUpload" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" />
      </div>
      <hr>
      <p>
        上传进度：{{percentage}}
        {{percentage===1?"success!":(percentage===0?'waiting...':'uploading')}}
      </p>
      <hr>
      <ul>
        <li v-for="u in urls">{{u}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'upload',
    props:['maxNum','limitNum'],
    data () {
      return {
        region: 'oss-cn-shenzhen.aliyuncs.com',
        bucket: 'cedar-test',
        id: 'upload',
        percentage: 0,
        url:'',
        urls:[],
        fileInfo:{}
      }
    },
    methods:{
      doUpload (Val, event) {
        const _this = this
        const urls = [];
        _this.axios.get(_this.GLOBAL.API.insecure+'/oss/getStsInfo').then((result) => {
          const resultData = result.data;
          const client = new OSS.Wrapper({
            endpoint: _this.region,
            accessKeyId: resultData.data.accessKeyId,
            accessKeySecret: resultData.data.accessKeySecret,
            stsToken: resultData.data.securityToken,
            bucket: _this.bucket
          })
          _this.percentage = 0;
          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files
            //alert(_this.maxNum);
            //alert(_this.limitNum);
            if(_this.maxNum > _this.limitNum){
                _this.Gtip('最多可上传'+_this.limitNum+'张');
                return;
            }
            let resultUpload = ''
            _this.GloadingShow('上传中请等待..');
            for (let i = 0; i < fileLen.length; i++) {
              const file = fileLen[i]
              // 随机命名
              let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              // 上传
              setTimeout(function(){
                client.multipartUpload(random_name, file, {
                  progress: function* (percentage, cpt) {
                    // 上传进度
                    _this.percentage = percentage
                    console.log(percentage);
                    if(percentage != 1){
                      _this.GloadingShow('上传中请等待..');
                    }else{
                      _this.GloadingHide();
                    }
                  }
                }).then((results) => {
                  // 上传完成
                  const url = 'http://'+_this.bucket+'.'+_this.region+'/'+ results.name;
                  _this.url = url;
                  _this.fileInfo = {'httpUrl':url,'fileName':results.name};
                  _this.$emit('set-Val', _this.fileInfo)
                  console.log(url,'---upload-url');
                  _this.GloadingHide();
                }).catch((err) => {
                  _this.GloadingHide();
                  _this.Gtip('上传失败');
                  console.log(err)
                })
              },500)


            }
          }
        })
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
    },
    watch:{
      url(val){
        if(val){
          this.urls.push(val);
        }
      }
    },

  }
</script>
