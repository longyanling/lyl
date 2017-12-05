<template>
    <div id="lease" class="tm-order-lease" v-touch:tap="{ event: deactive, params: [] }">
        <div class="container">
            <em class="caption">租期</em>
            <div class="time">
                <div class="day" v-for="(item, index) in dayItems" v-touch:tap="{ event: SelectedDate, params: [ item ]}" v-bind:class=" item == dayDefault.default ? 'selected' : 'unselected'">{{item}}天</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lease from '@/views/index/order/lease/pop_list.js';
    import '@/views/index/order/lease/pop_list.scss';

    export default Lease;
</script>