<template>
	<div id="index-cart" class="tm-cart" v-touch:tap="{ event: deactive , params: []}">
        <div class="main">
        	<div class="nav">
                <em class="title">已选商品：</em>
                <em class="empty" v-touch:tap="{event: deleteAllToys, params: []}">清空</em>
            </div>
            <div class="list">
                <div class="item" v-for="item in shoppingItem.cart" v-touch:tap="{ event: goToToyDetail, params: [item.toyId] }">
                    <img class="toyImg" :src="item.image"/>
                    <img class="remind" v-show="item.sw" src="https://ts.zlimg.com/jd/toy_storage_warning.png"/>
                    <var class="delete"  v-touch:tap="{ event: deleteSoloToys, params: [item.toyId] }"></var>
                    <dfn class="price">{{item.rentMoney / 1000}}元<var class="unit">/天</var></dfn>
                    <em class="toyName">{{item.toyName}}</em>
                </div>
                <img v-show="cartToysItem.length == 0" class="bitmap" src="https://ts.zlimg.com/v2/h5/jd/bitmap_no_cart.png"/>
            </div>

            <div class="settlement">
                <div class="price">
                    <span class="seed"><em class="total">合计：</em><dfn class="amount">{{shoppingItem.rentTotalMoney ? shoppingItem.rentTotalMoney/1000 : '0'}}元</dfn><var class="unit">/天</var></span>
                    <span class="hint">{{shoppingItem.deliverMoneyMsg}}</span>
                </div>
                <div class="subButton" v-touch:tap="{ event: goToOrder, params: [ ] }">去结算({{shoppingItem.rentTotalCount ? shoppingItem.rentTotalCount : '0'}})</div>
            </div>
        </div>

	</div>
</template>

<script>
    import Cart from '@/views/index/cart/list.js'
    import '@/views/index/cart/list.scss'

    export default Cart;
</script>
