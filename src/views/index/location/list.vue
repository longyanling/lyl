<template>
    <div id="location" class="tm-index-location">
        <em class="title">定位城市</em>
        <div class="main">
            <var>定位失败</var> 
        </div>
        <em class="title margin_top_15">热门城市</em>
        <div class="main">
            <var v-for="item in cityHotItem">{{item.cityName}}</var>
        </div>
        <em class="title margin_top_15 margin_bot_10">城市列表</em>
        <div class="main" v-for="item in cityListItem">
        	<dfn>{{item.letter}}</dfn>
        	<span class="city" v-for="city in item.data">{{city.cityName}}</span>
        </div>
    </div>
</template>

<script>
    import Location from '@/views/index/location/list.js'
    import '@/views/index/location/list.scss'
    
    export default Location;
</script>
