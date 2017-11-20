import Vue from "vue";

(function(){
	
	var touchSupport = (('ontouchstart' in window) || 
					(navigator.MaxTouchPoints > 0) || 
					(navigator.msMaxTouchPoints > 0)) || 
					/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(navigator.userAgent);
	var touchSpace = {};
	
    //	获取支持的事件类型
	var touchEventType = (function(){
		
		return touchSupport ? 
			{
                start: 'touchstart',
                move: 'touchmove',
                end : 'touchend',
                cancel: 'touchcancel'
            } : {
                start : 'mousedown',
                move: 'mousemove',
                end : 'mouseup',
                cancel: 'mousecancel'
			}
	})();
	
	//	绑定事件
	var touchEventAdd = function(el,handler,capture){
        	
        el.addEventListener(touchEventType.start, handler.start, capture);
        el.addEventListener(touchEventType.move, handler.move, capture);
        el.addEventListener(touchEventType.end, handler.end, capture);
        el.addEventListener(touchEventType.cancel, handler.end, capture);
    };
    
    //	解除绑定事件
    var touchEventRemove = function(el,handler){
    	
        el.removeEventListener(touchEventType.start, handler.start);
        el.removeEventListener(touchEventType.move, handler.move);
        el.removeEventListener(touchEventType.end, handler.end);
        el.removeEventListener(touchEventType.cancel, handler.end);
	};
	
	//	判断事件类型
	var touchType = function(start, end){
		
		//	初始化变量
		var type = null;
		var direction = null;
		var ratio = window.devicePixelRatio;
		var during = end.T - start.T;
		var h = (end.X - start.X)/ratio;
		var v = (end.Y - start.Y)/ratio;
		var absh = Math.abs(h);
        var absv = Math.abs(v);
        var move = Math.sqrt(Math.pow(h,2) + Math.pow(v,2));
        
        //	判断事件按类型
        switch (true){ 
        	case (during < 32): break;
        	case (move < 3 && during > 740): type = 'holdtap'; break; 
        	case (move < 3 && during < 300): type = 'tap'; break;
            case (move > 5 && during < 300): type = 'swipe'; break; 
            default: break;
        }
        switch (type == 'swipe'){ 
        	case (absv < 5 && absh > 5 && h > 0 ): direction = 'right'; break; 
        	case (absv < 5 && absh > 5 && h < 0 ): direction = 'left'; break;
        	case (absv > 5 && absh < 5 && v > 0 ): direction = 'down'; break;
        	case (absv > 5 && absh < 5 && v < 0 ): direction = 'up'; break;
            default: break;
        }
        return {
        	type: type,
        	direction: direction,
        	move: move,
        	during: during
        };
	};
	
	//	事件调节器
    var touchModifier = function (dom, e, modifiers) {
    	
        modifiers.stop && e.stopPropagation();
        modifiers.prevent && e.preventDefault();
        if(modifiers.self && dom !== e.target){
            return false;
        }
        return true;
    };
    
    //	触控事件类
    var touchHandler = function(type){
    	
        return  {
            start: function(e){
            	
            	//	初始化变量
                var key = this['vue-touch-id'];
                var data = touchSpace[key][type];
                var modifiers = data.modifiers;
                var method = data.method;
                var start = data.start;
                
                //	初始化触摸位置
                start.X = touchSupport ? e.touches[0].pageX : e.screenX;
                start.Y = touchSupport ? e.touches[0].pageY : e.screenY;
                start.T = touchTimestamp();
                
                //	如果调节器停止事件
                if (!touchModifier(this,e,modifiers)){
                    return false;
                }
                
                //	如果是拖拽，则触发 start
                if (type === 'drag') {
                	e.source = this;
                	e.touchPoint = start;
                	method['start'].apply(e, [e].concat(data.params));
                }
                
                //	如果是长按，则通过定时器实现
                if (type === 'holdtap'){
                    if (data.timer) {
                    	clearTimeout(data.timer);
                    }
                    data.timer = setTimeout(function () {
                    	
                    	method.apply(e, [e].concat(data.params));
                        data.timer = 0;
                    }, 750);
                }
            },
            move: function(e){
            	
            	//	初始化变量
                var key = this['vue-touch-id'];
                var data = touchSpace[key][type];
                var modifiers = data.modifiers;
                var method = data.method;
                var move = {
                    X : touchSupport ? e.changedTouches[0].pageX : e.screenX,
                    Y : touchSupport ? e.changedTouches[0].pageY : e.screenY,
                    T : touchTimestamp()
                };
                
            	if (type === 'drag') {
            		e.source = this;
                	e.touchPoint = move;
            		method['move'].apply(e, [e].concat(data.params));
            		e.preventDefault();
            		return false;
            	} else {
            		fixedTouchScrollBug();
            	}
            },
            end: function(e){
            	
            	//	初始化手指位置
                var key = this['vue-touch-id'];
                var data = touchSpace[key][type];
                var modifiers = data.modifiers;
                var method = data.method;
                var start = data.start;
                var end = {
                    X : touchSupport ? e.changedTouches[0].pageX : e.screenX,
                    Y : touchSupport ? e.changedTouches[0].pageY : e.screenY,
                    T : touchTimestamp()
                };
                var action = touchType(start,end);
                
                //	如果调节器停止事件
                if(!touchModifier(this,e,modifiers)){
                    return false;
                }
                
                //	如果正在滚动中
                if ( touchScrolling === true){
                	return false;
                }
                
                //	如果是拖拽事件
                if (type === 'drag') {
                	e.source = this;
                	e.move = action.move;
                	e.during = action.during;
                	e.touchPoint = end;
                	method['end'].apply(e, [e].concat(data.params));
                }
                
                //	判断事件类型
                if (!type || action.type !== type) {
                	return false;
                }
                
                //	设置滑动方向
                if (type === 'swipe'){
                	e.direction = action.direction;
                }
                
                //	如果是其他事件
                if (type !== 'holdtap' && type !== 'drag'){
            		e.source = this;
                	method.apply(e, [e].concat(data.params));
                }
                
                e.stopImmediatePropagation();
                return false;
            }
        };   	
    };
	
	//	获取随机标识
    var touchRandomKey = function(){
    	return 'vue-touch-' + (Math.random() + '').replace(/\D/g, '');
    };
    
    //	获取时间戳
	var touchTimestamp = function(){
		return new Date().getTime();
    };
	
	Vue.directive( 'touch', {
		bind:function(el, binding) { 
			
			//	初始化变量
	        var key = '';
			var type = binding.arg;
	        var data = binding.value || {};
            var modifiers = binding.modifiers;
            var capture = !!modifiers.capture;
	        var method = ( typeof data === 'function' ? data : ( data.event || function(){} ) );
	        var params = ( data.params || [] );
           	var handler = new touchHandler(type);
           	
	        //	初始化对象标识
	        if (el.hasOwnProperty('vue-touch-id')){
	        	key = el['vue-touch-id'];
	        } else { 
	        	key = el['vue-touch-id'] = touchRandomKey();
	        	touchSpace[key] = {};
	       	}
	        
	        //	如果是拖拽方法
	        if (type === 'drag') {
	        	method = {
	        		start: data.start || function(){},
	        		move: data.move || function(){},
	        		end: data.end || function(){}
	        	}
	        }
	        
	        //	初始化事件容器
	        touchSpace[key][type] = {
	        	modifiers: modifiers,
	        	method: method,
	        	params: params,
	        	handler: handler,
                start : {
                    X : 0,
                    Y : 0,
                    T : 0
                },
                timer : 0
	        };
	        
	        //	绑定事件
	        touchEventAdd(el,handler,capture);
		},
		unbind:function(el){
			
			//	初始化变量
			var key = el['vue-touch-id'];
			var data = touchSpace[key];
			
			//	循环绑定的事件, 接触绑定
			for (var item in data){
				if (data.hasOwnProperty(item) && item){
					touchEventRemove(el,data[item].handler);
				}
			}
			
			//	释放变量内存
			delete touchSpace[key];
		}
	});
	
	//	修复滚动条与 touch 事件的冲突
	var timer, lastScrollTop = 0, touchScrolling = false;
	var fixedTouchScrollBug = function(){
		
		var currentScrollTop = document.body.scrollTop;
		
		if ( lastScrollTop == currentScrollTop ) {
			if (touchScrolling === true){
				timer = window.setTimeout(function(){
					
					touchScrolling = false;
				}, 100);	
			}
		} else {
			touchScrolling = true;
			lastScrollTop = currentScrollTop;
		}
	};
	window.setInterval(fixedTouchScrollBug, 10);
	
})();
