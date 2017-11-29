<template>
    <div id="express" class="tm-mine-order-express">
        <div class="search">
            <span class="keyword" v-touch:tap=" { event: searchActive }">
            	<input type="text" placeholder="请输入要搜索的快递公司" v-model="keyword" />
            </span>
        </div>
        <div class="datalist">
        	<h2 class="caption">热门</h2>
        	<div>
        		<span class="item" v-for="item in hotItems" v-touch:tap=" { event: select, params: [ item.name ] } ">{{item.name}}</span>
        	</div>
        	<div v-for="item in listItems">
        		<h2 class="caption">{{item.letter}}</h2>
        		<span class="item" v-for="subitem in item.data" v-touch:tap=" { event: select, params: [ subitem.name ] } ">{{subitem.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Express from '@/views/mine/order/express.js'
    import '@/views/mine/order/express.scss';

    export default Express;
</script>