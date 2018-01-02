<template>
    <div id="guide" class="tm-guide" v-show="guideState">
        <img class="head" id="head" src="https://ts.zlimg.com/v2/h5/jd/guide_head.png"/>
        <img class="arrow" id="guidearrow" src="https://ts.zlimg.com/v2/h5/jd/guide_arrow.png"/>
        <img class="try" id="guidetry" v-touch:tap="{ event: guideNone ,params : []}" src="https://ts.zlimg.com/v2/h5/jd/guide_try.png"/>
    </div>
</template>

<script>
    import Store from '@/directives/store';
    import API from '@/services/api';
    
    export default {
        name: 'guide',
        mounted: function(){
            
        },
        props: [
            
        ],
        data: function(){
            
            return {
                guideState: false
            };
        },
        methods: (function(){
            
            return {
                show: function(state){
                    this.guideState = state;
                    var guide = document.getElementById("guide").getBoundingClientRect().width;
                    var headLeft = Store.Index.noviceGuideCoordinatee.x;
                    var headTop = Store.Index.noviceGuideCoordinatee.y;
                    document.getElementById("head").style.marginTop = headTop + 'px';
                    document.getElementById("head").style.marginLeft = headLeft + 'px';
                    document.getElementById("guidearrow").style.position="absolute";
                    document.getElementById("guidearrow").style.right= 51 + 'px';
                    document.getElementById("guidearrow").style.top= (headTop + 40) + 'px';
                },
                guideNone: function(){
                    this.guideState = false;
                }
            };
        })()
    }
</script>

<style lang="scss">
.tm-guide {
    position: fixed;
    top:0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);
    
    .head {
        width: 50px;
        height: 50px;
    }
    .arrow {
        width: 207px;
        height: 87px;
    }
    .try {
        width: 110px;
        height: 53px;
        margin-left: calc((100% - 110px)/2);
        margin-top: 137px;
    }
}
</style>