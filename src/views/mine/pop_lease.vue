<template>
    <div id="pop_lease" class="tm-order-pop_lease">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }"></div>
        <div class="content">
            <em class="title">租期</em>
            <div class="time">
                <div class="day" v-for="item in daysItem">{{item}}天</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lease from '@/views/mine/pop_lease.js';
    import '@/views/mine/pop_lease.scss';

    export default Lease;
</script>