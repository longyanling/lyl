'use strict';
import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import mineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'order-confirm',
        mounted: function(){
            var that = this;
            var target = [
                    {"toyId":10120360006,"toyNum":1},
                    {"toyId":10129990024,"toyNum":1},
                    {"toyId":10060360007,"toyNum":1},
                    {"toyId":10069990002,"toyNum":1},
                ];
            mineAPI.buyCheck(
                {
                    orderType : '1',
                    newToys :  JSON.stringify(target),
                },
                function (data) {
                    if (data.code == 0) {
                        that.addressItem = data.data.address;
                        that.toyItem = data.data.toys.newToys.is;
                        var price = 0;
                        that.toyItem.forEach(function(toy) {
                            price += toy.specialMoney;
                        });
                        that.toyALLPrice = price/1000;
                        var passSeqId = data.data.seqId;
                        var targets = [
                                {"toyId":10120360006,"toyNum":1},
                                {"toyId":10129990024,"toyNum":1},
                                {"toyId":10060360007,"toyNum":1},
                                {"toyId":10069990002,"toyNum":1},
                            ];
                        mineAPI.presubmit(
                            {
                                seqId : passSeqId,
                                orderType : 1,
                                newToys : JSON.stringify(targets),
                                addressId : 4606502,
                                dm : -1,
                                couponId : '2017071116510400654',
                            },
                            function (data) {

                                if (data.code == 0) {
                                    that.confirmItem = data.data;
                                    that.coupons = data.data.couponList;
                                    that.leases = data.data.rentPeriodInfo;
                                    var deliveryDays = data.data.deliveryDays;
                                    var deliveryMethods = data.data.deliveryMethods;
                                    that.defaultTime = deliveryDays.default.string;
                                    that.distributions = [deliveryDays, deliveryMethods];
                                    
                                } else {
                                    Toast.show(data.msg);
                                }
                            })
                         
                    } else {
                        Toast.show(data.msg);
                    }
                   
                })


        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItem : [],
                confirmItem : [],
                toyItem : [],
                coupons : [],
                leases : [],
                toyALLPrice : [],
                defaultTime : [],
                distributions : [],
            };
        },
        methods: {
            goToOrderList : function() {
                this.$router.push( '/mine/order' );
            },
            cellHref: function( e, url ){

                this.$router.push( url );
            }
        },
        filters: {
            surplus: function (value) {
                
                return Math.floor((Utils.dateFromTicks(value) - new Date()) / 24 / 3600 / 1000);
            },
            expire: function (value) {
                
                return Utils.dateFormat(Utils.dateFromTicks(value), 'yyyy/MM/dd');
            }
        }
    }
})();

export default _default;