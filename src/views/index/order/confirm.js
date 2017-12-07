'use strict';

import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";

var _default = (function(){

    var preToys = [];
    var preSubmit = function(vm, data){
        
        API.Index.presubmit(data, function (data) {
            
            if (data.code == 0) {
                vm.confirmItem = data.data;
                vm.couponName = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.displayName : '');
                vm.defaultCoupon = (data.data.couponList.length>0 && data.data.coupon ? data.data.coupon.couponId : '-1');
                vm.defaultLease = data.data.rentPeriod; 
                var couponList = data.data.couponList;
                var coupon = data.data.coupon;
                vm.coupons = [coupon, couponList];
                vm.leases = data.data.rentPeriodInfo;
                var deliveryDays = data.data.deliveryDays;
                var deliveryMethods = data.data.deliveryMethods;
                vm.defaultTime = deliveryDays.default.string;
                vm.distributionNum = deliveryMethods.default;
                vm.defauitName = (deliveryMethods.default == 1 ? '育儿师上门取送':'快递邮寄');
                vm.distributions = [deliveryDays, deliveryMethods, {'canOnsite': data.data.canOnsite, 'canPostal': data.data.canPostal} ];
                vm.deliverTime = data.data.deliveryDays.default.timestamp;
            } else {
                Toast.show(data.msg);
            }
        });                
    };

    return {
        name: 'order-confirm',
        mounted: function(){
            
            var vm = this;
            var toys = [];
            var price = 0;
            
            if( Store.Index.orderToys &&  Store.Index.orderToys.length >0){
                for (var i = 0; i < Store.Index.orderToys.length; i++){
                    toys.push({
                        'toyId': Store.Index.orderToys[i].toyId, 
                        'toyNum': 1
                    });
                }
                API.Index.buyCheck(
                    {
                        orderType : '1',
                        newToys :  JSON.stringify(toys),
                    },
                    function (data) {
                        
                        if (data.code == 0) {
                            vm.addressData = data.data.address || {};
                            vm.addressName = vm.addressData.addressConsignee || '';
                            vm.addressDetail = vm.addressData.addressTotal || '请您添加收货地址';
                            vm.addressSex = vm.addressData.consigneeSex ? (vm.addressData.consigneeSex == 0 ? '先生' : '女士') : '';
                            vm.addressPhone = vm.addressData.consigneePhone || '';
                            vm.passSeqId = data.data.seqId;
                            vm.toyItems = data.data.toys.newToys.is;
                            for (var i = 0; i < vm.toyItems.length; i++){
                                price += vm.toyItems[i].specialMoney;
                                preToys.push({
                                    'toyId': vm.toyItems[i].toyId, 
                                    'toyNum': 1, 
                                    'toyPrice': vm.toyItems[i].specialMoney
                                });
                            }
                            vm.toyALLPrice = price/1000;
                            
                            preSubmit(vm, {
                                seqId : vm.passSeqId,
                                orderType : 1,
                                newToys : JSON.stringify(preToys),
                                addressId : vm.addressData.addressId || 0,
                                dm : -1,
                            });
                        } else {
                            Toast.show(data.msg);
                        }   
                    }
                )
            } else {
                this.$router.push( '/index/cart' );
                Toast.show('请查看您的购物车是否有玩具');
            }

        },
        data: function(){
            
            return {
                addressData : [],
                addressName : null,
                addressDetail : null,
                addressSex : null,
                addressPhone : null,
                confirmItem : [],
                toyItems : [],
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
                
                this.distributionNum = infoDeterData[0].value;
                this.distributionTime = infoDeterData[1].timestamp;
                
                preSubmit(this, {
                    seqId : this.passSeqId,
                    orderType : 1,
                    newToys : JSON.stringify(preToys),
                    addressId : this.addressData.addressId,
                    dm : this.distributionNum,
                    couponId : this.defaultCoupon,
                    orderTime : this.distributionTime
                });
            },
            //  修改配送地址
            setAddressId :function(address){
                
                this.addressName = address.addressConsignee;
                this.addressDetail = address.addressTotal;
                this.addressSex = (address.consigneeSex == 0 ? '先生' : '女士');
                this.addressPhone = address.consigneePhone;

                preSubmit(this, {
                    seqId : this.passSeqId,
                    orderType : 1,
                    newToys : JSON.stringify(preToys),
                    addressId : address.addressId,
                    dm : this.distributionNum,
                    couponId : this.defaultCoupon
                });
            },
            //  修改租期
            setDate : function(item){

                this.defaultLease = item;
                
                preSubmit(this, {
                        seqId : this.passSeqId,
                        orderType : 1,
                        newToys : JSON.stringify(preToys),
                        addressId : this.addressData.addressId,
                        dm : this.distributionNum,
                        couponId : this.defaultCoupon,
                        rentPeriod : this.defaultLease
                });
            },
            //  选择优惠券
            setCoupon : function(couponId){
                
                this.defaultCoupon = couponId;
                
                preSubmit(this, {
                    seqId : this.passSeqId,
                    orderType : 1,
                    newToys : JSON.stringify(preToys),
                    addressId : this.addressData.addressId,
                    dm : this.distributionNum,
                    couponId : this.defaultCoupon,
                    rentPeriod : this.defaultLease
                });
            },
            showPopup: function( e, url ){

                this.$router.push( url );
            },
            payment : function() {
                
                var self = this;
                API.Index.submit(
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
            }
        },
        filters: {
            surplus: function (value) {
                
                return Math.floor((Utils.Date.fromTicks(value) - new Date()) / 24 / 3600 / 1000);
            },
            expire: function (value) {
                
                return Utils.Date.toString(Utils.Date.fromTicks(value), 'yyyy/MM/dd');
            }
        }
    }
})();

export default _default;