<template>
    <div id="componentModal" class="tm-component-modal" v-show="visible">
    	<div class="dialog">
			<var class="icon"></var>
			<span class="content">{{text}}</span>
			<span class="actions">
				<a class="link submit" v-touch:tap=" { event: _success } ">确 定</a>
				<a class="link" v-touch:tap=" { event: _cancel } ">取 消</a>
			</span>
    	</div>
    </div>
</template>

<script>
	
	import Toast from '@/directives/toast';
    import Store from '@/directives/store';
    import API from '@/services/api';
    
    export default {
        name: 'componentShortcut',
        mounted: function(){
            
        },
        props: [
            'success', 'cancel'
        ],
        data: function(){
            
            return {
            	text: '',
            	visible: false
            };
        },
        methods: (function(){
            
            return {
            	show: function( text ){
            		
            		this.text = text;
            		this.visible = true;
            	},
            	_success: function(){
            		
            		this.visible = false;
            		this.success && this.success();
            	},
            	_cancel: function(){
            		
            		this.visible = false;
            		this.cancel && this.cancel(); 
            	}
            };
        })()
    }
    
</script>

<style lang="scss">
    
    .tm-component-modal {
        display: block;
        position: fixed;
        top: 0px;
        left:0px;
        right: 0px;
        bottom: 0px;
        background: rgba(0,0,0,.5);
    	z-index: 199;
    	
		.dialog {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 240px;
			height: 160px;
			padding: 12px;
			margin-top: -80px;
			margin-left: -120px;
			border-radius: 5px;
			background: #ffffff;
		}
		.dialog .icon {
			display: block;
			width: 64px;
			height: 64px;
			margin: -36px auto 0px auto;
			border-radius: 50%;
			background: #ffffff;
			background-image: url('https://ts.zlimg.com/v2/activity/rebateweb1212/popup_logo.png');
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 64px 64px;
		}
		.dialog .content {
			display: block;
			height: 64px;
			color: #575757;
			text-align: center;
			line-height: 20px;
			padding: 5px 5px 10px 5px;
		}
		.dialog .actions {
			display: block;
			height: 44px;
			text-align: center;
		}
		.dialog .actions .link {
			display: inline-block;
			height: 44px;
			color: #575757;
			text-align: center;
			line-height: 44px;
			padding: 0px 25px;
			margin: 0px 9px;
			border-radius: 5px;
			background: #f3f3f3;
			
			&.submit {
				background-image: url('https://ts.zlimg.com/v2/activity/rebateweb1212/button.png');
				background-repeat: repeat-x;
				background-position: -12px center;
				background-size: auto 44px;
			}
		}
    }
</style>