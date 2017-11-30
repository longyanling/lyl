<template>
    <div id="addressAdd" class="tm-order-address-add" v-touch:tap="{event: deactive, params:[]}">
        <div class="addressBox">
            <div class="addressadd">
                <span class="cell">
                    <em>收货人</em>
                    <dfn><input class="text" type="text" placeholder="请输入收货人姓名" v-model="addressConsignee" /></dfn>
                </span>
                <span class="cell">
                    <em></em>
                    <dfn>
                        <var :class="consigneeSex == true ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: sexSelect, params: [ true ] }">女士</var>
                        <var :class="consigneeSex == false ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: sexSelect, params: [ false ] }">男士</var>
                    </dfn>
                </span>
                <span class="cell">
                    <em>手机号码</em>
                    <dfn>
                        <input class="text" type="text" placeholder="请填写手机号码" v-model="consigneePhone" />
                    </dfn>
                </span>
                <span class="cell">
                    <em>收货地址</em>
                    <dfn>
                        <input class="text" type="text" placeholder="点击定位地址或小区" v-model="gdTitle" />
                    </dfn>
                </span>
                <span class="cell textarea">
                    <em></em>
                    <dfn>
                        <textarea class="text" placeholder="具体门牌号(例：2号楼-101室)" v-model="addressDetail" ></textarea>
                    </dfn>
                </span>
                <span class="cell">
                    <em></em>
                    <dfn>
                        <var :class="isDefaultState ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: isDefaultSelect, params: [ ] }">设为默认收货地址</var>
                    </dfn>
                </span>
            </div>
            <div class="controls">
                <a class="button submit" v-touch:tap = "{event: itemSave, params: []}">保 存</a>
            </div>
        </div>
    </div>
</template>

<script>
    import  AddressEdit from '@/views/index/order/address/pop_edit.js';
    import '@/views/index/order/address/pop_edit.scss';
    
    export default AddressEdit;
</script>