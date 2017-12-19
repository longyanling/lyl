<template>
    <div id="componentModal" class="tm-component-modal">
        <a href="tel://4006351987" class="icon service"></a>
        <a v-touch:tap="{ event: goCart, params: [] }" :class="['icon','cart', cartAnimate]">
            <dfn v-show="cartToyCount > 0" class="badge">{{cartToyCount}}</dfn>
        </a>
    </div>
</template>

<script>
	
	import Toast from '@/directives/toast';
    import Store from '@/directives/store';
    import API from '@/services/api';
    
    export default {
        name: 'componentShortcut',
        mounted: function(){
            
        },
        props: [
            'cartUrl', 'haveToolbar'
        ],
        data: function(){
            
            return {
            };
        },
        methods: (function(){
            
            return {
            	addToy: function(toyId, isDetail){
            		
            	},
            	
                goCart: function( e ){
                   
                }
            };
        })()
    }
    
</script>

<style lang="scss">
    
    .tm-component-modal {
        display: block;
        position: fixed;
        right: 8px;
        bottom: 44px;
    }
</style>