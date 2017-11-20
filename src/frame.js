var _default = (function(){
	
	var carts = [
		
	];
	
	var popups = {
		image: 'https://ts.zlimg.com/jd/act170601_enter.png'
	};
	
	var cartAdd = function( vm, el ){
		
		var carttab = document.querySelector('.baseCart .cart');
		var carticon = document.querySelector('.tm-carticon');
		
		if (carttab && carticon){
				
			carticon.style.display = 'block';
			carticon.style.transition = '';
			carticon.style.top = el.offsetTop + 'px';
			carticon.style.left = el.offsetLeft + 'px';
			carticon.style.width = '52px';
			carticon.style.height = '52px';
			
			//	首先执行添加到购物车特效
			window.setTimeout(function(){
			
				carticon.style.transition = 'top 360ms ease-in, left 360ms ease-out, width 360ms linear, height 360ms linear';
				carticon.style.top = (document.body.scrollTop + window.innerHeight - 24) + 'px';
				carticon.style.left = (carttab.offsetLeft + 24) + 'px';	
				carticon.style.width = '1px';
				carticon.style.height = '1px';
			}, 10);	
			
			//	然后执行购物车 tab 闪动特效
			window.setTimeout(function(){
			
				vm.tabItems[2].badge = ((vm.tabItems[2].badge || 0) + 1);
				vm.tabItems[2].blink = 'blink';				
			}, 370);
			
			//	最后恢复 tab 项目样式
			window.setTimeout(function(){
				
				vm.tabItems[2].blink = '';	
			}, 550);
		}
	};
	
	return {
		name: 'frame', 
		mounted: function(){
			
			var vm = this;
				vm.popupFadeIn = 'fade-in';

		},
		destoryed: function(){
			
		},
		data: function(){
			
			return {
		    	tabIsVisible: true,
			};
		},
		methods: {

			tabSetup: function(index, visible, callback) {

		    	this.tabIsVisible = visible;
		    	this.tabIndex = index;
		    	
		    	callback && callback.call && callback.call(this, this);
		    },
		   
		  	tabCartAdd: function(el){
		  		
		  		cartAdd(this, el);
		  	}
		}
	}
})();

export default _default;