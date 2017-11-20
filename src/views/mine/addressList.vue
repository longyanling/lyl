<template>
    <div id="mine-addressList" class="tm-mine-addressList">
        <div class="list">
            <div class="detali" v-for="(item, index) in addressItem">
                <span class="title"><var class="name">{{item.addressConsignee}}</var><var class="sex">{{item.consigneeSex == 0 ? '先生' : '女士'}}</var><dfn class="sum">{{item.consigneePhone}}</dfn></span>
                <span class="address">{{item.addressTotal}}</span>
                <span class="set">
                    <em class="default" v-show="index == 0"><img class="selected_orange" src="https://ts.zlimg.com/v2/h5/jd/base_selected_orange.png"/><dfn>默认地址</dfn></em>
                     <span class="edit"><img src="https://ts.zlimg.com/v2/h5/jd/address_delete.png"/><dfn>删除</dfn></span>
                    <span class="edit" v-touch:tap="{event: goToAddressAdd , params:[ ]}"><img src="https://ts.zlimg.com/v2/h5/jd/address_edit.png"/><dfn>编辑</dfn></span>
                </span>
            </div>
        </div>
        <div class="add" v-touch:tap="{event: goToAddressAdd , params:[ ]}">添加新地址</div>
    </div>
</template>

<script>
    import AddressList from '@/views/mine/addressList.js';
    import '@/views/mine/addressList.scss';
    
    export default AddressList;
</script>