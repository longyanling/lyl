'use strict';
import Utils from '@/directives/utils';

var _default = (function(){
    
    return {
        name: 'pop_coupon',
        mounted: function(){
            var that = this;
            that.couponItem = that.coupon;
        },
        destoryed: function(){

        },
        props: [
            'coupon'
        ], 
        data: function(){
            
            return {
                couponItem : [ ],
            };
        },
        methods: {
            cellHref: function( e, url ){

                this.$router.push( url );
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