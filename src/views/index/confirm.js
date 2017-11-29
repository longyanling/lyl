'use strict';
import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import indexAPI from "@/services/index-service";

var _default = (function(){

    return {
        name: 'order-confirm',
        mounted: function(){
            
            var that = this;
            
            //  获取数据仓库中的数据
            var target =  new Array();
            Store.data.forEach(function(toy){
                target.push({'toyId': toy.toyId, 'toyNum': 1 });
            });
            if(Store.data.length > 0){
                indexAPI.buyCheck(
                    {
                        orderType : '1',
                        newToys :  JSON.stringify(target),
                    },
                    function (data) {
                        if (data.code == 0) {
                            
                            that.addressData = data.data.address;
                            if(that.addressData == undefined) {
                                that.addressName = '';
                                that.addressDetail = '请您添加收货地址';
                                that.addressSex = '';
                                that.addressPhone = '';
                            }else {
                                that.addressName = that.addressData.addressConsignee;
                                that.addressSex = (that.addressData.consigneeSex == 0 ? '先生' : '女士');
                                that.addressPhone = that.addressData.consigneePhone;
                                that.addressDetail = that.addressData.addressTotal;
                            }
                            that.toyItem = data.data.toys.newToys.is;
                            var price = 0;
                            that.toyItem.forEach(function(toy) {
                                price += toy.specialMoney;
                            });
                            that.toyALLPrice = price/1000;
                            that.passSeqId = data.data.seqId;
                            var targets = new Array();
                            that.toyItem.forEach(function(toy){
                                that.targets.push({'toyId': toy.toyId, 'toyNum': 1, 'toyPrice': toy.specialMoney});
                            });

                            indexAPI.presubmit(
                                
                                {
                                    seqId : that.passSeqId,
                                    orderType : 1,
                                    newToys : JSON.stringify(that.targets),
                                    addressId : that.addressData.addressId,
                                    dm : -1,
                                },
                                function (data) {
                                    if (data.code == 0) {
                                        that.confirmItem = data.data;
                                        that.couponName = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.displayName : '');
                                        that.defaultCoupon = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.couponId : '-1');
                                        that.defaultLease = data.data.rentPeriod; 
                                        var couponList = data.data.couponList;
                                        var coupon = data.data.coupon;
                                        that.coupons = [coupon, couponList];
                                        that.leases = data.data.rentPeriodInfo;
                                        var deliveryDays = data.data.deliveryDays;
                                        var deliveryMethods = data.data.deliveryMethods;
                                        that.defaultTime = deliveryDays.default.string;
                                        that.distributionNum = deliveryMethods.default;
                                        that.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                                        that.distributions = [deliveryDays, deliveryMethods, {'canOnsite': data.data.canOnsite, 'canPostal': data.data.canPostal} ];
                                        that.deliverTime = data.data.deliveryDays.default.timestamp;
                                    } else {
                                        Toast.show(data.msg);
                                    }
                                })
                             
                        } else {
                            Toast.show(data.msg);
                        }   
                    }
                )
            } else {
                this.$router.push( '/index/cart' );
            }

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressData : [],
                addressName : null,
                addressDetail : null,
                addressSex : null,
                addressPhone : null,
                confirmItem : [],
                toyItem : [],
                targets : [],
                coupons : [],
                leases : [],
                toyALLPrice : [],
                defaultTime : null,
                defauitName : null,
                distributions : [],
                couponName : null,
                passSeqId : null,
                defaultLease : null,
                defaultCoupon : null,
                distributionNum : null,
                distributionTime : null,
                deliverTime : null 
            };
        },
        methods: {
            //  修改配送信息
            setDistribution : function(infoDeterData){
                
                var stat = this;
                stat.distributionNum = infoDeterData[0].value;
                stat.distributionTime = infoDeterData[1].timestamp;
                indexAPI.presubmit(
                    
                    {
                        seqId : stat.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(stat.targets),
                        addressId : stat.addressData.addressId,
                        dm : stat.distributionNum,
                        couponId : stat.defaultCoupon,
                        orderTime : stat.distributionTime
                    },
                    function (data) {
                        if (data.code == 0) {
                            stat.confirmItem = data.data;
                            stat.couponName = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.displayName : '');
                            stat.defaultCoupon = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.couponId : '-1');
                            stat.defaultLease = data.data.rentPeriod;
                            var couponList = data.data.couponList;
                            var coupon = data.data.coupon;
                            stat.coupons = [coupon, couponList];
                            stat.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            stat.defaultTime = deliveryDays.default.string;
                            stat.deliverTime = deliveryDays.default.timestamp;
                            stat.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            stat.distributions = [data.data.deliveryDays, data.data.deliveryMethods, {'canOnsite': data.data.canOnsite, 'canPostal': data.data.canPostal}];

                        } else {
                            Toast.show(data.msg);
                        }
                    })
            },
            //  修改配送地址
            setAddressId :function(address){
                
                var self = this;
                self.addressName = address.addressConsignee;
                self.addressDetail = address.addressTotal;
                self.addressSex = (address.consigneeSex == 0 ? '先生' : '女士');
                self.addressPhone = address.consigneePhone;

                indexAPI.presubmit(
                    {
                        seqId : self.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(self.targets),
                        addressId : address.addressId,
                        dm : self.distributionNum,
                        couponId : self.defaultCoupon,
                    },
                    function (data) {
                        if (data.code == 0) {
                            self.confirmItem = data.data;
                            self.couponName = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.displayName : '');
                            self.defaultCoupon = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.couponId : '-1');
                            self.defaultLease = data.data.rentPeriod;
                            var couponList = data.data.couponList;
                            var coupon = data.data.coupon;
                            self.coupons = [coupon, couponList];
                            self.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            self.defaultTime = deliveryDays.default.string;
                            self.deliverTime = deliveryDays.default.timestamp;
                            self.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            self.distributions = [deliveryDays, deliveryMethods, {'canOnsite': data.data.canOnsite, 'canPostal': data.data.canPostal}];
                            
                        } else {
                            Toast.show(data.msg);
                        }
                    })
            },
            //  修改租期
            setDate : function(item){

                var self = this;
                self.defaultLease = item;
                indexAPI.presubmit(
                    {
                        seqId : self.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(self.targets),
                        addressId : self.addressData.addressId,
                        dm : self.distributionNum,
                        couponId : self.defaultCoupon,
                        rentPeriod : self.defaultLease
                    },
                    function (data) {
                        if (data.code == 0) {
                            self.confirmItem = data.data;
                            self.couponName = (data.data.couponList.length>0 && data.data.coupon? data.data.coupon.displayName : '');
                            self.defaultCoupon = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.couponId : '-1');
                            self.defaultLease = data.data.rentPeriod;
                            var couponList = data.data.couponList;
                            var coupon = data.data.coupon;
                            self.coupons = [coupon, couponList];
                            self.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            self.defaultTime = deliveryDays.default.string;
                            self.deliverTime = deliveryDays.default.timestamp;
                            self.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            self.distributions = [deliveryDays, deliveryMethods, {'canOnsite': data.data.canOnsite, 'canPostal': data.data.canPostal}];
                            
                        } else {
                            Toast.show(data.msg);
                        }
                    })
            },
            //  选择优惠券
            setCoupon : function(couponId){
                var self = this;
                self.defaultCoupon = couponId;
                indexAPI.presubmit(
                    {
                        seqId : self.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(self.targets),
                        addressId : self.addressData.addressId,
                        dm : self.distributionNum,
                        couponId : self.defaultCoupon,
                        rentPeriod : self.defaultLease
                    },
                    function (data) {
                        if (data.code == 0) {
                            self.confirmItem = data.data;
                            self.couponName = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.displayName : '');
                            self.defaultCoupon = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.couponId : '-1');
                            self.defaultLease = data.data.rentPeriod;
                            var couponList = data.data.couponList;
                            var coupon = data.data.coupon;
                            self.coupons = [coupon, couponList];
                            self.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            self.defaultTime = deliveryDays.default.string;
//                          self.deliverTime = deliveryDays.default.timestamp;
                            self.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            self.distributions = [deliveryDays, deliveryMethods, {'canOnsite': data.data.canOnsite, 'canPostal': data.data.canPostal}];
                            
                        } else {
                            Toast.show(data.msg);
                        }
                    })
            },
            goToOrderList : function() {
                this.$router.push( '/mine/order' );
            },
            cellHref: function( e, url ){

                this.$router.push( url );
            },
            payment : function() {
                var self = this;
                indexAPI.submit(
                    {
                        seqId : self.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(self.targets),
                        addressId : self.addressData.addressId,
                        dm : self.distributionNum,
                        couponId : self.defaultCoupon,
                        rentPeriod : self.defaultLease,
                        rentPeriodType : 3,
                        pm : 2,
                        deliverTime : self.deliverTime
                        
                    },
                    function(data) {
                    }
                )
                
//              this.$router.push( 'mine/order' );
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