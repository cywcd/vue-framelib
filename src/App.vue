<template>
  <div id="app">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <!--transiton组件 内部只能有一个dom根节点-->
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="child-view" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapState,mapGetters, mapActions } from 'vuex'
  export default {
    name: 'app',
    components: {
      Loading
    },
    computed: {
      ...mapState({
        direction: state => state.vux.direction,
        isLoading: state => state.vux.isLoading,
        title: state => state.vux.title
      })
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
.eruda-container .eruda-entry-btn{left:300px !important; top:400px !important;}
#eruda.eruda-container{height:550px !important;}
body {
  background-color: #fff !important;
}
* {
  font-size: 14px;
}
.child-view {width:100%; transition: all .8s cubic-bezier(.55,0,.1,1); position:absolute; top:0; bottom:0;}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
body {
  background-color: #fbf9fe;
}
.logocon img{width:80px;}
</style>
