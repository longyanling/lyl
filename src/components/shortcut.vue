<template>
    <div id="componentShortcut" class="tm-component-shortcut" :style="bottomStyle">
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
    
    var getToyItem = function(vm, toyId, isDetail){
    	
    	var items;
    	if ( isDetail ){
    		items = document.getElementsByClassName('plusCart') || [];
    	} else {
    		items = document.getElementsByClassName('toyitem') || [];
    	}
    	for (var i = 0; i < items.length; i++){
    		if (items[i].getAttribute('data-id') == toyId) {
    			return items[i]; 
    		}
    	}
    	return null;
    };
    
    var getToyIcon = function(vm, toyItem, isDetail){
    	
    	var toyImage, toyIcon;
    	
    	if (toyItem){
			toyIcon = document.getElementById('toyAnimate');
			toyIcon && toyIcon.remove();
			toyIcon = document.createElement('IMG');
			toyIcon.id = 'toyAnimate';
			toyIcon.src = 'https://ts.zlimg.com/v2/h5/jd/mine_personalcenter.png';
	    	toyIcon.style.display = 'block';
	    	toyIcon.style.position = 'absolute';
	    	toyIcon.style.width = '32px';
	    	toyIcon.style.height = '32px';
	    	toyIcon.style.opacity = 1;
	    	toyIcon.style.transition = "top 0.5s ease-in,left 0.5s ease-out,opacity 0.5s linear";
    		if (isDetail){
				toyImage = toyItem;
		    	toyIcon.style.top = ( ( document.body.scrollTop ? document.body.scrollTop : (document.documentElement.scrollTop || 0)) + screen.height - 38 ) + 'px';
		    	toyIcon.style.left = ( toyImage.offsetLeft + 10 ) + 'px';
			} else {
				toyImage = toyItem.getElementsByTagName('A')[0];	
		    	toyIcon.style.top = (toyImage.offsetTop + 10) + 'px';
		    	toyIcon.style.left = (toyImage.offsetLeft + 10) + 'px';
			}
	    	document.body.appendChild(toyIcon);
		}
    	return toyIcon;
    };
    
    var getToyStart = function(vm, toyId, isDetail){

    	var toyItem = getToyItem(vm, toyId, isDetail);
    	var toyIcon = getToyIcon(vm, toyItem, isDetail);
    	
		toyIcon.style.top = ( ( document.body.scrollTop ? document.body.scrollTop : (document.documentElement.scrollTop || 0)) + screen.height - 46) + 'px';
		toyIcon.style.left = ( screen.width - 46) + 'px';
		toyIcon.style.opacity = 0;
		
		setTimeout(function(){
			
			toyIcon.style.display = 'none';
			vm.cartToyCount += 1;
			vm.cartAnimate = 'shake';
			
			//	Toast.show('玩具成功加入购物车');
		}, 500);
		
		setTimeout(function(){
			
			vm.cartAnimate = '';	
		}, 800);
    };
    
    var getToyRefresh = function(vm){
    	
        API.Index.cartList({}, function(data){
        	
        	vm.cartToyCount = (data.cart || []).length;
        });	
    };
    
    export default {
        name: 'componentShortcut',
        created: function(){
        	
        	var vm = this;
        	
            Store.Hub.$on('cartRefresh', function(){
            	
            	getToyRefresh(vm);
            });
        },
        mounted: function(){
            
            var vm = this;
            
            this.bottomStyle = this.haveToolbar ? 'bottom: 44px' : 'bottom: 12px';
            this.timer = setTimeout(function(){
            	
            	getToyRefresh(vm);
            }, 100);
        },
        props: [
            'cartUrl', 'haveToolbar'
        ],
        data: function(){
            
            return {
            	cartToyCount: 0,
            	cartAnimate: '',
                bottomStyle: 'bottom: 12px'
            };
        },
        methods: (function(){
            
            return {
            	addToy: function(toyId, isDetail){
            		
            		var vm = this;
	            		
	                API.Index.cartAdd( { tid : toyId }, function (data) {
	                    	
                        if (data.code == 0) {
        					getToyStart(vm, toyId, isDetail);
                        } else {
                            Toast.show(data.msg);
                        }
                    });
            	},
            	
                goCart: function( e ){
                   
                    this.$router.push(this.cartUrl || '/index/cart');
                }
            };
        })()
    }
    
</script>

<style lang="scss">
    
    .tm-component-shortcut {
        display: block;
        position: fixed;
        right: 8px;
        bottom: 44px;
        
        .icon {
            display:block;
            width:48px;
            height:48px;
            background: center center no-repeat;
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
            &.shake {
            	animation: cartshake 0.3s;
			}
        }
        
    }
</style>