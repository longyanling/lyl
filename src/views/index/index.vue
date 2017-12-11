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
        <div class="toylego">
        	<em class="title">乐高专区</em>
            <div class="toylegoitem">
                <div class="hot">
                    <span class="name"> {{toyLegoItems[0].toyName}} </span>
                    <dfn>{{toyLegoItems[0].rentMoney / 1000}}<small>元/天</small></dfn>
                	<img class="hotimg" :src="toyLegoItems[0].image"/>
                </div>
                <div class="hottop">
                    <span class="content">
                        <span class="name"> {{toyLegoItems[1].toyName}} </span>
                        <dfn>{{toyLegoItems[1].rentMoney / 1000}}<small>元/天</small></dfn>
                    </span>
                    <span class="img">
                        <img :src="toyLegoItems[1].image"/>
                    </span>
                </div>
                <div class="hotbottom">
                	<div class="left">
                		<span class="name"> {{toyLegoItems[2].toyName}} </span>
                        <dfn>{{toyLegoItems[2].rentMoney / 1000}}<small>元/天</small></dfn>
                        <img class="img" :src="toyLegoItems[2].image"/>
                	</div>
                	<div class="left">
                		<span class="name"> {{toyLegoItems[3].toyName}} </span>
                        <dfn>{{toyLegoItems[3].rentMoney / 1000}}<small>元/天</small></dfn>
                        <img class="img" :src="toyLegoItems[3].image"/>
                	</div>
                </div>
            </div>
        </div>
        <div class="recommend">
            <em class="title">{{toyRecommendItems.title}}</em>
            <div class="recommenditem" v-for="item in toyRecommendItems.toyList">
                <img :src="item.image"/>
                <span class="name"> {{item.toyName}} </span>
                <dfn>{{item.rentMoney / 1000}}<small>元/天</small></dfn>
            </div>
        </div>
        
        <div class="toyhot">
            <em class="title">{{toyHotItems.title}}</em>
        	<div class="hotitem" v-for="item in toyHotItems.toyList">
        		<img :src="item.image"/>
        		<span class="name"> {{item.toyName}} </span>
                <dfn> {{item.rentMoney / 1000}} <small>元/天</small></dfn>
        	</div>
        </div>
        
		<div class="toygrid">
		    <em class="title">更多推荐</em>
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