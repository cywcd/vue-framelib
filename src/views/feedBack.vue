<template>
  <div class="feedBack" v-title="'意见反馈-'+this.GLOBAL.systemTitle">
    <x-header :left-options="{showBack:false, backText: ''}" class="t-blue">意见反馈<a slot="right"><router-link to="feedBackList">我的反馈</router-link></a></x-header>
    <div class="formbox" style="padding:15px;">
      <group>
        <x-input v-model="dataJson.title" title="<span class='red'>*</span>标题" name="title" :max="66" placeholder="请输入标题" ></x-input>
        <x-textarea v-model="dataJson.content"  title="<span class='red'>*</span>内容" name="content" :max="680" :height="200" placeholder="请输入内容" :show-counter="true"></x-textarea>
        <div class="weui-cell">
          <label class="weui-label"> 图片</label>
          <div class="imgCon weui-cell__bd">
            <div class="Item-imgbox">
              <span class="picbox" v-for="(item,index) in imgUrls">
                <img class="Item-img" :src="item">
                <i @click="itemRemove(innerItem,innerIndex)" v-if="index == innerIndex"  v-for="(innerItem,innerIndex) in files" class="removebox">
                <icon name="remove" scale="1" class="icon-remove"></icon>
                </i>
              </span>
            </div>
            <div class="fileBtn" v-show="curimgNum < maxNum">
              <upload @set-Val="onsetVal" :maxNum="curimgNum" :limitNum="maxNum"></upload>
            </div>
          </div>
        </div>
      </group>
      <div style="padding:15px; margin-top:20px;">
        <x-button @click.native="feedSubmit" :gradients="['#1D62F0', '#19D5FD']">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script>
    import $ from 'webpack-zepto'
    import {XHeader, XInput, XTextarea, Group, XButton} from 'vux'
    import CryptoJS  from 'crypto-js';
    import 'vue-awesome/icons/remove'
    import upload from './../components/upload'

    export default {
        name: 'feedBack',
        components: {
          XHeader,
          XInput,
          XTextarea,
          Group,
          XButton,
          upload
        },
        data () {
            return {
              imgIdAtrr:[],
              aliuploadUrl:[],
              uploadId:'file',
              signJson:{
                AK:'grandview-web',
                SK:'grandview-web-admin',
                version:'1.0',
                appKey:'grandview-web',
              },
              dataJson:{
                  method: 'aquilaflycloud.sys.notify.notifysendadd',
                  title:'',
                  content:'',
                  attachmentPicsList:[],
                  channel:'BAPP',
                  type:'message',
                  feedbackType:'YC',
                  notifyType:'YJFK',
                  confirmation: 'N',
                  sendShopUserId: [''],
                  userSessionId: '',
                  feedbackType:"YC",
                  mobile:'18212345678',
              },
              imgUrls:[],
              files:[],
              maxNum:9,
              curimgNum:0,
            }
          },
          mounted(){
            this.curimgNum = this.imgUrls.length;
          },
          activated(){
          },
          methods: {
            onsetVal: function(val){
              if(this.imgUrls.length < this.maxNum){
                this.imgUrls.push(val.httpUrl)
                this.files.push(val.httpUrl)
                this.dataJson.attachmentPicsList.push(val);
              }
              this.curimgNum = this.imgUrls.length;
            },
            feedSubmit: function(){
              this.dataJson.title = $.trim(this.dataJson.title);
              this.dataJson.content = $.trim(this.dataJson.content);
              if(this.dataJson.title == ''){
                this.Gtip('标题不能为空');
                return;
              }
              if(this.dataJson.content == ''){
                this.Gtip('内容不能为空');
                return;
              }
              if(this.imgUrls.length > this.maxNum){
                this.Gtip('图片最多上传'+this.maxNum+'张');
                return;
              }
              const params = {ticket:'test'};
              var that = this;
              this.axios.post(this.GLOBAL.API.workplusLogin,this.GLOBAL.Qs.stringify(params),{
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }).then((response) => {
                  if(response.data.code){
                  this.GloadingHide();
                  this.Gtip(response.data.message);
                  return;
                  }
                  //console.log(response.data.data.jwtUser.workplusUser.phone,'----.data');
                  const phone = response.data.data.jwtUser.workplusUser.phone;
                  this.token = response.data.data.jwt;
                  console.log(phone,'----phone');
                  this.dataJson.mobile = phone;
                  this.GloadingHide();
                  let signInfo = this.signJson.AK + this.signJson.SK + "appKey" + this.signJson.AK + "format" + "json" + "param_json" + JSON.stringify(this.dataJson) + "version" + this.signJson.version + this.signJson.SK + this.signJson.AK ;
                  console.log(signInfo);
                  let signData = CryptoJS.SHA1(signInfo);
                  signData = signData.toString().toUpperCase();
                  console.log(signData,'-----signData');
                  console.log(JSON.stringify(this.dataJson),'------dataJson');
                  let vo = {
                      appKey:this.signJson.AK,
                      format:'json',
                      version: this.signJson.version,
                      sign:signData,
                  }
                  let params = $.param(vo);
                  this.axios.post(this.GLOBAL.API.router+'?'+params,
                      this.dataJson
                  ).then((response) => {
                      console.log(response.data)
                      if(response.data.errorCode == '0'){
                          this.Gtip('提交成功');
                          this.$router.push({ path: '/feedBackList' });
                      }else{
                          if(response.data.errorMsg){
                              this.Gtip(response.data.errorMsg);
                          }else{
                              this.Gtip(this.GLOBAL.errorTip);
                          }
                      }
                  }).catch(function(err){
                      console.log(err)
                      that.Gtip(that.GLOBAL.errorTip);
                      that.Gtip(that.GLOBAL.errorApi);
                  })

              }).catch(function(err){
                    that.GloadingHide();
                    that.Gtip(that.GLOBAL.errorTip);
                    that.Galert(that.GLOBAL.errorApi);
              })

          },
          itemRemove(file,index){
            this.imgUrls.splice(index, 1);
            this.files.splice(index, 1);
            this.imgIdAtrr.splice(index, 1);
            this.dataJson.attachmentPicsList.splice(index, 1);
            this.curimgNum = this.imgUrls.length;
          }

        }
    }
</script>

<style>
  .formbox .weui-label{width:60px !important;}
  .formbox .weui-grid:before{border:none !important; width:0 !important;}
  .formbox .pic{width:33.333333%;float:left;}
  .formbox .pic img{display:inline-block; margin-bottom:5px;}
  .imgList{width:100%; float:left; margin:15px 0;}
  .Item-upload{width:50px; height:50px; display:inline-block; background:url("../assets/img/icon-photo.png") center center no-repeat;}
  .picbox{width:50px; height:50px; margin:5px 15px 15px 5px;position:relative; float:left;}
  .Item-imgbox{}
  .Item-img{width:50px; height:50px; display:inline-block;}
  .vue-file-upload{width:50px; height:50px; float:left; }
  .vue-file-upload input{position: absolute; font-size: 100px; left:0; right: 0; top: 0; bottom:0; opacity: 0; filter: alpha(opacity=0); cursor: pointer}
  .vue-file-upload:active .Item-upload{opacity: 0.8;}
  .icon-remove{ color:#fff; display:inline-block;}
  .fileBtn{width:50px; height:50px; margin:5px;display: inline-block; position:relative; overflow:hidden; vertical-align:middle;}
  .removebox{background:gray; width:24px; height:24px; line-height:2; text-align:center; border:1px solid #999; border-radius:50%; position:absolute; right:-10px; top:-10px; z-index:5;}
</style>
