<template>
  <div v-title="'我的反馈-'+this.GLOBAL.systemTitle" class="feedBackList">
    <x-header :left-options="{showBack:true, backText: ''}" class="t-blue">我的反馈</x-header>
    <p class="resultTip" v-show="isresultTip">{{resultTip}}</p>
    <pull-to :bottom-load-method="refresh" :bottom-config="bottomConfig" :wrapper-height="wrapperHeight" :is-throttle-scroll="throttleScroll" class="pullBox">
      <div class="infoItem">
        <ul class="Itembox">
            <li v-for="item in resListData" v-if="!noData">
              <p class="Item-title">{{item.title}}</p>
              <p class="Item-con">{{item.content}}</p>
              <div class="Item-imgbox">
                <img class="Item-img" v-for="itemson in JSON.parse(item.attachmentPics)" :src="itemson.httpUrl">
              </div>
              <p class="Item-time">{{item.createTime}}</p>
            </li>
            <p class="w gray tc fs12 pb20" v-if="isNomoredata">{{noMoredataInfo}}</p>
            <p class="w gray tc fs12 pt20" v-if="isTipShow">{{noDataInfo}}</p>
        </ul>
      </div>
    </pull-to>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import PullTo from 'vue-pull-to'
  import CryptoJS  from 'crypto-js';

  import $ from 'webpack-zepto'
    export default {
        name: '',
        components: {
          XHeader,
          PullTo
        },
        data () {
            return {
              signJson:{
                AK:'grandview-web',
                SK:'grandview-web-admin',
                version:'1.0',
                appKey:'grandview-web',
              },
              dataJson:{
                method: 'aquilaflycloud.sys.notify.querynotifypage',
                pageIndex:0,
                pageSize:10,
                userId:'',
                userSessionId:'F9FB9E6CE06D4D2E6AD608435923CB6E',
                mobile:'18680536870',
              },
              throttleScroll:false,
              wrapperHeight:'100%',
              bottomConfig:{
                pullText: '上拉加载',
                triggerText: '释放更新',
                loadingText: '加载中...',
                doneText: '加载完成',
                failText: '加载失败',
                loadedStayTime: 400,
                stayDistance: 50,
                triggerDistance: 70
              },
              noData: false,
              isTipShow: false,
              noDataInfo:'暂无反馈记录~',
              pageSize:10,
              pageNum: 1,
              isNomoredata:false,
              noMoredataInfo:'没有更多数据啦...',
              resListData:[],
              imgList:[],
              resultTip:'',
              isresultTip:false
            }
        },
        mounted(){
          this.wrapperHeight = ($(window).height() - $('.vux-header').height()) + 'px';
          this.refresh();
        },
        activated(){
        },
        methods: {
          refresh(loaded) {
            var that = this;
            this.GloadingShow('数据加载中...');
              const params = {ticket:'test'};
              this.axios.post(this.GLOBAL.API.workplusLogin,this.GLOBAL.Qs.stringify(params),{
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }).then((response) => {
                  if(response.data.code && response.data.code == 'USER_NOT_EXISTS_IN_CEDARCLOUD'){
                      this.GloadingHide();
                      this.Gtip(response.data.message);
                      this.resultTip = response.data.message;
                      this.isresultTip = true;
                      return;
                  }
                  const phone = response.data.data.jwtUser.workplusUser.phone;
                  this.token = response.data.data.jwt;
                  this.dataJson.mobile = phone;

                  this.dataJson.pageIndex++;
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
                      this.GloadingHide();
                      console.log(response.data,'resultData')
                      let resData = response.data;
                      if(response.data.errorCode == '0'){
                          //第一页数据及渲染处理
                          if(this.dataJson.pageIndex == 1){
                              this.isNomoredata = false;
                              this.resListData = resData.objectResult.list;
                          }
                          //有数据隐藏无数据提示
                          if(resData.objectResult.list.length > 0){
                              this.isTipShow = false
                          }
                          //有分页数据处理
                          if(this.dataJson.pageIndex > 1){
                              for(var i=0;i<resData.objectResult.list.length;++i){
                                  this.resListData.push(resData.objectResult.list[i]);
                              }
                          }

                          //判断最后一页 或 数据不超过一页
                          if((this.dataJson.pageSize > resData.objectResult.list.length) || (this.resListData.length<this.dataJson.pageSize)){
                              this.isNomoredata = true
                              this.isTipShow = false
                              this.bottomConfig.triggerDistance = 1000;
                              this.bottomConfig.pullText = '';
                          }

                          //滑动加载最后一页
                          if(this.dataJson.pageSize > resData.objectResult.list.length &&　this.dataJson.pageIndex>1){
                              this.Gtip('已加载全部数据')
                          }

                          //没有查到数据
                          if(this.resListData.length<1){
                              this.isTipShow = true
                              this.isNomoredata = false;
                          }
                          loaded('done')

                      }else{
                          if(response.data.errorMsg){
                              this.Gtip(response.data.errorMsg);
                          }else{
                              this.Gtip(this.GLOBAL.errorTip);
                          }
                      }
                   }).catch(function(err){
                        that.GloadingHide();
                        that.Gtip(that.GLOBAL.errorTip);
                        that.Galert(that.GLOBAL.errorApi);
                        console.log(err)
                  })

           }).catch(function(err){
                  that.GloadingHide();
                  that.Gtip(that.GLOBAL.errorTip);
                  that.Galert(that.GLOBAL.errorApi);
           })

          }

        }
    }

</script>
<style>
  .xs-container{width:100%; height:100%;  position:relative;}
</style>
<style scoped>
  .feedBackList{background:#f8f8f8;}
  .pullBox{padding-bottom:40px;}
  .infoItem{width:100%; height:100%; float:left;  position:relative;}
  .Itembox li{ padding:10px 15px; margin-bottom:10px;  line-height:1.5; border-bottom:1px solid #ddd; float:left; background:#fff; width: 100%; box-sizing: border-box;}
  .Itembox p{line-height:1.5; word-break:break-all; word-wrap: break-word;}
  .Item-title{font-weight:bold;}
  .Item-con{margin:5px 0 10px; color:#666; font-size:12px;}
  .Item-imgbox{width:100%; float:left;}
  .Item-img{width:50px; height:50px; margin:5px; display:inline-block; float:left}
  .Item-time{width:100%; float:left; font-size:12px; color:#999; text-align:right;}
  .resultTip{width:100%; box-sizing:border-box; padding:15px; text-align:center;}
</style>
