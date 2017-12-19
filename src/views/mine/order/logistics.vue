<template>
    <div id="logistics" class="tm-mine-order-logistics">
    	<div class="navigator">
    		<a v-touch:tap="{event:tabChange, params: [0]}" :class=" [ 'item', tabIndex == 0 ? 'selected' : '' ] "><em>商家发货物流</em></a>
    		<a v-touch:tap="{event:tabChange, params: [1]}" :class=" [ 'item', tabIndex == 1 ? 'selected' : '' ] "><em>寄回玩具物流</em></a>
    	</div>
    	<div class="datalist" v-show="tabIndex == 0">
    		<div class="item" v-for="(item, index) in sendItems">
    			<h1 class="caption" v-show="item.company || item.code">
    				<em class="name">{{item.company}}</em>
    				<var class="number">{{item.code}}</var>
    			</h1>
    			<div class="sublist">
	                <div class="subitem" v-for="subitem in item.detail" >
	                	<dfn>
	                		{{subitem.date | date}}<br />
	                		{{subitem.date | time}}
	                	</dfn>
	                	<em>{{subitem.description}}</em>
	                </div>
    			</div>
    		</div>
    		<div class="bitmap" v-show="sendItems.length <= 0"></div>
    	</div>
    	<div class="datalist" v-show="tabIndex == 1">
    		<div class="item" v-for="(item, index) in receiveItems">
    			<h1 class="caption" v-show="item.company || item.code">
    				<em class="name">{{item.company}}</em>
    				<var class="number">{{item.code}}</var>
    			</h1>
    			<div class="sublist">
	                <div class="subitem" v-for="subitem in item.detail" >
	                	<dfn>
	                		{{subitem.date | date}}<br />
	                		{{subitem.date | time}}
	                	</dfn>
	                	<em>{{subitem.description}}</em>
	                </div>
    			</div>
    		</div>
    		<div class="bitmap" v-show="receiveItems.length <= 0"></div>
    	</div>
        <div class="controls">
        	<a :class="orderStatus >= 5 && orderStatus <= 13 ?'button submit' : 'button unbutton'" v-touch:tap="{ event: goReturn, params:[] }">添加寄回快递信息</a>
        </div>
        <div class="loading" v-show="orderLoading"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
    </div>
</template>




<script>
    import Logistics from '@/views/mine/order/logistics.js'
    import '@/views/mine/order/logistics.scss'
    
    export default Logistics;
</script>