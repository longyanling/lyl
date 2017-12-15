<template>
    <div id="shortcut" class="tm-shortcut" :style="bottomStyle">
        <a href="tel://4006351987" class="icon service"></a>
        <a v-touch:tap="{ event: goCart, params: [] }" :class="['icon','cart', cartAnimate]">
            <dfn v-show="cartToyCount > 0" class="badge">{{cartToyCount}}</dfn>
        </a>
    </div>
</template>

<script>
	
    import Store from '@/directives/store';
    
    const getToyItem = function(vm, toyId){
    	
    	var items = document.getElementsByClassName('toyitem') || [];
    	for (var i = 0; i < items.length; i++){
    		if (items[i].getAttribute('data-id') == toyId) {
    			return items[i]; 
    		}
    	}
    	return null;
    };
    
    const getToyIcon = function(vm, toyItem){
    	
    	var toyImage, toyIcon;
    	
    	if (toyItem){
			toyImage = toyItem.getElementsByTagName('A')[0];
			toyIcon = document.getElementById('toyAnimate');
			if (toyIcon){
				toyIcon.remove();
			} 
			toyIcon = document.createElement('IMG');
			toyIcon.id = 'toyAnimate';
			toyIcon.src = 'https://ts.zlimg.com/v2/h5/jd/mine_personalcenter.png';
	    	toyIcon.style.display = 'block';
	    	toyIcon.style.position = 'absolute';
	    	toyIcon.style.top = (toyImage.offsetTop + 10) + 'px';
	    	toyIcon.style.left = (toyImage.offsetLeft + 10) + 'px';
	    	toyIcon.style.width = '32px';
	    	toyIcon.style.height = '32px';
	    	toyIcon.style.opacity = 1;
	    	toyIcon.style.transition = "top 0.5s ease-in,left 0.5s ease-out,opacity 0.5s linear";
	    	document.body.appendChild(toyIcon);
		}
    	return toyIcon;
    };
    
    const getToyStart = function(vm, toyIcon){
    	
		toyIcon.style.top = ( ( document.body.scrollTop ? document.body.scrollTop : (document.documentElement.scrollTop || 0)) + screen.height - 46) + 'px';
		toyIcon.style.left = ( screen.width - 46) + 'px';
		toyIcon.style.opacity = 0;
		
		setTimeout(function(){
			
			toyIcon.style.display = 'none';
			vm.cartToyCount += 1;
			vm.cartAnimate = 'shake';	
		}, 500);
		
		setTimeout(function(){
			
			vm.cartAnimate = '';	
		}, 800);
    };
    
    export default {
        name: 'shortcut',
        mounted: function(){
            
            this.bottomStyle = this.haveToolbar ? 'bottom: 44px' : 'bottom: 12px';
        },
        props: [
            'cartsUrl', 'haveToolbar'
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
            	
            	addToy: function(toyId){
            		
            		var vm = this;
            		var toyItem = getToyItem(vm, toyId);
            		var toyIcon = getToyIcon(vm, toyItem);
            		
            		setTimeout(function(){
            			
            			getToyStart(vm, toyIcon);
            		}, 100);
            	},
            	
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