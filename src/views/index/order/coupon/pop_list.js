'use strict';

import Utils from '@/directives/utils';

var _default = (function(){
    
    return {
        name: 'coupons',
        mounted: function(){
            
            var vm = this;
            
            if (this.coupon && this.coupon.length > 1){
                vm.couponItems = vm.coupon[1];
                vm.couponDefault = (vm.coupon[1].length > 0 && vm.coupon[0] ? vm.coupon[0].couponId : '-1');
            }
        },
        props: [
            'coupon'
        ], 
        data: function(){
            
            return {
                couponItems: [ ],
                copuonDefault: null
            };
        },
        methods: {
            deactive: function(e){
                
                if (e.target.id == 'coupons'){
                    this.$router.back( -1 );   
                }
            },
            itemSelect : function(e, item, couponId) {
                
                if(!item.available) return;
                this.$emit('resetCoupon', couponId);
                this.$router.back( -1 );
                _hmt.push(["_trackEvent", "link", "click", "下单-选择优惠券"]);
            }
        },
        filters: {
            money: function(value){
                
                return Math.floor(value / 1000);
            },
            surplus: function (value) {
                
                return Math.floor((Utils.Date.fromTicks(value) - new Date()) / 24 / 3600 / 1000);
            },
            expire: function (value) {
                
                return Utils.Date.toString(Utils.Date.fromTicks(value), 'yyyy-MM-dd');
            }
        }
    }
})();

export default _default;