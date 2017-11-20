<template>
	<div id="index-cart">
	    <div class="tm-cart">
	        <div class="null" v-touch:tap="{ event: goToToy, params: [] }"></div>
	        <div class="main">
	        	<div class="nav">
                    <em class="title">已选商品：</em>
                    <em class="empty">清空</em>
                </div>
                <div class="list">
                    <div class="content" v-for="item in shoppingItem.cart" v-touch:tap="{ event: goToToyDetail, params: ['/toy/detail'] }">
                        <div class="right">
                            <img class="toyImg" :src="item.image"/>
                            <img class="remind" v-show="item.sw" src="https://ts.zlimg.com/jd/toy_storage_warning.png"/>
                            <span class="toyName">{{item.toyName}}</span>
                        </div>
                        <span class="price">{{item.rentMoney / 1000}}元<var class="unit">/天</var></span>
                        <img class="delete" src="https://ts.zlimg.com/v2/h5/jd/optional_suite_close_b3.png"/>
                    </div>
                </div>

                <div class="settlement">
                    <div class="price">
                        <span class="seed"><em class="total">合计：</em><dfn class="amount">{{shoppingItem.rentTotalMoney / 1000}}元</dfn><var class="unit">/天</var></span>
                        <span class="hint">{{shoppingItem.deliverMoneyMsg}}</span>
                    </div>
                    <div class="subButton" v-touch:tap="{ event: goToOrder, params: [ ] }">去结算({{shoppingItem.rentTotalCount}})</div>
                </div>
	        </div>
	    </div>
	</div>
</template>

<script>
    import Cart from '@/views/index/cart.js'
    import '@/views/index/cart.scss'

    export default Cart;
</script>
