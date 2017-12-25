'use strict';

import API from "@/services/api";
import Toast from '@/directives/toast';

var _default = (function(){

    return {
        name: 'result',
        mounted: function(){
            
            var vm = this;
            var params = (vm.$route.params.orderid || "").split("_");
            
            if (vm.$route.query.orderid){
            	vm.orderNumber = vm.$route.query.orderid;
            	vm.orderState = vm.$route.query.state;
            } else {
            	vm.orderNumber = (params && params.length > 0 ? params[0] : "");
            	vm.orderState = (params && params.length > 1 ? params[1] : "");
            }
            
            if (vm.orderState && vm.orderState == 0){
                vm.showImg = true;
                vm.showTitle = '租借成功';
                vm.showContent = '按时寄回玩具，有助于您的信用提升哦~';
            } else {
                vm.showImg = false;
                vm.showTitle = '租借失败';
                vm.showContent = '该订单支付失败请您尽快付款哦~';
            }
            
            
        },
        data: function(){
            
            return {
                showImg: null,
                orderNumber: null,
                orderState: null,
                showTitle : null,
                showContent : null
            };
        },
        methods: {
            goDetails: function (){
                
                this.$router.push('/mine/order/details?order_id=' + this.orderNumber);
            },
            goIndex: function(){
                
                this.$router.push('/index');
            }
        }
    }
})();

export default _default;