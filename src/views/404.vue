<template>
	<div class="page404"  v-title="'404'">
		  <div class="logocon">
        <img src="../assets/img/logo.jpg">
	  	</div>
	  	<div  class="tipPage">
			<p><span>4</span><span>0</span><span>4</span></p>
			<p>未找到该页面(´･ω･`)</p>
			<p><a href="javascript:;" @click="goBack">后退</a><span>|</span><a href="#/siteNav">进入站内导航</a></p>
		</div>
	</div>
</template>

<script>
export default {
  methods: {
  	goBack (){
	   	this.$router.go(-2);
	}
  }
}
</script>

<style scoped>
.page404{ background-color: #ECECEC;}
.logocon{width:100%; margin-top:15%; text-align:center;}
.logocon img{ display:inline-block;}
.tipPage{width:100%;margin:0 auto;}
.tipPage p{width:100%; float:left;}
.tipPage p span{display:inline-block;}
.tipPage p:first-child {
  text-align: center;
  font-family: cursive;
  font-size: 150px;
  font-weight: bold;
  line-height: 100px;
  margin-top:15%;
  letter-spacing: 5px;
  color: #fff;
}

.tipPage p:first-child span {
  cursor: pointer;
  font-size: 100px;
  text-shadow: 0px 0px 2px #686868,
    0px 1px 1px #ddd,
    0px 2px 1px #d6d6d6,
    0px 3px 1px #ccc,
    0px 4px 1px #c5c5c5,
    0px 5px 1px #c1c1c1,
    0px 6px 1px #bbb,
    0px 7px 1px #777,
    0px 8px 3px rgba(100, 100, 100, 0.4),
    0px 9px 5px rgba(100, 100, 100, 0.1),
    0px 10px 7px rgba(100, 100, 100, 0.15),
    0px 11px 9px rgba(100, 100, 100, 0.2),
    0px 12px 11px rgba(100, 100, 100, 0.25),
    0px 13px 15px rgba(100, 100, 100, 0.3);
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.tipPage p:first-child span:hover {
  text-shadow: 0px 0px 2px #686868,
    0px 1px 1px #fff,
    0px 2px 1px #fff,
    0px 3px 1px #fff,
    0px 4px 1px #fff,
    0px 5px 1px #fff,
    0px 6px 1px #fff,
    0px 7px 1px #777,
    0px 8px 3px #fff,
    0px 9px 5px #fff,
    0px 10px 7px #fff,
    0px 11px 9px #fff,
    0px 12px 11px #fff,
    0px 13px 15px #fff;
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.tipPage p:not(:first-child) {
  text-align: center;
  color: #666;
  font-family: cursive;
  font-size: 20px;
  text-shadow: 0 1px 0 #fff;
  letter-spacing: 1px;
  line-height: 2em;
}
</style>
