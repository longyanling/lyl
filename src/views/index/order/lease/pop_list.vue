<template>
    <div id="lease" class="tm-order-lease">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/index/confirm'] }"></div>
        <div class="content">
            <em class="title">租期</em>
            <div class="time">
                <div class="day" v-for="(item, index) in daysItem" v-touch:tap="{ event: SelectedDate, params: [ item ]}" v-bind:class=" item == daysDefault.default ? 'selected' : 'unselected'">{{item}}天</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lease from '@/views/index/order/lease/pop_list.js';
    import '@/views/index/order/lease/pop_list.scss';

    export default Lease;
</script>