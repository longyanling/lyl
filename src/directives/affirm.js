var affirm = (function( ) {
    
    var timer;
    var affirm = document.getElementById('affirm');
    var affirmBack = document.getElementById('affirmBack');
    var affirmImg = document.getElementById('affirmImg');
    var affirmSpan = document.getElementById('affirmSpan');
    if (affirm == null){
        affirmBack = document.createElement('DIV');
        affirmBack.id = 'affirmBack';
        affirmBack.style.display = 'none';
        affirmBack.style.position = 'fixed';
        affirmBack.style.zIndex = 9997;
        affirmBack.style.top = '0px';
        affirmBack.style.left = '0px';
        affirmBack.style.right = '0px';
        affirmBack.style.bottom = '0px';
        affirmBack.style.color = '#fff';
        affirmBack.style.textAlign = 'center';
        affirmBack.style.backgroundColor = 'rgba(0,0,0,.4)';
        
        affirm = document.createElement('DIV');
        affirm.id = 'affirm';
        affirm.style.display = 'none';
        affirm.style.position = 'absolute';
        affirm.style.zIndex = 9998;
        affirm.style.top = '50%';
        affirm.style.left = '50%';
        affirm.style.width = '260px';
//      affirm.style.height = '160px';
        affirm.style.color = '#fff';
        affirm.style.fontSize = '14px';
        affirm.style.lineHeight = '24px';
        affirm.style.textAlign = 'center';
        affirm.style.marginTop = '-100px';
        affirm.style.marginLeft = '-130px';
        affirm.style.borderRadius = '5px';
        affirm.style.backgroundColor = '#fff';
        
        affirmImg = document.createElement('IMG');
        affirmImg.id = 'affirmImg';
        affirmImg.style.display = 'none';
        affirmImg.style.position = 'absolute';
        affirmImg.style.zIndex = 9999;
        affirmImg.style.top = '50%';
        affirmImg.style.left = '50%';
        affirmImg.style.width = '64px';
        affirmImg.style.marginTop = '-132px';
        affirmImg.style.marginLeft = '-32px';
        affirmImg.src = 'https://ts.zlimg.com/v2/h5/jd/popup_logo.png';
        
        affirmSpan = document.createElement('span');
        affirmSpan.id = 'affirmSpan';
        affirmSpan.style.display = 'none';
//      affirmSpan.style.position = 'absolute';
//      affirmSpan.style.zIndex = 9999;
//      affirmSpan.style.top = '50%';
//      affirmSpan.style.left = '50%';
        affirmSpan.style.width = '100%';
        affirmSpan.style.lineHeight = '32px';
        affirmSpan.style.marginTop = '40px';
        affirmSpan.style.backgroundColor = 'pink';
//      affirmSpan.style.marginTop = '-132px';
//      affirmSpan.style.marginLeft = '-32px';
        affirmSpan.innerText = '您购物车中已经有该玩具了，快去下单吧！';
        
        document.body.appendChild(affirmBack);
        affirmBack.appendChild(affirm);
        affirmBack.appendChild(affirmImg); 
        affirm.appendChild(affirmSpan);
       
    }
    
    return {
        show: function( message, delay, callback ){
            
            affirm.style.display = 'none';
            affirm.innerText = message;
            
            timer && clearTimeout(timer);
            timer = setTimeout(function(){
                
                affirm.style.display = 'none';   
                callback && callback();
            }, delay);
        }
    };
})();

export default affirm;