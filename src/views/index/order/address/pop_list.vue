<template>
    <div id="address" class="tm-order-address-list" v-touch:tap="{ event: deactive, params: [] }">
        <div class="addresslist">
            <div class="addressitem" v-for="(item, index) in addressItems" v-touch:tap="{ event: itemSelect, params: [ item]}">
                <span class="consignee">
                    <em>{{item.addressConsignee}}</em>
                    <small>{{item.consigneeSex == 0 ? '先生' : '女士'}}</small>
                    <dfn>{{item.consigneePhone}}</dfn>
                </span>
                <span class="total">
                    {{item.addressTotal}}
                </span>
                <span class="actions">
                    <em class="selected" v-show="index == 0">默认地址</em>
                    <a class="button delete" v-touch:tap="{event: itemDelete , params:[ item.addressId ]}">删除</a>
                    <a class="button edit" v-touch:tap="{event: itemEdit , params:[ item ]}">编辑</a>
                </span>
            </div>
            <div class="bitmap" v-show="addressItems.length == 0"></div>
        </div>
        <div class="controls">
            <a class="button submit" v-touch:tap="{event: itemEdit,params:[ ]}">添加新地址</a>
        </div>
    </div>
</template>

<script>
    import Address from '@/views/index/order/address/pop_list.js';
    import '@/views/index/order/address/pop_list.scss';
    
    export default Address;
</script>