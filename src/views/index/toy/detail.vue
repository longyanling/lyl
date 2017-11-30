<template>
	<div id="toy-detail" class="tm-index-detail">
		<tm-slide :slideItems="slideItems"></tm-slide>
		<div class="infos">
			<span class="title"> {{detailItem.toyName}} </span>
			<span class="price"> <dfn>{{detailItem.rentMoney / 1000}}</dfn> 元/天 </span>
<!--			<span class="price"> <dfn>{{detailItem.price}}</dfn> 元/天 </span>-->
			<span class="saleprice"> 吊牌价：{{detailItem.price / 1000}} 元 </span>
			<span class="tags">
			    <dfn class="size" v-show="detailItem.toySize == 'S'">小</dfn>
			    <dfn class="size" v-show="detailItem.toySize == 'M'">中</dfn>
				<dfn class="size" v-show="detailItem.toySize == 'L'">大</dfn>
				<dfn class="size" v-show="detailItem.toySize == 'XL'">豪华</dfn>
				<dfn class="hot" v-show="detailItem.isHot">热</dfn>
				<dfn class="post" v-show="detailItem.canPostal">可邮寄</dfn>
				<dfn class="age">适合年龄：{{detailItem.ageRange}}</dfn>
			</span>
		</div>
		<div class="tabs" v-scroll:dock=" { event: tabsScroll } ">
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
				<img v-for="(item, index) in toyShowItem.contents" :src="item" />
			</span>
			<em class="caption">{{toyDetailsItem.paraName}}</em>
			<span class="detail">
				<img v-for="(item, index) in toyDetailsItem.contents" :src="item" />
			</span>
		</div>
		<div class="params">
			<span class="parameter">玩具参数</span>
			<span class="Explain">
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
	   
	    <div class="guess">
	    	<img class="header" src="https://ts.zlimg.com/v2/h5/jd/toy_detail_guessYouLike.png"/>
	    	<span class="item" v-for="(item, index) in toysItem">
                <span class="shell" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
                    <span class="thumb"><img :src="item.image" /></span>
                    <span class="title"> {{item.toyName}} </span>
                    <span class="cart" v-touch:tap=" { event: addCart, params: [ item.toyId ] } "></span>
                    <span class="price">
                        <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                        <var v-show="item.canPostal">可邮寄 </var>
                    </span>
                </span>
            </span>
	    </div>
	    <div class="button">
	    	<span class="plusCart" v-touch:tap=" { event: addCart, params: [] } ">加入购物车</span>
	    	<span class="robRent" v-touch:tap=" { event: goToConfirm, params: [] } ">立即抢租</span>
	    </div>
	</div>
</template>

<script>
	
	import Detail from '@/views/index/toy/detail.js'
	import '@/views/index/toy/detail.scss'
	
	export default Detail;
	
</script>
