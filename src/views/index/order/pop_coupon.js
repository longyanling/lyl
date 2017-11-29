'use strict';
import Utils from '@/directives/utils';

var _default = (function(){
    
    return {
        name: 'pop_coupon',
        mounted: function(){
            var that = this;
            that.couponItem = that.coupon[1];
            that.defaultCoupon = (that.coupon[1].length > 0 && that.coupon[0] ? that.coupon[0].couponId : '-1');
        },
        destoryed: function(){

        },
        props: [
            'coupon'
        ], 
        data: function(){
            
            return {
                couponItem : [ ],
                defaultCoupon : null
            };
        },
        methods: {
            selectedCoupon : function(e, item, couponId) {
                if(!item.available) return;
                this.$emit('resetCoupon', couponId);
                this.$router.push( '/index/confirm' );
            },
            goToConfirm: function(){

                this.$router.push( '/index/confirm' );
            }
        },
        filters: {
            surplus: function (value) {

                return Math.floor((Utils.dateFromTicks(value) - new Date()) / 24 / 3600 / 1000);
            },
            expire: function (value) {

                return Utils.dateFormat(Utils.dateFromTicks(value), 'yyyy-MM-dd');
            }
        }
    }
})();

export default _default;