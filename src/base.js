/**
 * Created by caoyingwen on 2018/1/25.
 */
import Vue from 'vue'
//*注：定义全局函数 首字母请使用大写G标识

//信息提示
Vue.prototype.Gtip = function (txt){
  this.$vux.toast.show({
    type: 'text',
    text: txt
  })
};

//加载提示显示
Vue.prototype.GloadingShow = function (txt){
  this.$vux.loading.show({
    text: txt
  })
};

//加载提示隐藏
Vue.prototype.GloadingHide = function (){
  this.$vux.loading.hide()
};

//提示弹层显示
// 注：onShow,onHide这两个参数为回调函数，回调函数注意this指向，外部赋值 const self = this;
Vue.prototype.Galert = function (title,content,onShow,onHide){
  if(content == undefined){
    this.$vux.alert.show({
      title: '提示',
      content: title,
      onShow: onShow,
      onHide: onHide
    })
  }else{
    this.$vux.alert.show({
      title: title,
      content: content,
      onShow: onShow,
      onHide: onHide
    })
  }
};

//提示弹层隐藏
Vue.prototype.Ghide= function (title,content,onShow,onHide){
  this.$vux.alert.hide()
};

//询问弹层
//注：onCancel,onConfirm这两个参数为回调函数，回调函数注意this指向，外部赋值 const self = this;
Vue.prototype.Gconfirm= function (title,content,onCancel,onConfirm){
  this.$vux.confirm.show({
    title: title,
    content: content,
    onCancel: onCancel,
    onConfirm: onConfirm
  })
};
