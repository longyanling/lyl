<template>
	<div id="search" class="tm-toy-search">
		
		<div class="searchbar">
		    <form v-on:submit.prevent="submit()">
                <button type="submit" class="submit"> 确 定 </button>
                <span v-touch:tap="{ event: tagDisplay , params: []}" class="keyword"><input id="keyword" type="search" placeholder="请输入要搜索的玩具" v-model="keyword" /></span>
            </form>
        </div>
        
		<div class="tags" v-show="tagVisible">

            <!-- 搜索历史 -->
            <div class="taglist history" v-show="tagHistoryItems.length > 0">
                <h5 class="caption">搜索历史</h5>
                <div class="list">
                    <span v-for="(item, index) in tagHistoryItems" v-touch:tap=" { event: tagChange, params: [ item ]} " class="item">{{item}}</span>
                </div>
            </div>
            
            <!-- 热门搜索 -->
            <div class="taglist hot">
                <h5 class="caption">热门搜索</h5>
                <div class="list">
                    <span v-for="(item, index) in tagHotItems" v-touch:tap=" { event: tagChange, params: [ item ]} " class="item">{{item}}</span>
                </div>
            </div>
		</div>
		
		<div class="toygrid">
            <div class="toyinner">
                <span class="toyitem" v-for="(item, index) in toyItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }" :class="item.stockNum <= 0 ? 'toyitemnull' : ''" :data-id="item.toyId">
                    <span class="inner">
                        <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <a v-touch:tap=" { event: addCart, params: [ item.toyId ] } " class="cart"></a>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <var v-show="item.canPostal">可邮寄 </var>
                        </span>
                        <img v-show="item.stockNum > 0 && item.sw" class="stock" src="https://ts.zlimg.com/v2/h5/jd/toy_storage_warning.png"/>
                    </span>
                </span>
                <span id="toyMore" class="toymore" v-show="toyItems.length > 0 && !toyIsEnd">
                                    上拉加载更多..
                </span>
                <div class="bitmap" v-show="toyItems.length == 0"></div>
            </div>
        </div>
        <router-view :backUrl="backUrl"></router-view>
        <tm-shortcut :cartUrl="cartUrl" ref="carts"></tm-shortcut>
	</div>
</template>

<script>
	
	import Search from '@/views/index/search/search.js'
	import '@/views/index/search/search.scss'
	
	export default Search;
	
</script>
