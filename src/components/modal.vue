<template>
    <div id="componentModal" class="tm-component-modal" v-show="visible">
    	<div class="dialog">
			<var class="icon"></var>
			<span class="title">亲爱的用户</span>
			<span class="content">{{text}}</span>
			<span class="actions">
			    <a class="link" v-touch:tap=" { event: _cancel } ">{{confirmTitle}}</a>
				<a class="link submit" v-touch:tap=" { event: _success } ">{{cancelTitle}}</a>
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
            	visible: false,
            	confirmTitle: '',
            	cancelTitle: '',
            };
        },
        methods: (function(){
            
            return {
            	show: function( text, confirm,  cancel){
            		
            		this.text = text;
            		this.confirmTitle = confirm;
            		this.cancelTitle = cancel;
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
			/*height: 160px;*/
			padding: 12px;
			margin-top: -80px;
			margin-left: -132px;
			border-radius: 5px;
			background: #ffffff;
		}
		.dialog .icon {
			display: block;
			width: 64px;
			height: 64px;
			margin: -45px auto 0px auto;
			border-radius: 50%;
			background: #ffffff;
			background-image: url('https://ts.zlimg.com/v2/activity/rebateweb1212/popup_logo.png');
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 64px 64px;
		}
		.dialog .title {
		    display: block;
		    font-size: 18px;
		    text-align: center;
		    color: #575757;
		}
		.dialog .content {
			display: block;
			color: #575757;
			font-size: 12px;
			text-align: center;
			line-height: 20px;
			padding: 5px 5px 10px 5px;
		}
		.dialog .actions {
			display: block;
			height: 44px;
			line-height: 44px;
			text-align: center;
		}
		.dialog .actions .link {
			display: inline-block;
			width: 94px;
			height: 29px;
			color: #ffc000;
			font-size: 14px;
			text-align: center;
			line-height: 29px;
			margin: 0px 9px;
			border-radius: 5px;
			background-color: #ffffff;
			border: 1px solid #ffc000;
			
			&.submit {
				background-color: #ffc000;
				color: #575757;
			}
		}
    }
</style>