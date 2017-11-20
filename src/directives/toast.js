
var toast = (function( ) {
	
	var timer;
	var toast = document.getElementById('toast');
	
	if (toast == null){
		toast = document.createElement('DIV');
		toast.id = 'toast';
		toast.style.display = 'none';
		toast.style.position = 'fixed';
		toast.style.top = '50%';
		toast.style.left = '50%';
		toast.style.width = '160px';
		toast.style.height = '48px';
		toast.style.color = '#fff';
		toast.style.fontSize = '14px';
		toast.style.lineHeight = '24px';
		toast.style.textAlign = 'center';
		toast.style.padding = '24px';
		toast.style.marginTop = '-48px';
		toast.style.marginLeft = '-90px';
		toast.style.borderRadius = '12px';
		toast.style.backgroundColor = 'rgba(0,0,0,.5)';
		document.body.appendChild(toast);
	}
	
	return {
		show: function( message, delay, callback ){
			
			toast.style.display = 'block';
			toast.innerText = message;
			
			timer && clearTimeout(timer);
			timer = setTimeout(function(){
				
				toast.style.display = 'none';	
				callback && callback();
			}, delay || 1500);
		}
	};
})();

export default toast;