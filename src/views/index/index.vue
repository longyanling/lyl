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
            <div class="box" v-show="ageIsShow || brandIsShow || abilityIsShow || typeIsShow || screenIsShow">
                <div class="age" v-show="ageIsShow">
                	<div class="ageMain">
                        <span class="vessel">
                            <var class="item" v-for="item in ageItem">{{item.ageRangeName}}</var>
                        </span>
                        <div class="button">
                            <div class="left">
                                <span class="reset">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="ageNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="brand" v-show="brandIsShow">
                    <div class="brandMain">
                        <span class="vessel">
                            <span class="hot" v-for="item in brandHotItem">
                                <img class="brandImg" :src="item.brandImg"/>
                                <var class="item">{{item.brandName}}</var>
                                <img class="choice" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/>
                            </span>
                            <span class="all">
                                <em>全部品牌</em>
                                <span class="seed" v-for="item in brandAllItem">
                                    <dfn class="letter">{{item.letter}}</dfn>
                                    <span class="child" v-for="brand in item.data">
                                        <img class="brandImg" :src="brand.brandImg"/>
                                        <var>{{brand.brandName}}</var>
                                        <img class="selected" src="https://ts.zlimg.com/v2/h5/jd/base_unselected.png"/>
                                    </span>
                                </span>
                            </span>
                        </span>
                        <div class="button">
                            <div class="left">
                                <span class="reset">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="ageNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="ability" v-show="abilityIsShow">
                    <div class="abilityMain">
                        <div class="condition">
                        	<span class="vessel">
                                <var class="item" v-for="item in abilityItemOne">{{item.abilityName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in abilityItemTwo">{{item.abilityName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in abilityItemThree">{{item.abilityName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in abilityItemFour">{{item.abilityName}}</var>
                            </span>
                        </div>
                        <div class="button">
                            <div class="left">
                                <span class="reset">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="abilityNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
                <div class="ability" v-show="typeIsShow">
                    <div class="abilityMain">
                        <div class="condition">
                            <span class="vessel">
                                <var class="item" v-for="item in toyTypeItemOne">{{item.toyTypeName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in toyTypeItemTwo">{{item.toyTypeName}}</var>
                            </span>
                            <span class="vessel">
                                <var class="item" v-for="item in toyTypeItemThree">{{item.toyTypeName}}</var>
                            </span>
                        </div>
                        <div class="button">
                            <div class="left">
                                <span class="reset">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine">确定</span>
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
                                    <var class="item" v-for="item in toySortItem">{{item.toySortTypeName}}</var>
                                </span>
                            </div>
                            <div class="size">
                                <span class="title"><var></var>尺寸</span>
                                <span class="vessel" v-for="item in toySizeItem">
                                    <var class="name">{{item.toySizeTypeName}}</var>
                                    <img class="toyImg" :src="item.toySizeTypeImg">
                                    <span class="choice"><img src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/></span>
                                </span>
                            </div>
                            <div class="sort">
                                <span class="title"><var></var>其他</span>
                                <span class="vessel">
                                    <var class="item">{{toyOtherRentType.rentTypeName}}</var>
                                    <var class="item">{{toyOtherStockNum.stockNumName}}</var>
                                </span>
                            </div>
                        </div>
                        <div class="button">
                            <div class="left">
                                <span class="reset">重置</span>
                            </div>
                            <div class="right">
                                <span class="determine">确定</span>
                            </div>
                        </div>
                    </div>
                    <div class="ageNull" v-touch:tap=" { event: goToToy, params: [] } "></div>
                </div>
            </div>
		</div>
		<div class="morecommend">
			<div class="list">
				<span class="item" v-for="(item, index) in toysListItem" v-touch:tap="{ event: toyDetail, params: [] }">
					<span class="shell">
					    <span class="thumb"><img :src="item.image" /></span>
                        <span class="title"> {{item.toyName}} </span>
                        <span v-touch:tap=" { event: toyCart, params: [] } " class="cart"></span>
                        <span class="price">
                            <dfn> {{item.rentMoney / 1000}} <small>元/天</small> </dfn>
                            <var v-show="item.canPostal">可邮寄 </var>
                        </span>
					</span>
				</span>
				<ins class="clearfix" />
				<span id="scrolload" class="scrolload">
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