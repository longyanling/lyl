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
                	<a class="button delete" v-touch:tap=" { event: itemDelete, params: [item, index] } ">删除</a>
                	<a class="button edit" v-touch:tap=" { event: itemEdit, params: [item, index] } ">编辑</a>
                </span>
            </div>
            <div class="bitmap" v-show="addressItems.length == 0"></div>
        </div>
        <div class="controls">
        	<a class="button submit" v-touch:tap="{event: itemEdit , params:[ ]}">添加新地址</a>
        </div>
        <div class="loading" v-show="loadingstate"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
    </div>
</template>

<script>
    import Address from '@/views/mine/address/list.js';
    import '@/views/mine/address/list.scss';
    
    export default Address;
</script>