<script>
  import Qs from 'qs'
  const API= {
      home: '/home',
      router: '/router',
      insecure: '/insecure',
      secure: '/secure',
      workplusLogin: '/workplusLogin',
      cordovaApi:'https://link.cedarhd.com/api'
  };
  const errorTip='系统接口异常';
  const errorApi='请去config/index.js中，修改为自己的接口代理设置';
  const systemTitle = 'vue-组件集';


  export default
  {
    API,//接口目录
    errorTip,//接口错误提醒
    errorApi,//开发 接口代理提醒
    systemTitle, //全局标题
    Qs, //入参方法
  }
</script>

