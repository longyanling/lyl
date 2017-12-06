<template>
	<div id="index-cart" class="tm-index-cart" v-touch:tap="{ event: deactive , params: []}">
        <div :class="['container',animateContainerClass]">
        	<div class="caption">
                <em class="text">已选商品：</em>
                <a class="button" v-touch:tap="{event: clear, params: []}">清空</a>
            </div>
            <div class="datalist">
                <div class="item" v-for="item in toyItems" v-touch:tap="{ event: goToyDetail, params: [item.toyId] }">
                    <img class="remind" v-show="item.sw" src="https://ts.zlimg.com/jd/toy_storage_warning.png"/>
                    <img class="thumb" :src="item.image"/>
                    <var class="button delete"  v-touch:tap="{ event: deleteItem, params: [item.toyId] }"></var>
                    <span class="info">
                        <em class="title">{{item.toyName}}</em>
                        <dfn class="price">{{item.rentMoney / 1000}} <small>元/天</small></dfn>    
                    </span>
                </div>
                <div class="empty" v-show="toyItems.length == 0"></div>
            </div>
            <div class="controls">
                <span class="price">
                    <em>合计：</em>
                    <dfn>{{data.rentTotalMoney ? data.rentTotalMoney/1000 : '0'}} <small>元/天</small></dfn>
                    <var>{{data.deliverMoneyMsg}}</var>
                </span>
                <a class="button" v-touch:tap="{ event: submit, params: [ ] }">去结算({{data.rentTotalCount ? data.rentTotalCount : '0'}})</a>
            </div>
        </div>
	</div>
</template>

<script>
    import Cart from '@/views/index/cart/list.js'
    import '@/views/index/cart/list.scss'

    export default Cart;
</script>
