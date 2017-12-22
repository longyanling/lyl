<template>
    <div id="lease" class="tm-order-lease" v-touch:tap="{ event: deactive, params: [] }">
        <div class="container">
            <em class="caption">选择租期</em>
            <div class="time">
                <div class="content">
                    <span class="day" v-for="(item, index) in dayFirstItems" v-touch:tap="{ event: SelectedDate, params: [ item ]}" v-bind:class=" item == dayDefault.default ? 'selected' : 'unselected'">{{item}}天</span>
                </div>
                <span class="null"></span>
                <div class="content">
                    <span class="day" v-for="(item, index) in daySecondItems" v-touch:tap="{ event: SelectedDate, params: [ item ]}" v-bind:class=" item == dayDefault.default ? 'selected' : 'unselected'">{{item}}天</span>
                </div>
                <span class="null"></span>
                <div class="content">
                    <span class="day" v-for="(item, index) in dayThirdItems" v-touch:tap="{ event: SelectedDate, params: [ item ]}" v-bind:class=" item == dayDefault.default ? 'selected' : 'unselected'">{{item}}天</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lease from '@/views/index/order/lease/pop_list.js';
    import '@/views/index/order/lease/pop_list.scss';

    export default Lease;
</script>