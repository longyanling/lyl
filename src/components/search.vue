<template>
	<div id="search" class="tm-search">
		<button class="submit" v-touch:tap="{ event: submit }"> 确 定 </button>
		<span class="keyword"><input type="text" placeholder="请输入要搜索的玩具" v-model="keyword" /></span>
	</div>
</template>

<script>
	
	export default {
		name: 'search',
		mounted: function(){
			
		},
		props: [
			'keyword', 'submit'
		],
		data: function(){
			
			return {
				
			};
		},
		methods: {
			
		}
	}
	
</script>

<style lang="scss">
	
	$fontColorCaption: #5d5d5d;
	$colorActived: #fed030;
	$imageCDNUrl: 'https://ts.zlimg.com/v2/h5/jd/';
	
    .tm-search {
        position: fixed;
        top:0px;
        left:0px;
        right:0px;
        height:36px;
        padding:6px;    
        background:#f3f3f3;
        z-index:50;
                 
        .submit {
            float:right;
            display: block;
            width:64px;
            height:36px;
            white-space: nowrap;
            border:0px;
            border-radius: 5px;
            background-color:$colorActived;
            transition: width 240ms ease-in;
        }
        
        .keyword {
            display: block;
            height: 36px;
            color: #969696;
            line-height: 36px;
            padding: 0px 0px 0px 32px;
            margin: 0px 70px 0px 0px;
            border: 0px solid #ffffff;
            border-radius: 5px;
            background: #ffffff;
            background-image: url($imageCDNUrl + 'icon_search_text.png');
            background-size: 12px 12px;
            background-position: 12px center;
            background-repeat: no-repeat;
            
            input {
                width: 100%;
                padding: 0px;
                margin: 0px;
                border: 0px;
            }
        }
    }
    
</style>