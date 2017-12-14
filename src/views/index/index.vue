<template>
	<div id="toy-index" class="tm-toy-index">
		<tm-slide :slideItems="bannerItems"></tm-slide>
		<div class="city"  v-touch:tap="{ event: goToLocation, params: [] }">
			<img class="location" src="https://ts.zlimg.com/v2/h5/jd/home_icon_address.png"/>
			<var class="address">{{locationItem}}</var>
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
        <div class="toylego">
            <span class='modulartitle' v-touch:tap="{ event: aaaa, params: [] }">
                <span class="logo"><var class="logoimg"></var><em class="logoname">乐高专区</em></span>
                <dfn class="logocon">尽享灵感和想象的乐趣</dfn>
                <img src="https://ts.zlimg.com/ap/home_button_entry.png" class="logoarrow">
            </span>
        	
            <div class="toylegoitem">
                
                <div class="hot" v-touch:tap="{ event: goToToyDetail, params: [ toyLegoFirst.toyId ] }">
                    <span class="name"> {{toyLegoFirst.toyName}} </span>
                    <dfn> {{toyLegoFirst.rentMoney / 1000}} <small>元/天</small></dfn>
                    <img class="hotimg" :src="toyLegoFirst.image"/>
                    <img class="homehot" src="https://ts.zlimg.com/v2/h5/jd/home_hot.png"/>
                </div>
                <div class="hottop" v-touch:tap="{ event: goToToyDetail, params: [ toyLegoSecond.toyId ] }" >
                    <span class="content">
                        <span class="name"> {{toyLegoSecond.toyName}} </span>
                        <dfn> {{toyLegoSecond.rentMoney / 1000}} <small>元/天</small></dfn>
                    </span>
                    <span class="img">
                        <img :src="toyLegoSecond.image"/>
                    </span>
                </div>
                <div class="hotbottom">
                    <div class="left" v-touch:tap="{ event: goToToyDetail, params: [ toyLegoThird.toyId ] }">
                        <span class="name"> {{toyLegoThird.toyName}} </span>
                        <dfn> {{toyLegoThird.rentMoney / 1000}} <small>元/天</small></dfn>
                        <img class="img" :src="toyLegoThird.image"/>
                    </div>
                    <div class="left" v-touch:tap="{ event: goToToyDetail, params: [ toyLegoFourth.toyId ] }">
                        <span class="name"> {{toyLegoFourth.toyName}} </span>
                        <dfn> {{toyLegoFourth.rentMoney / 1000}} <small>元/天</small></dfn>
                        <img class="img" :src="toyLegoFourth.image"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend">
           <span class='modulartitle'>
                <span class="logo"><var class="logoimg"></var><em class="logoname">猜宝宝喜欢</em></span>
                <dfn class="logocon">匹配的玩具是宝宝的成长礼物</dfn>
            </span>
            <div class="recommenditem" v-for="item in toyRecommendItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">   <!-- -->
                <img :src="item.image"/>
                <span class="name"> {{item.toyName}} </span>
                <dfn> {{item.rentMoney / 1000}} <small>元/天</small></dfn>
            </div>
        </div>
        
        <div class="toyhot">
            <span class='modulartitle'>
                <span class="logo"><var class="logoimg"></var><em class="logoname">本周热门</em></span>
                <dfn class="logocon">看看小伙伴都在玩啥</dfn>
            </span>
        	<div class="hotitem" v-for="item in toyHotItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
        		<img :src="item.image"/>
        		<span class="name"> {{item.toyName}} </span>
                <dfn> {{item.rentMoney / 1000}} <small>元/天</small></dfn>
        	</div>
        </div>
        
		<div class="toygrid">
		    <span class='modulartitle'>
                <span class="logo"><var class="logoimg"></var><em class="logoname">更多推荐</em></span>
                <dfn class="logocon">宝宝的笑容值得你来精细挑选</dfn>
            </span>
            <div class="toyinner">
                <span class="toyitem" v-for="(item, index) in toyListItems" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
                    <span class="inner">
                        <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <span v-touch:tap=" { event: addCart, params: [ item.toyId ] } " class="cart"></span>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <var v-show="item.canPostal">可邮寄 </var>
                        </span>
                        <img v-show="item.stockNum > 0 && item.sw" class="stock" src="https://ts.zlimg.com/v2/h5/jd/toy_storage_warning.png"/>
                    </span>
                </span>
                <span id="toyMore" class="toymore" v-show="LoadState">
                                    上拉加载更多..
                </span>
            </div>
        </div>
        <div class="loading" v-show="loadingShow">
        	<img src="https://ts.zlimg.com/ap/loading.gif"/>
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