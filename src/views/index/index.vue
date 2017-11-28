<template>
	<div id="toy-index" class="tm-toy-index">
		<tm-slide :slideItems="bannerItems"></tm-slide>
		<div class="city"  v-touch:tap="{ event: goToLocation, params: [] }">
			<img class="location" src="https://ts.zlimg.com/v2/h5/jd/home_icon_address.png"/>
			<var class="address">北京</var>
			<img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_arrow.png"/>
		</div>
		<img class="search" v-touch:tap="{ event: goToSearch, params: [] }" src="https://ts.zlimg.com/v2/h5/jd/home_search.png"/>

		<div class="main">
			<div class="nav" v-scroll:dock=" { event: tabsScroll } ">
                <span class="switch" v-for="(item, index) in navigationItems" v-touch:tap="{ event: navShow, params: [] }">{{item.text}}</span>
                <span class="personal" v-touch:tap="{ event: goToMine, params: [] }">
                    <img class="portrait" src="https://ts.zlimg.com/v2/h5/jd/mine_personalCenter.png"/>
                    <img class="authorized" src="https://ts.zlimg.com/v2/h5/jd/mine_authorized.png"/>
                </span>
                <span :class=" [ 'dock', tabsIsDock == true ? '' : 'hide' ] ">
                	<span class="switch" v-touch:tap="{ event: ageShow, params: [] }">年龄</span>
                    <span class="switch" v-touch:tap="{ event: brandShow, params: [] }">品牌</span>
                    <span class="switch" v-touch:tap="{ event: abilityShow, params: [] }">能力</span>
                    <span class="switch" v-touch:tap="{ event: typeShow, params: [] }">类型</span>
                    <span class="switch" v-touch:tap="{ event: screenShow, params: [] }">筛选</span>
                    <span class="personal" v-touch:tap="{ event: goToMine, params: [] }">
                        <img class="portrait" src="https://ts.zlimg.com/v2/h5/jd/mine_personalCenter.png"/>
                        <img class="authorized" src="https://ts.zlimg.com/v2/h5/jd/mine_authorized.png"/>
                    </span>
                </span>
            </div>
            <div class="box" id="box" v-show="ageIsShow || brandIsShow || abilityIsShow || typeIsShow || screenIsShow">
                <div class="age" v-show="ageIsShow">
                	<div class="ageMain">
                        <span class="vessel">
                            <var class="item" v-for="(item, index) in ageItem" v-touch:tap="{ event: ageSelected, params: [item.ageRangeId] }" :class="ageIsSelected(item.ageRangeId) ? 'selected' : 'unselected'">{{item.ageRangeName}}</var>
                        </span>
                        <div class="button">
                            <div class="left">
                                <span class="reset" v-touch:tap="{ event: screenReset, params : []}">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine" v-touch:tap="{ event: screenConfirm, params : []}">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="ageNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="brand" v-show="brandIsShow">
                    <div class="brandMain">
                        <span class="vessel">
                            <span class="hot" v-for="item in brandHotItem" v-touch:tap="{ event: brandSelected, params: [ item.brandId ]}">
                                <img class="brandImg" :src="item.brandImg"/>
                                <var class="item">{{item.brandName}}</var>
                                <img class="choice" :src="brandIsSelected(item.brandId) ? 'https://ts.zlimg.com/v2/h5/jd/base_selected.png' : 'https://ts.zlimg.com/v2/h5/jd/base_unselected.png'"/>
                            </span>
                            <span class="all">
                                <em>全部品牌</em>
                                <span class="seed" v-for="item in brandAllItem">
                                    <dfn class="letter">{{item.letter}}</dfn>
                                    <span class="child" v-for="brand in item.data" v-touch:tap="{ event: brandSelected, params: [ brand.brandId ]}">
                                        <img class="brandImg" :src="brand.brandImg"/>
                                        <var>{{brand.brandName}}</var>
                                        <img class="brabdSelected" :src="brandIsSelected(brand.brandId) ? 'https://ts.zlimg.com/v2/h5/jd/base_selected.png' : 'https://ts.zlimg.com/v2/h5/jd/base_unselected.png'"/>
                                    </span>
                                </span>
                            </span>
                        </span>
                        <div class="button">
                            <div class="left">
                                <span class="reset" v-touch:tap="{ event: screenReset, params : []}">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine" v-touch:tap="{ event: screenConfirm, params : []}">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="ageNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="ability" v-show="abilityIsShow">
                    <div class="abilityMain">
                        <div class="condition">
                        	<span class="vessel">
                                <var class="item" v-for="item in abilityItemOne" v-touch:tap="{ event : abilitySelected , params : [item.abilityId] }" :class="abilityIsSelected(item.abilityId) ? 'selected' : 'unselected'">{{item.abilityName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in abilityItemTwo" v-touch:tap="{ event : abilitySelected , params : [item.abilityId] }" :class="abilityIsSelected(item.abilityId) ? 'selected' : 'unselected'">{{item.abilityName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in abilityItemThree" v-touch:tap="{ event : abilitySelected , params : [item.abilityId] }" :class="abilityIsSelected(item.abilityId) ? 'selected' : 'unselected'">{{item.abilityName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in abilityItemFour" v-touch:tap="{ event : abilitySelected , params : [item.abilityId] }" :class="abilityIsSelected(item.abilityId) ? 'selected' : 'unselected'">{{item.abilityName}}</var>
                            </span>
                        </div>
                        <div class="button">
                            <div class="left">
                                <span class="reset" v-touch:tap="{ event: screenReset, params : []}">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine" v-touch:tap="{ event: screenConfirm, params : []}">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="abilityNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="ability" v-show="typeIsShow">
                    <div class="abilityMain">
                        <div class="condition">
                            <span class="vessel">
                                <var class="item" v-for="item in toyTypeItemOne" v-touch:tap="{ event : typeSelected , params : [item.toyTypeId] }" :class="typeIsSelected(item.toyTypeId) ? 'selected' : 'unselected'">{{item.toyTypeName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in toyTypeItemTwo" v-touch:tap="{ event : typeSelected , params : [item.toyTypeId] }" :class="typeIsSelected(item.toyTypeId) ? 'selected' : 'unselected'">{{item.toyTypeName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in toyTypeItemThree" v-touch:tap="{ event : typeSelected , params : [item.toyTypeId] }" :class="typeIsSelected(item.toyTypeId) ? 'selected' : 'unselected'">{{item.toyTypeName}}</var>
                            </span>
                        </div>
                        <div class="button">
                            <div class="left">
                                <span class="reset" v-touch:tap="{ event: screenReset, params : []}">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine" v-touch:tap="{ event: screenConfirm, params : []}">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="abilityNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="screen" v-show="screenIsShow">
                    <div class="screenMain">
                        <div class="condition">
                        	<div class="sort">
                                <span class="title"><var></var>综合排序</span>
                                <span class="vessel">
                                    <var class="item" v-for="(item, index) in toySortItem" v-touch:tap="{ event: sortSelected, params: [ item.toySortTypeId ] }" :class="index==sortSelectedData ? 'selected' : 'unselected'">{{item.toySortTypeName}}</var>
                                </span>
                            </div>
                            <div class="size">
                                <span class="title"><var></var>尺寸</span>
                                <span class="vessel" v-for="item in toySizeItem"  v-touch:tap="{  event: sizeSelected, params :[item.toySizeTypeId]}">
                                    <var class="name">{{item.toySizeTypeName}}</var>
                                    <img class="toyImg" :src="item.toySizeTypeImg">
                                    <span class="choice"><img :src="sizeIsSelected(item.toySizeTypeId) ? 'https://ts.zlimg.com/v2/h5/jd/base_selected.png' : 'https://ts.zlimg.com/v2/h5/jd/base_unselected.png'"/></span>
                                </span>
                            </div>
                            <div class="sort">
                                <span class="title"><var></var>其他</span>
                                <span class="vessel">
                                    <var class="item" v-touch:tap="{ event: rentSelected, params : []}" :class="rentState ? 'selected' : 'unselected'">{{toyOtherRentType.rentTypeName}}</var>
                                    <var class="item" v-touch:tap="{ event: stockSelected, params : []}" :class="stockState ? 'selected' : 'unselected'">{{toyOtherStockNum.stockNumName}}</var>
                                </span>
                            </div>
                        </div>
                        <div class="button">
                            <div class="left">
                                <span class="reset" v-touch:tap="{ event: screenReset, params : []}">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine" v-touch:tap="{ event: screenConfirm, params : []}">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="ageNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
            </div>
		</div>
		<div class="morecommend">
			<div class="list">
				<span class="item" v-for="(item, index) in toysListItem" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }">
					<span class="shell">
					    <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <span v-touch:tap=" { event: addCart, params: [ item.toyId ] } " class="cart"></span>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <var v-show="item.canPostal">可邮寄 </var>
                        </span>
					</span>
				</span>
				<ins class="clearfix" />
				<span id="scrolload" class="scrolload" v-show="LoadState">
					上拉加载更多..
				</span>
			</div>
		</div>
		<a class="basePhone" href="tel://4006351987"><img src="https://ts.zlimg.com/v2/h5/jd/home_service.png"/></a>
		<img class="baseCart" v-touch:tap="{event: goToCart, params: []}" src="https://ts.zlimg.com/v2/h5/jd/home_cart.png"/>
        <router-view></router-view>
	</div>
</template>

<script>
	import Index from '@/views/index/index.js'
	import '@/views/index/index.scss'

	export default Index;
</script>