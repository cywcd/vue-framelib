<template>
  <div class="hello" v-title="'欢迎页-'+this.GLOBAL.systemTitle">
  	<div class="logobox">
  		<img src="../assets/img/logo.jpg">
  	</div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '欢迎使用，vue技术栈-组件库!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  text-align: center;
}
.logobox{width:100%; margin-top:20%; text-align:center;}
.logobox img{ width:80px; display:inline-block;}
</style>
