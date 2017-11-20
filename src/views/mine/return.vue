<template>
    <div id="order-return" class="tm-order-return">
        <div class="prompt">如已完成快递发货，请填写物流信息</div>
        <div class="main">
            <span class="content">归还地址: 北京市   大兴区   黄村天河北路10号</span>
            <span class="content">百利威一分公司院内48号库西门</span>
            <span class="content">收件人: 徐硕  139-1079-9325</span>
        </div>
        <div class="express" v-touch:tap="{event:goToExpress, params:['/mine/order/express']}">
            <span class="company">快递公司</span>
            <span class="name">圆通快递</span>
            <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/icon_cell_arrow.png"/>
        </div>
        <div class="numbers">
            <span class="num">快递单号</span>
            <input class="text" placeholder="未填写"/>
        </div>
        <div class="submit">确认提交</div>
    </div>
</template>

<script>
    import OrderReturn from '@/views/mine/return.js';
    import '@/views/mine/return.scss';
    
    export default OrderReturn;
</script>