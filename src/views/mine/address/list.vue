<template>
    <div id="address" class="tm-mine-address-list">
        <div class="addresslist">
            <div class="addressitem" v-for="(item, index) in addressItems">
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
                	<a class="button edit" v-touch:tap="{event: goEdit , params:[ item ]}">编辑</a>
                </span>
            </div>
        </div>
        <div class="controls">
        	<a class="button submit" v-touch:tap="{event: goEdit , params:[ ]}">添加新地址</a>
        </div>
    </div>
</template>

<script>
    import Address from '@/views/mine/address/list.js';
    import '@/views/mine/address/list.scss';
    
    export default Address;
</script>