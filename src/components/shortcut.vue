<template>
    <div id="shortcut" class="tm-shortcut">
        <a href="tel://4006351987" class="icon service"></a>
        <a v-touch:tap="{event: goCart, params: []}" class="icon cart">
            <dfn v-show="toyCount > 0" class="badge">{{toyCount}}</dfn>
        </a>
    </div>
</template>

<script>
    import Store from '@/directives/store';
    
    export default {
        name: 'shortcut',
        mounted: function(){
            
            this.toyCount = 0;
        },
        props: [
            'cartsUrl'
        ],
        data: function(){
            
            return {
                toyCount: 0
            };
        },
        methods: (function(){
            
            return {
                goCart: function( e ){
                   
                    this.$router.push(this.cartsUrl || '/index/cart');
                }
            };
        })()
    }
    
</script>

<style lang="scss">
    
    .tm-shortcut {
        display: block;
        position: fixed;
        right: 8px;
        bottom: 44px;
        
        .icon {
            display:block;
            width:48px;
            height:48px;
            background:url() center center no-repeat;
            background-size: 40px 40px;
            
            .badge {
                display: block;
                position: absolute;
                height: 16px;
                color: #ffffff;
                font-size: 12px;
                font-weight: bold;
                line-height: 16px;
                padding: 0px 5px;
                margin-left: 30px;
                border-radius: 12px;
                background: #ff0000;
            }
            &.service {
                background-image:url('https://ts.zlimg.com/v2/h5/jd/home_service.png');
            }
            &.cart {
                background-image:url('https://ts.zlimg.com/v2/h5/jd/home_cart.png');
            }
        }
    }
</style>