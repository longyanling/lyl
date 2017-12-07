<template>
	<div id="toy-index" class="tm-toy-index">
		<tm-slide :slideItems="bannerItems"></tm-slide>
		<div class="city"  v-touch:tap="{ event: goToLocation, params: [] }">
			<img class="location" src="https://ts.zlimg.com/v2/h5/jd/home_icon_address.png"/>
			<var class="address">北京</var>
			<img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_arrow.png"/>
		</div>
		<img class="search" v-touch:tap="{ event: goToSearch, params: [] }" src="https://ts.zlimg.com/v2/h5/jd/home_search.png"/>

		<div class="nav">
            <span class="switch" v-for="(item, index) in navigationItems" v-touch:tap="{ event: goScreen, params: [] }">{{item.text}}</span>
            <span class="personal" v-touch:tap="{ event: goToMine, params: [] }">
                <img class="portrait" src="https://ts.zlimg.com/v2/h5/jd/mine_personalcenter.png"/>
                <img class="authorized" src="https://ts.zlimg.com/v2/h5/jd/mine_authorized.png"/>
            </span>    
        </div>

		<div class="toygrid">
            <div class="toyinner">
                <span class="toyitem" v-for="(item, index) in toysListItem" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
                    <span class="inner">
                        <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <span v-touch:tap=" { event: addCart, params: [ item.toyId ] } " class="cart"></span>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <var v-show="item.canPostal">可邮寄 </var>
                        </span>
                    </span>
                </span>
                <span id="toyMore" class="toymore" v-show="LoadState">
                                    上拉加载更多..
                </span>
            </div>
        </div>
        <router-view></router-view>
        <tm-shortcut></tm-shortcut>
	</div>
</template>

<script>
	import Index from '@/views/index/index.js'
	import '@/views/index/index.scss'

	export default Index;
</script>