<template>
    <div id="index-screen" class="tm-index-screen" v-touch:tap="{event: deactive, params:[]}">
        <div class="nav">
            <span class="dock">
                <span :class="ageIsShow ? 'switch select' : 'switch'" v-touch:tap="{ event: ageShow, params: [] }">年龄<var v-show="ageSelectedData.length > 0">({{ageSelectedData.length}})</var></span>
                <span :class="brandIsShow ? 'switch select' : 'switch'" v-touch:tap="{ event: brandShow, params: [] }">品牌<var v-show="brandSelectedData.length > 0">({{brandSelectedData.length}})</var></span>
                <span :class="abilityIsShow ? 'switch select' : 'switch'" v-touch:tap="{ event: abilityShow, params: [] }">能力<var v-show="abilitySelectedData.length > 0">({{abilitySelectedData.length}})</var></span>
                <span :class="typeIsShow ? 'switch select' : 'switch'" v-touch:tap="{ event: typeShow, params: [] }">类型<var v-show="typeSelectedData.length > 0">({{typeSelectedData.length}})</var></span>
                <span :class="screenIsShow ? 'switch select' : 'switch'" v-touch:tap="{ event: screenShow, params: [] }">筛选<var>({{1 + sizeSelectedData.length + (rentSelectedData==4 ? 1 : 0) + (stockSelectedData!=0 ? 1 : 0)}})</var></span>
            </span>
        </div>
        <div class="box" v-show="ageIsShow || brandIsShow || abilityIsShow || typeIsShow || screenIsShow" v-touch:tap="{event: deactive, params:[]}">
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
            </div>
        </div>
        <div class="toygrid">
            <div class="toyinner">
                <span class="toyitem" v-for="(item, index) in toysListItem" v-touch:tap="{ event: goToToyDetail, params: [ item.toyId ] }" :class="item.stockNum <= 0 ? 'toyitemnull' : ''" :data-id="item.toyId">
                    <span class="inner">
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
                        <img v-show="item.stockNum > 0 && item.sw" class="nostock" src="https://ts.zlimg.com/v2/h5/jd/toy_storage_warning.png"/>
                    </span>
                </span>
                <span id="toyMore" class="toymore" v-show="toysListItem.length > 0 && !toyIsEnd">
                                    上拉加载更多..
                </span>
            </div>
        </div>
        <div class="loading" v-show="loadingState"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
        <div class="bitmap" v-show="toysListItem.length == 0"></div>
        <router-view :backUrl="backUrl"></router-view>
        <tm-shortcut :cartUrl="cartUrl" ref="carts"></tm-shortcut>
    </div>
</template>

<script>
    import Screen from '@/views/index/screen/screen.js'
    import '@/views/index/screen/screen.scss'

    export default Screen;
</script>
