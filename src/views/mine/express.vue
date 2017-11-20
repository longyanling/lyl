<template>
    <div id="order-express" class="tm-order-express">
        <div v-scroll=" { event: onScroll } " :class="['search', true == searchIsVisible ? 'hide': '']">
            <span class="text" v-touch:tap=" { event: searchActive }">请输入要搜索的玩具</span>
        </div>
        <div class="list">
        	<div class="hot">
        		<em class="title">热</em>
        		<div class="seed">
        			<span class="each" v-for="item in companyHotItem">{{item.name}}</span>
        		</div>
        	</div>
        	<div class="hot" v-for="item in companyListItem">
                <em class="title">{{item.letter}}</em>
                <div class="seed">
                    <span class="each"  v-for="seed in item.data">{{seed.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Express from '@/views/mine/express.js'
    import '@/views/mine/express.scss';

    export default Express;
</script>