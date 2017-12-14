<template>
    <div id="location" class="tm-index-location">
        <div class="caption">定位城市</div>
        <div class="citylist">
        	<a class="item">{{cityInfo}}</a>
        	<a class="location" v-touch:tap="{ event: getLocaqtion, params: [] }">{{cityLocation}}</a>
        	<div id="locationAMap"></div>
        </div>
        <div class="caption">热门城市</div>
        <div class="citylist">
        	<a class="item" v-for="item in cityHotItems" v-touch:tap="{event:itemSelect, params: [ item ]}">{{item.cityName}}</a> 
        </div>
        <div class="caption">城市列表</div>
        <div class="citysheet" v-for="item in cityAllItems">
        	<dfn class="caption">{{item.letter}}</dfn>
        	<span class="item" v-for="city in item.data" v-touch:tap="{event:itemSelect, params: [ city ]}">{{city.cityName}}</span>
        </div>
    </div>
</template>

<script>
    import Location from '@/views/index/location/list.js'
    import '@/views/index/location/list.scss'
    
    export default Location;
</script>
