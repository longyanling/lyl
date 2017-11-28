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
            
            //获取数据仓库中的数据
            var target =  new Array();
            Store.data.forEach(function(toy){
                target.push({'toyId': toy.toyId, 'toyNum': toy.toyNum});
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
                                        that.couponName = data.data.coupon.displayName;
                                        that.coupons = data.data.couponList;
                                        that.leases = data.data.rentPeriodInfo;
                                        var deliveryDays = data.data.deliveryDays;
                                        var deliveryMethods = data.data.deliveryMethods;
                                        that.defaultTime = deliveryDays.default.string;
                                        that.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                                        that.distributions = [deliveryDays, deliveryMethods];
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
                distributionNum : null,
                distributionTime : null
            };
        },
        methods: {
            //修改配送信息
            setDistribution : function(infoDeterData){
                var stat = this;
                console.log(infoDeterData);
//              stat.defaultTime = infoDeterData[1].string;
//              stat.defauitName = (infoDeterData[0].value == 1 ? '育儿师上门取送':'快递邮寄');
                stat.distributionNum = infoDeterData[0].value;
                stat.distributionTime = infoDeterData[1].timestamp;
                console.log(stat.distributionNum);
                indexAPI.presubmit(
                    {
                        seqId : stat.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(stat.targets),
                        addressId : stat.addressData.addressId,
                        dm : stat.distributionNum,
                        couponId : '2017071116510400654',
                        orderTime : stat.distributionTime
                    },
                    function (data) {
                        console.log(data);
                        if (data.code == 0) {
                            stat.confirmItem = data.data;
                            stat.couponName = data.data.coupon.displayName;
                            stat.coupons = data.data.couponList;
                            stat.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            stat.defaultTime = deliveryDays.default.string;
                            stat.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            stat.distributions = [deliveryDays, deliveryMethods];
                            console.log(stat.distributions)
                        } else {
                            Toast.show(data.msg);
                        }
                    })
            },
            //修改配送地址
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
                        couponId : '2017071116510400654',
                    },
                    function (data) {
                        if (data.code == 0) {
                            self.confirmItem = data.data;
                            self.couponName = data.data.coupon.displayName;
                            self.coupons = data.data.couponList;
                            self.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            self.defaultTime = deliveryDays.default.string;
                            self.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            self.distributions = [deliveryDays, deliveryMethods];
                            
                        } else {
                            Toast.show(data.msg);
                        }
                    })
            },
            //修改租期
            setDate : function(item){
                var self = this;
                console.log("confirm ====" + item);
                indexAPI.presubmit(
                    {
                        seqId : self.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(self.targets),
                        addressId : self.addressData.addressId,
                        dm : self.distributionNum,
                        couponId : '2017071116510400654',
                        rentPeriod : item
                    },
                    function (data) {
                        if (data.code == 0) {
                            self.confirmItem = data.data;
                            self.couponName = data.data.coupon.displayName;
                            self.coupons = data.data.couponList;
                            self.leases = data.data.rentPeriodInfo;
                            var deliveryDays = data.data.deliveryDays;
                            var deliveryMethods = data.data.deliveryMethods;
                            self.defaultTime = deliveryDays.default.string;
                            self.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                            self.distributions = [deliveryDays, deliveryMethods];
                            
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