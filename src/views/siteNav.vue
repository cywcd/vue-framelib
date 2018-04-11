<template>
	<div v-title="'站内导航'">
		<x-header :left-options="{backText: '返回'}" style="background:#029443; ">站内导航</x-header>
	    <grid>
	      <grid-item :label="item.meta.title" v-for="(item, index) in Routes" :key="item.id" :link="item.path" v-if="item.meta.title">
	        <img slot="icon" src="../assets/img/nav-icon.png">
	      </grid-item>
	    </grid>
	</div>
</template>

<script>
import { XHeader, Grid, GridItem } from 'vux'
import Router from './../router'
export default {
  components: {
  	XHeader,
    Grid,
    GridItem
  },
  methods: {
  	getRoutes: function(){
  		this.Routes = Router.options.routes;
  	}
  },
  activated(){
  	this.getRoutes();
  },
  mounted(){
  	this.getRoutes();
  },
  data () {
    return {
    	Routes:[]
    }
   }
}
</script>

<style>
</style>
