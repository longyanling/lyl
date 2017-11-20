<template>
    <div id="mine-addressAdd" class="tm-mine-addressAdd">
        <div class="main">
        	<div class="content">
                <div class="name">
                    <dfn class="receiver">收货人：</dfn><input class="input" type="text" placeholder="请输入收货人姓名"/>
                </div>
                <div class="sex">
                    <span class="lady"><img src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/><var>女士</var></span>
                    <span class="man"><img src="https://ts.zlimg.com/v2/h5/jd/base_unselected.png"/><var>男士</var></span>
                </div>
                <div class="con">
                    <dfn class="receiver">手机号码：</dfn><input class="text" type="text" placeholder="请填写手机号码"/>
                </div>
                <div class="con">
                    <dfn class="receiver">收货地址：</dfn><input class="text" type="text" placeholder="点击定位地址或小区"/>
                </div>
                <div class="inputBox">
                	<textarea  class="detail" placeholder="具体门牌号(例：2号楼-101室)"></textarea>
                </div>
            </div>
            <div class="default">
            	<img class="selected" src="https://ts.zlimg.com/v2/h5/jd/base_unselected.png"/>
            	<span>设为默认收货地址</span>
            </div>
        </div>
        <div class="Preservation">保存</div>
    </div>
</template>

<script>
    import  AddressAdd from '@/views/mine/addressAdd.js';
    import '@/views/mine/addressAdd.scss';
    
    export default AddressAdd;
</script>