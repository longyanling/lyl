<template>
	<div id="index-cart" class="tm-index-cart" v-touch:tap="{ event: deactive , params: []}">
        <div :class="['container',animateContainerClass]">
        	<div class="caption">
                <em :class="toySelectedAll ? 'text' : 'text unselect'" v-touch:tap="{ event: selectAll, params :[  ]}">全选</em>
                <a class="button" v-touch:tap="{event: clear, params: []}">清空</a>
            </div>
            <div class="datalist">
                <div class="item" v-for="(item, index) in toyItems" v-touch:tap="{ event: goToyDetail, params: [item.toyId] }" :class="item.stockNum <= 0 ? 'item unitem' : 'item'">
                    <img class="remind" v-show="item.sw" src="https://ts.zlimg.com/v2/h5/jd/toy_storage_warning.png"/>
                    <span :class="item.selected ? 'check' : 'check uncheck'" v-touch:tap="{ event: selectItem, params :[ item ]}"></span>
                    <img class="thumb" :src="item.image"/>
                    <var class="delete"  v-touch:tap="{ event: deleteItem, params: [item.toyId] }"></var>
                    <span class="info">
                        <em class="title">{{item.toyName}}</em>
                        <dfn class="price">{{item.rentMoney / 1000}} <small>元/天</small></dfn>    
                    </span>
                </div>
                <div class="item" v-for="(item, index) in stockItems" v-touch:tap="{ event: goToyDetail, params: [item.toyId] }" :class="item.stockNum <= 0 ? 'item unitem' : 'item'">
                    <img class="remind" src="https://ts.zlimg.com/v2/h5/jd/cart_no_save.png"/>
                    <span class="check notoptiona"></span>
                    <img class="thumb" :src="item.image"/>
                    <var class="button delete"  v-touch:tap="{ event: deleteItem, params: [item.toyId] }"></var>
                    <span class="info">
                        <em class="title">{{item.toyName}}</em>
                        <dfn class="price">{{item.rentMoney / 1000}} <small>元/天</small></dfn>    
                    </span>
                </div>
                <div class="empty" v-show="toyItems.length == 0"></div>
                <div class="loading" v-show="cartLoading">
                    <div class="head">
                        <div class="face"></div>
                    </div>
                </div>
                
            </div>
            <div class="controls">
                <span class="price">
                    <em>合计：</em>
                    <dfn>{{toyTotalPrice / 1000}} <small>元/天</small></dfn>
                    <var>{{data.deliverMoneyMsg}}</var>
                </span>
                <a class="button" v-touch:tap="{ event: submit, params: [ ] }">去结算({{ toySelectedIds.length }})</a>
            </div>
        </div>
	</div>
</template>

<script>
    import Cart from '@/views/index/cart/list.js'
    import '@/views/index/cart/list.scss'

    export default Cart;
</script>
