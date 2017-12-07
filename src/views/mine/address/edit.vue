<template>
    <div id="edit" class="tm-mine-address-edit">
        <div class="addressedit">
        	<span class="cell">
        		<em>收货人</em>
        		<dfn><input class="text" type="text" placeholder="请输入收货人姓名" v-model="addressConsignee" /></dfn>
        	</span>
        	<span class="cell">
        		<em></em>
        		<dfn>
                    <var :class="consigneeSex == 0 ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: sexCheck, params: [0] }">男士</var>
        			<var :class="consigneeSex == 1 ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: sexCheck, params: [1] }">女士</var>
        		</dfn>
        	</span>
        	<span class="cell">
        		<em>手机号码</em>
        		<dfn>
        			<input class="text" type="text" placeholder="请填写手机号码" v-model="consigneePhone" />
        		</dfn>
        	</span>
        	<span class="cell" v-touch:tap=" { event: getLocation, params: [] }">
        		<em>收货地址</em>
        		<dfn>
        			<input class="text" type="text" placeholder="点击定位地址或小区" v-model="addressPrefix" />
        		</dfn>
        	</span>
        	<span class="cell textarea">
        		<em></em>
        		<dfn>
        			<textarea class="text" placeholder="具体门牌号(例：2号楼-101室)" v-model="addressSub" ></textarea>
        		</dfn>
        	</span>
        	<span class="cell">
        		<em></em>
        		<dfn>
        			<var :class="isDefault ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: defaultCheck, params: [ ] }">设为默认收货地址</var>
        		</dfn>
        	</span>
        </div>
        <div class="controls">
        	<a class="button submit" v-touch:tap = "{event: submit, params: []}">保 存</a>
        </div>
    </div>
</template>

<script>
    import Edit from '@/views/mine/address/edit.js';
    import '@/views/mine/address/edit.scss';
    
    export default Edit;
</script>