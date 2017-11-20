import Vue from "vue";


(function(){
		
	//	声明变量
	var timer, scrollY = 0, spaceworks = { };
	
	//	获取随机标识
    var scrollRandomKey = function(){
    	return 'vue-scroll-' + (Math.random() + '').replace(/\D/g, '');
    };
    
    //	触发吸附事件
    var scrollDockHandler = function( e, handler ){

    	handler = handler || {};
    	var el = handler.element;
    	var method = handler.method;
    	var params = handler.params;
    	var currentY = handler.currentY;
    	var lastY = handler.lastY;
    	var offsetY = el.offsetTop;

    	if (currentY  > offsetY){
			method && method.call( e, e, true );
    	} else {
			method && method.call( e, e, false );
    	}
    };
    
    //	触发隐藏事件
    var scrollHideHandler = function( e, handler ){
    	
    	handler = handler || {};
    	var el = handler.element;
    	var method = handler.method;
    	var params = handler.params;
    	var currentY = handler.currentY;
    	var lastY = handler.lastY;
		
		if ( currentY > lastY && currentY > el.offsetHeight ){
			method && method.call( e, e, true );
		} else {
			method && method.call( e, e, false );
		}
    };
    
    //	出发窗口缩放事件
    var scrollResizeHandler = function( e, handler ){
    	
    };
    
	//	滚动事件
	var scrollHandler = function( e ){
			
		if (scrollY != document.body.scrollTop){
			
			for (var key in spaceworks){
				for (var type in spaceworks[key]){
					spaceworks[key][type].currentY = document.body.scrollTop;
					switch(type){
						case 'dock': scrollDockHandler( e, spaceworks[key][type] ); break;
						case 'hide': scrollHideHandler( e, spaceworks[key][type] ); break;
						case 'resize': scrollResizeHandler( e, spaceworks[key][type] ); break;
						default: break;
					}
					spaceworks[key][type].lastY = document.body.scrollTop; 
				}
			}
			scrollY = document.body.scrollTop;
		}
	};
	
	var fixed = document.createElement('DIV');
	fixed.style.position = 'fixed';
	fixed.style.top = '100px';
	fixed.style.backgroundColor = '#ffcc00';
	document.body.appendChild(fixed);
	
	Vue.directive( 'scroll', {
		bind: function(el, binding){
			
			//	初始化变量
	        var key = '';
			var type = binding.arg;
	        var data = binding.value || {};
            var modifiers = binding.modifiers;
            var capture = !!modifiers.capture;
	        var method = ( typeof data === 'function' ? data : ( data.event || function(){} ) );
	        var params = ( data.params || [] );
           	
	        //	初始化对象标识
	        if (el.hasOwnProperty('vue-scroll-id')){
	        	key = el['vue-scroll-id'];
	        } else { 
	        	key = el['vue-scroll-id'] = scrollRandomKey();
	        	spaceworks[key] = {};
	       	}
	        
	        //	初始化事件容器
	        spaceworks[key][type] = {
	        	element: el,
	        	modifiers: modifiers,
	        	method: method,
	        	params: params,
	        	currentY: 0,
	        	lastY: 0,
                timer : 0
	        };
		},
		unbind: function(el, binding){
			
			//	初始化变量
			var key = el['vue-scroll-id'];
			var data = spaceworks[key];
			
			//	释放变量内存
			delete spaceworks[key];
		}
	} );
	
	document.addEventListener('touchmove', scrollHandler, false);
	window.setInterval(scrollHandler, 10);
	
})();
	