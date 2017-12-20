<template>
	<div id="index" class="tm-index">
		
		<tm-slide :slideItems="bannerItems"></tm-slide>
		
		<div class="topbar">
			<a class="location" v-touch:tap="{ event: goToLocation, params: [] }">
				<var></var>
				<em>{{locationInfo}}</em>
			</a>
			<a class="search" v-touch:tap="{ event: goToSearch, params: [] }"></a>
		</div>
		
		<div class="navigation" v-scroll:sticky="{ top:0 }">
            <a class="personal icon" v-touch:tap="{ event: goToMine, params: [] }"></a>
			<span class="category">
	            <a class="item" v-for="(item, index) in navigationItems" v-touch:tap="{ event: goScreen, params: [] }">
	            	<em>{{item.text}}</em>
	            </a>
			</span>
        </div>
        
        <div class="toylego summary">
            <div class='caption' v-touch:tap="{ event: aaaa, params: [] }">
            	<em>乐高专区</em>
            	<dfn>尽享灵感和想象的乐趣</dfn>
            </div>
            <div class="datalist">
                <div class="best" v-touch:tap="{ event: goToToyDetail, params: [ legoBest.toyId ] }">
                    <em> {{legoBest.toyName}} </em>
                    <dfn> {{legoBest.rentMoney / 1000}} <small>元/天</small></dfn>
                    <img :src="legoBest.image"/>
                    <var></var>
                </div>
                <div class="next" v-touch:tap="{ event: goToToyDetail, params: [ legoNext.toyId ] }" >
                	<img :src="legoNext.image"/>
                	<em> {{legoNext.toyName}} </em>
                	<dfn> {{legoNext.rentMoney / 1000}} <small>元/天</small></dfn>
                </div>
                <div class="third">
                    <div class="subitem" v-for="item in legoThird" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
                        <em> {{item.toyName}} </em>
                        <dfn> {{item.rentMoney / 1000}} <small>元/天</small></dfn>
                        <img :src="item.image"/>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="recommend summary">
            <div class="caption">
            	<em>猜宝宝喜欢</em>
            	<dfn>匹配的玩具是宝宝的成长礼物</dfn>
            </div>
            <div class="datalist">
	            <span class="item" v-for="item in recommendItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
	                <img :src="item.image"/>
	                <em> {{item.toyName}} </em>
	                <dfn> {{item.rentMoney / 1000}} <small>元/天</small></dfn>
	            </span>
            </div>
        </div>
        
        <div class="hot summary">
            <div class="caption">
            	<em>本周热门</em>
            	<dfn>看看小伙伴都在玩啥</dfn>
            </div>
            <div class="datalist">
	            <span class="item" v-for="item in hotItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
					<img :src="item.image"/>
	                <em> {{item.toyName}} </em>
	                <dfn> {{item.rentMoney / 1000}} <small>元/天</small></dfn>
	            </span>
            </div>
        </div>
        
		<div class="toygrid">
            <div class="caption">
            	<em>更多推荐</em>
            	<dfn>宝宝的笑容值得你来精细挑选</dfn>
            </div>
            <div class="toyinner">
                <span class="toyitem" v-for="(item, index) in toyItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }" :data-id="item.toyId">
                    <span class="inner">
                        <img v-show="item.stockNum > 0 && item.sw" class="nostock" src="https://ts.zlimg.com/v2/h5/jd/toy_storage_warning.png"/>
                        <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <a v-touch:tap=" { event: addCart, params: [ item.toyId ] } " class="cart"></a>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <var>{{item.toySize == 'XL' ? '豪华' : (item.toySize == 'L' ? '大' : (item.toySize == 'M' ? '中' : (item.toySize == 'S' ? '小' : '')))}}</var>
                            <var v-show="item.isRecommend">荐</var>
                            <var v-show="item.isLatest">新</var>
                            <var v-show="item.isHot">热</var>
                            <var v-show="item.isSpecialMoney">惠</var>
                            <var v-show="item.canPostal">可邮寄 </var>
                        </span>
                    </span>
                </span>
                <span id="toyMore" class="toymore" v-show="!toyIsEnd" v-scroll:pullup="{ 'event': loadMore }">
                                        上拉加载更多..
                </span>
            </div>
        </div>
        <router-view></router-view>
        <tm-shortcut ref="carts" @toyExists = "showToyExists"></tm-shortcut>
        <tm-modal ref="modal" :success="goToCart"></tm-modal>
        <div class="loading" v-show="loadingShow"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
	</div>
</template>

<script>
	import Index from '@/views/index/index.js'
	import '@/views/index/index.scss'

	export default Index;
</script>