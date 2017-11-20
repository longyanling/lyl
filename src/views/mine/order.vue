<template>
    <div id="mine-order" class="tm-mine-order">
        <div class="navigation">
            <span v-for="(item, index) in navItems" v-touch:tap=" { event: navChange, params: [index] }">
                <em> {{item.text}} </em>
            </span>
        </div>
        <div class="content">
            <div class="main">
                <div class="item" v-for="item in orderAllItem[tabIndex]">
                    <div class="title">
                        <span class="id">订单号：{{item.orderId}}</span>
                        <span class="status" >{{item.statusName}}</span>
                    </div>
                    <div class="toys" v-touch:tap="{ event: goToDetail, params: [item.orderId]}">
                        <div class="toy" v-for="toy in item.displayToys">
                            <img class="toyImg" :src="toy.image"/>
                            <div class="area">
                                <em class="name">{{toy.toyName}}</em>
                                <span class="age">适合年龄：{{toy.ageRange}}</span>
                                <img class="size" :src="toy.toySize == 'XL' ? 'https://ts.zlimg.com/ap/op_toy_size_XL.png' : (toy.toySize == 'L' ? 'https://ts.zlimg.com/ap/op_toy_size_L.png' : (toy.toySize == 'M' ? 'https://ts.zlimg.com/ap/op_toy_size_M.png' : (toy.toySize == 'S' ? 'https://ts.zlimg.com/ap/op_toy_size_S.png' : '')))" />
                                <img class="size" v-show="item.isRecommend" src="https://ts.zlimg.com/jd/toy_recommend.png" />
                                <img class="size" v-show="item.isLatest" src="https://ts.zlimg.com/jd/toy_recent.png" />
                                <img class="size" v-show="item.isHot" src="https://ts.zlimg.com/jd/toy_hot.png" />
                                <img class="size" v-show="item.isSpecialMoney" src="https://ts.zlimg.com/jd/toy_favour.png" />
                                <img class="size" v-show="item.canPostal" src="https://ts.zlimg.com/jd/tag_post.png" />
                            </div>
                            <dfn class="price">{{toy.realRentMoney /1000}}元<var class="unit">/天</var></dfn>
                        </div>
                    </div>
                    <div class="more" v-show="item.toys.length > item.displayToys.length" v-touch:tap="{ event: goToDetail, params: [item.orderId]}">.&nbsp;.&nbsp;.</div>
                    <div class="desc">共<span class="hlight">3</span>件玩具&nbsp;&nbsp;租期<span class="order_item_hlight">2</span>天</div>
                    <div class="actions">
                        <div class="countDown" v-show="item.status == 0"><div class="title">倒计时:</div><div class="time">12分13秒</div></div>
                        <div class="right all" v-show="item.status == 0">立即付款</div>
                        <div class="right all" v-show="item.status == 1"  v-touch:tap="{ event: publicRouting, params: ['/toy']}">再次下单</div>
                        <div class="right all" v-show="item.status === 2 || item.status === 3 || item.status === 4 || item.status === 5 || item.status === 6" v-touch:tap="{ event: goToLogistics, params: [item.orderId]}">物流信息</div>
                        <div class="right all" v-show="item.status === 7 || item.status === 11 || item.status===12 || item.status === 13 " v-touch:tap="{ event: publicRouting, params: [ ]}">再租几件</div>
                        <div class="left all" v-show="item.status == 0">取消订单</div>
                        <div class="left all" v-show="item.status === 7 || item.status === 8 || item.status===9">物流信息</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Order from '@/views/mine/order.js';
    import '@/views/mine/order.scss';
    
    export default Order;
</script>