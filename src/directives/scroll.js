
(function(){
	
	var timer;
	var scrollEvents = {};
	var scrollOffsetTop = function( yTop){
		
		if (typeof yTop != 'undefined'){
			document.documentElement.scrollTop = yTop;
			document.body.scrollTop = yTop;
		} else {
			return document.documentElement.scrollTop || document.body.scrollTop
		}
	};
	var supportSticky = (function() {
		
	    var div = document.createElement('div');
	    div.style.cssText = 'position:sticky; position:-webkit-sticky';
	    document.body.appendChild(div);
	    var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
	    document.body.removeChild(div);
	    div = null;
	    return isSupport;
	  })();
	
	//	获取随机标识
    var scrollRandomKey = function(){
    	return 'vue-scroll-' + (Math.random() + '').replace(/\D/g, '');
    };

	//	浮动置顶方法
    var stickyHandler = function(event, data){
    		
    	if (!supportSticky){
    		var stickyFixed = this.previousSibling;
    		if ( !stickyFixed || stickyFixed.className != 'sticky' ){
    			stickyFixed = document.createElement('DIV');
    			stickyFixed.className = 'sticky';
    			stickyFixed.style.width = this.offsetWidth + 'px';
    			stickyFixed.style.height = this.offsetHeight + 'px';
    			stickyFixed.style.display = 'none';
    			this.parentElement.insertBefore(stickyFixed, this);
    		}
		
			if (this.style.position != 'fixed'){
				if (this.offsetTop - scrollOffsetTop() < (data.top || 0)){		
					this.style.position = 'fixed';
					stickyFixed.style.display = 'block';
				}
			} else {
    			if (stickyFixed && (stickyFixed.offsetTop - scrollOffsetTop() >= (data.top || 0))){
    				this.style.position = 'static';
    				stickyFixed.style.display = 'none';
    			}
			}
		}
	};
	
	//	上拉加载更多方法
	var pullupHandler = function (event, data){
		
		if (this.offsetTop - scrollOffsetTop() < screen.height){
		
			(data.event || function(){ }).call(this, event);	
		}
    };

	Vue.directive( 'scroll', {
		bind:function(el, binding) { 
			
			//	初始化变量
	        var key = '';
			var type = binding.arg;
	        var data = binding.value || {};
	        var handler;
           	
	        //	初始化对象标识
	        if (el.hasOwnProperty('vue-scroll-id')){
	        	key = el['vue-scroll-id'];
	        } else { 
	        	key = el['vue-scroll-id'] = scrollRandomKey();
	        	scrollEvents[key] = {};
	       	}
	        
	        //	判断系统是否支持 stikcy
	        if ( type == 'sticky'){
	        	handler = stickyHandler;
	        } else if ( type == 'pullup'){
	        	handler = pullupHandler;
	        } else if ( type == 'duck'){
	        	el._scrollTop = scrollOffsetTop();
	        	document.body.style.overflow = 'hidden';
	        }
	        
	        //	绑定浮动置顶事件
	        if ( type == 'sticky'){
	        	if (supportSticky){
		    		el.style.position = 'sticky';
		    		el.style.position = '-webkit-sticky';
		    		el.style.top = (data.top || 0) + 'px';
	        	}
	        }
	        
	        //	初始化事件容器
	        scrollEvents[key][type] = {
	        	el: el,
	        	data: data,
	        	handler: handler
	        };
		},
		unbind:function(el, binding){
			
			//	初始化变量
			var key = el['vue-scroll-id'];
			var type = binding.arg;
			var data = scrollEvents[key];
			
			if ( type == 'duck'){
	        	document.body.style.overflow = 'auto';
	        	scrollOffsetTop(el._scrollTop || 0);
			}
			
			//	释放变量内存
			delete scrollEvents[key];
		}
	});
	
	window.addEventListener('scroll', function(event){
		
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			
			for ( var key in scrollEvents ){
				for (var type in scrollEvents[key]){
					scrollEvents[key][type] && 
					scrollEvents[key][type].handler && 
					scrollEvents[key][type].handler.call(scrollEvents[key][type].el, event, scrollEvents[key][type].data);		
				}
			}
		}, 50);
	})
})();