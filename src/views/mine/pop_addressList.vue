<template>
    <div id="order-addressList" class="tm-order-addressList">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }"></div>
        <div class="list">
            <div class="detali" v-for="(item, index) in addressItem">
                <span class="title"><var class="name">{{item.addressConsignee}}</var><var class="sex">{{item.consigneeSex == 0 ? '先生' : '女士'}}</var><dfn class="sum">{{item.consigneePhone}}</dfn></span>
                <span class="address"><var class="default" v-show="index == 0">[默认]</var>{{item.addressTotal}}</span>
                <img class="editor" v-touch:tap="{event:cellHref,params:['/mine/order/confirm/addressAdd']}" src="https://ts.zlimg.com/v2/h5/jd/order_address_editor.png"/>
            </div>
        </div>
        <div class="add" v-touch:tap="{event:cellHref,params:['/mine/order/confirm/addressAdd']}">添加新地址</div>
    </div>
</template>

<script>
    import AddressList from '@/views/mine/pop_addressList.js';
    import '@/views/mine/pop_addressList.scss';
    
    export default AddressList;
</script>