<template>
	<div id="slide" class="tm-slide">
		<table class="images" v-touch:drag="{ start: slideDragStart, move: slideDragMove, end: slideDragEnd }" :style="'width:'+(slideItems.length*100)+'%;margin-left:' + slideMarginLeft">
			<tr>
				<td v-for="(item, index) in slideItems"><img :src="item.src" /></td>
			</tr>
		</table>
		<span class="dots">
			<span class="inner">
				<dfn v-for="(item, index) in slideItems" :class="[ slideIndex == index ? 'actived' : '' ]"></dfn>
			</span>
		</span>
	</div>
</template>

<script>
	
	export default {
		name: 'slide',
		mounted: function(){
			
			this.slidePlay();
		},
		props: [
			'slideItems'
		],
		data: function(){
			
			return {
				slideIndex: 0,
				slideMarginLeft: '0px'
			};
		},
		methods: (function(){
			
			var timer, startX, distanceX;
			var autoPlay = function(vm ){
				
				timer && clearTimeout(timer);
				timer = setTimeout (function(){
					
					vm.slideIndex = ( vm.slideIndex >= vm.slideItems.length - 1 ? 0 : vm.slideIndex + 1 );
					vm.slideMarginLeft = '-' + ( vm.slideIndex * 100 ) + '%';
					autoPlay( vm );
				}, 2500);
			};
			
			return {
				slidePlay: function(){
					
					autoPlay( this );
				},
				slideDragStart: function( e ){
					
					e.source.style.transition = 'none';
					startX = e.touchPoint.X;
					if ( /px$/i.test(e.source.style.marginLeft) ){
						distanceX = e.touchPoint.X - parseInt( e.source.style.marginLeft, 10 );	
					} else {
						distanceX = e.touchPoint.X - (( parseInt( e.source.style.marginLeft, 10 ) / 100) * screen.width);
					}
				},
				slideDragMove: function( e ){
					
					this.slideMarginLeft = (e.touchPoint.X - distanceX) + 'px';				
					autoPlay( this );
				},
				slideDragEnd: function( e ){
					
					if ( e.during > 30 && e.move > 5 ){
						if ( e.touchPoint.X > startX ) {
							this.slideIndex > 0 && (this.slideIndex -= 1);
						} else {
							this.slideIndex < this.slideItems.length - 1 && (this.slideIndex += 1);
						}
						this.slideMarginLeft = '-' + (this.slideIndex * 100) + '%';	
					}
					e.source.style.transition = 'margin-left 240ms ease-out';
				}
			};
		})()
	}
	
</script>

<style lang="scss">
	
    .tm-slide {
        display: block;
        overflow: hidden;
        width: 100vw;
        height: 42vw;
        background: #323232;
        
        .images {
        	width: inherit;
        	height: inherit;
            border-collapse: collapse;
            background: #ffcc00;
            margin-left: 0px;
            transition: margin-left 240ms ease-out;
            
            img {
                display: block;
                width: 100%;
            }
            &.move-0 {
                margin-left:0%;
            }
            &.move-1 {
                margin-left:-100%;
            }
            &.move-2 {
                margin-left:-200%;
            }
        }
        .dots {
            display: block;
            position: relative;
            top: -24px;
            width: 100%;
            text-align: center;
            margin-bottom: -16px;
            
            .inner {
            	display: inline-block;
            	height: 12px;
            	line-height: 8px;
	            vertical-align: middle;
            	padding: 2px 4px 2px 4px;
            	border-radius: 8px;
            	background: rgba(0,0,0,.3);
            	
	            dfn {
	                display: inline-block;
	                width: 8px;
	                height: 8px;
	                vertical-align: middle;
	                margin:0px 1px;
	                border-radius: 4px;
	                background: rgba(0,0,0,.6);
	                
	                &.actived {
	                    background: #ffffff;
	                }
	            }   	
            }
        }
    }
</style>