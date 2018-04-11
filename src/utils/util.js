import $ from 'webpack-zepto'

//请求方法实例 参考 实际项目未用到

//get请求
function apiGet(){
  this.axios.get(this.GLOBAL.API.home+'/portalQuestionnaire.do?getAllQuestionnaires',{
    params:{
      ID: 12345,
      type:'get'
    }
  }).then((response) => {
    console.log(response.data)
  }).catch(function(err){
    console.log(err)
  })
}


//post请求 url-发送params
function apiPost(){
  var vo = { ID: 45678,type:'post'}
  var params = $.param(vo);
  this.axios.post(this.GLOBAL.API.home+'/portalQuestionnaire.do?getAllQuestionnaires&'+params).then((response) => {
    console.log(response.data)
  }).catch(function(err){
    console.log(err)
  })
}


//post请求 - post 发送params
function apiPost(){
  var vo = { ID: 45678,type:'post'}
  var params = $.param(vo);
  this.axios.post(this.GLOBAL.API.home+'/portalQuestionnaire.do?getAllQuestionnaires&',
    this.GLOBAL.QS.stringify({ ID: 45678,type:'post'})
  ).then((response) => {
    console.log(response.data)
  }).catch(function(err){
    console.log(err)
  })
}
