<template>
    <div id="location" class="tm-index-order-address-location">
    	<div class="locationbox">
			<div class="searchbar">
			    <form v-on:submit.prevent="submit()">
	                <button type="submit" class="submit"> 确 定 </button>
	                <span v-touch:tap="{ event: tagDisplay , params: []}" class="keyword"><input id="keyword" type="search" placeholder="请输入搜索地址" v-model="address" /></span>
	            </form>
	        </div>
	        <div class="datalist">
	        	<span class="item" v-for="item in poiItems" v-touch:tap=" { event: select, params: [ item ] } ">{{item.name}}</span>
	        </div>
        </div>
    </div>
</template>

<script>
    import Address from '@/views/index/order/address/pop_location.js';
    import '@/views/index/order/address/pop_location.scss';
    
    export default Address;
</script>