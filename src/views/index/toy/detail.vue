<template>
	<div id="toy-detail" class="tm-index-detail">
	    <div class="stock">
	        <span class="bookable" v-show="detailItem.stockNum <= 0"><dfn class="text">暂无库存</dfn></span>
	        <span class="rentable" v-show="detailItem.stockNum > 0"><dfn class="text">{{detailItem.stockText}}</dfn></span>
	    </div>

		<tm-slide :slideItems="slideItems"></tm-slide>
		
		<div class="infos">
			<span class="title"> {{detailItem.toyName}} </span>
			<span class="price"> <dfn>{{detailItem.rentMoney / 1000}}</dfn> 元/天 </span>
			<span class="saleprice"> 吊牌价：{{detailItem.price / 1000}} 元 </span>
			<span class="tags">
			    <dfn class="post" v-show="detailItem.canPostal">可邮寄</dfn>
			    <dfn class="recommend" v-show="detailItem.isRecommend">荐</dfn>
                <dfn class="latest" v-show="detailItem.isLatest">新</dfn>
                <dfn class="special" v-show="detailItem.isSpecialMoney">惠</dfn>
				<dfn class="hot" v-show="detailItem.isHot">热</dfn>
				<dfn class="size">{{detailItem.toySize == 'XL' ? '豪华' : (detailItem.toySize == 'L' ? '大' : (detailItem.toySize == 'M' ? '中' : (detailItem.toySize == 'S' ? '小' : '')))}}</dfn>
				<dfn class="age">适合年龄：{{detailItem.ageRange}}</dfn>
			</span>
		</div>
		<div class="tabs">
			<span class="item">详细介绍</span>
			<span class="item">规格参数</span>
			<span class="item">猜你喜欢</span>
			<span class="item">消毒过程</span>
			<span :class=" [ 'dock', tabsIsDock == true ? '' : 'hide' ] ">
				<span class="item">详细介绍</span>
				<span class="item">规格参数</span>
				<span class="item">猜你喜欢</span>
				<span class="item">消毒过程</span>
			</span>
		</div>
		<div class="content">
			<em class="caption">{{toyShowItem.paraName}}</em>
			<span class="main">
				<img v-show="toyShowItem.paraType == 1" v-for="(item, index) in toyShowItem.contents" :src="item" />
			    <span class="vid" v-show="toyShowItem.paraType == 3"><video class="vid" v-for="(item, index) in toyShowItem.contents" controls="controls" :poster="item.dImage" :src="item.video"></video></span> 
			</span>
			<em class="caption">{{toyDetailsItem.paraName}}</em>
			<span class="detail">
				<img v-for="(item, index) in toyDetailsItem.contents" :src="item" />
			</span>
		</div>
		<div class="params">
		    <em class="caption">玩具参数</em>
			<span class="explain">
			    <span class="seed">
			        <em>玩具品牌</em>
			        <dfn>{{detailItem.brand}}</dfn>
			    </span>
			    <span class="seed">
                    <em>品牌所属</em>
                    <dfn>{{detailItem.brandOrigin}}</dfn>
                </span>
                <span class="seed">
                    <em>玩具材质</em>
                    <dfn>{{detailItem.material}}</dfn>
                </span>
                <span class="seed">
                    <em>玩具重量</em>
                    <dfn>{{detailItem.weight}}</dfn>
                </span>
                <span class="seed">
                    <em>包装规格</em>
                    <dfn>{{detailItem.format}}</dfn>
                </span>
                <span class="seed">
                    <em>消毒方式</em>
                    <dfn>{{detailItem.disinfection}}</dfn>
                </span>
			</span>
		</div>
		<div class="content">
            <em class="caption">{{toyAbilityItem.paraName}}</em>
            <span class="box">
                <span class="child" v-for="(item, index) in toyAbilityItem.contents">{{item}}</span>
            </span>
            <em class="caption">{{toyFeatureItem.paraName}}</em>
            <span class="box">
                <span class="child" v-for="item in toyFeatureItem.contents">{{item}}</span>
            </span>
        </div>
        <img class="ensure" src="https://ts.zlimg.com/g/assurance.png"/>
        <video class="video" poster="https://ts.zlimg.com/g/video.png" controls src="https://ts.zlimg.com/v/disinfection.mp4"></video>
        <span class="desc"><span class="dot">◆</span>　点击播放，了解玩具超人消毒流程　<span class="dot">◆</span></span>
	    <div class="toygrid">
	        <div class="toyinner">
                <img class="header" src="https://ts.zlimg.com/v2/h5/jd/toy_detail_guessYouLike.png"/>
                <span class="toyitem" v-for="(item, index) in toyItems" :data-id="item.toyId">
                    <span class="inner"  v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
                        <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <a v-touch:tap=" { event: addCart, params: [ item.toyId ] } " class="cart"></a>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <span class="label">
                                <var v-show="item.canPostal">可邮寄 </var>
                                <var v-show="item.isRecommend">荐</var>
                                <var v-show="item.isLatest">新</var>
                                <var v-show="item.isHot">热</var>
                                <var v-show="item.isSpecialMoney">惠</var>
                                <var>{{item.toySize == 'XL' ? '豪华' : (item.toySize == 'L' ? '大' : (item.toySize == 'M' ? '中' : (item.toySize == 'S' ? '小' : '')))}}</var>
                            </span>
                        </span>
                    </span>
                    <img v-show="item.stockNum > 0 && item.sw" class="nostock" src="https://ts.zlimg.com/v2/h5/jd/toy_storage_warning.png"/>
                </span>
            </div>
	    </div>
	    <div class="footer">
	    	<a class="plusCart" v-show="detailItem.stockNum > 0" v-touch:tap=" { event: addCart, params: [ toyId, true ] } " :data-id="toyId">加入购物车</a>
	    	<a class="robRent" v-show="detailItem.stockNum > 0" v-touch:tap=" { event: goToConfirm, params: [] } ">立即抢租</a>
	    	<span class="bookable" v-show="detailItem.stockNum <= 0">此玩具暂无库存</span>
	    </div>
	    <div class="loading" v-show="loadingState"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
	    <router-view :backUrl="backUrl"></router-view>
	    <tm-modal ref="modal" :success="goToCart"></tm-modal>
	    <tm-shortcut :cartUrl="cartUrl" ref="carts" :haveToolbar="true" @toyExists = "showToyExists"></tm-shortcut>
	</div>
</template>

<script>
	
	import Detail from '@/views/index/toy/detail.js'
	import '@/views/index/toy/detail.scss'
	
	export default Detail;
	
</script>
