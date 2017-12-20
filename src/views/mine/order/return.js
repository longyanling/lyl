'use strict';

import API from "@/services/api";
import Toast from '@/directives/toast';

var _default = (function(){
    
    return {
        name: 'return',
        mounted: function(){
            
        	this.orderNumber = this.$route.query.order_id;
        	this.express = this.$route.query.express || '圆通快递';
        },
        data: function(){
            
            return {
                express: '圆通快递',
                oddNumber: null,
                orderNumber : null
            };
        },
        methods: {
            submit: function(){
                
                var vm = this;
                console.log(vm.orderNumber)
                if( vm.oddNumber == null ){ Toast.show('请填写您的快递单号!'); return };
                
                API.Mine.expressSave(
                    {
                        orderId : vm.orderNumber,
                        company : vm.express,
                        code : vm.oddNumber
                    },function(data){
                        if(data.code == 0){
                            vm.$router.push('/mine/order/logistics?order_id=' + vm.orderNumber);
                            Toast.show('寄回快递信息保存成功!');
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            goExpress: function(e){
                this.$router.push( '/mine/order/express?order_id=' + this.orderNumber);
            }
        }
    }
})();

export default _default;