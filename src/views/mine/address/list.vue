<template>
    <div id="address" class="tm-mine-address-list">
        <div class="datalist">
            <div class="item" v-for="(item, index) in addressItems">
            	<span class="consignee">
            		<em>{{item.addressConsignee}}</em>
            		<small>{{item.consigneeSex == 0 ? '先生' : '女士'}}</small>
            		<dfn>{{item.consigneePhone}}</dfn>
            	</span>
            	<span class="total">
            		{{item.addressTotal}}
            	</span>
                <span class="actions">
                	<em class="selected" v-show="index == 0">
                		<img src="https://ts.zlimg.com/v2/h5/jd/base_selected_orange.png"/>
                		<dfn>默认地址</dfn>                		
                	</em>
                	<a class="button">
                		<dfn>删除</dfn>
                		<img src="https://ts.zlimg.com/v2/h5/jd/address_delete.png"/>
                	</a>
                	<a class="button" v-touch:tap="{event: goEdit , params:[ item ]}">
                		<dfn>编辑</dfn>
                		<img src="https://ts.zlimg.com/v2/h5/jd/address_edit.png"/>
                	</a>
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