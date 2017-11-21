<template>
    <div id="pop_lease" class="tm-order-pop_lease">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/index/confirm'] }"></div>
        <div class="content">
            <em class="title">租期</em>
            <div class="time">
                <div class="day" v-for="item in daysItem" v-bind:class=" item == daysDefault.default ? 'selected' : 'unselected'">{{item}}天</div>
            </div>
        </div>
    </div>
</template>

<script>
    import POP_Lease from '@/views/index/order/pop_lease.js';
    import '@/views/index/order/pop_lease.scss';

    export default POP_Lease;
</script>