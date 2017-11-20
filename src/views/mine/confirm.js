'use strict';
import Axios from 'axios';

var _default = (function(){
    var address = [
        {
            "provinceId": 0,
            "gdId": "B000A88B83",
            "gdBusinessArea": " ",
            "gdProvinceName": "北京市",
            "addressConsignee": "樊信智",
            "consigneeSex": 0,
            "cityId": 0,
            "addressTotal": "北京市海淀区北京市北京市海淀区华杰大厦7b3",
            "gdCityCode": "010",
            "gdTitle": "北京市北京市海淀区华杰大厦",
            "gdProvinceCode": "110000",
            "addressDetail": "7b3",
            "addressId": 4606497,
            "gdLatitude": 39.964635,
            "districtId": 0,
            "unitDeliveryMoney": 15000,
            "deliverMoney": 30000,
            "gdCityName": "北京市",
            "freeDeliverMoneyLimit": 300000,
            "deliveryMoneyCount": 2,
            "gdAdName": "海淀区",
            "gdAdCode": "110108",
            "gdLongitude": 116.341224,
            "consigneePhone": "17610007876"
        }
    ];
    var moneys= [
        {
        "deposit": 150000,
        "payBefore": 1506311339459,
        "endTime": 1508169600000,
        "deliveryMethods": {
            "default": 1
        },
        "payRent": 276000,
        "couponList": [],
        "depositTime": 1508428800000,
        "totalRentMsg": "优惠后租金满300元减30元运费",
        "payDeposit": 150000,
        "totalRent": 276000,
        "deliveryMoney": 30000,
        "payOrderMsg": "应付租金",
        "canPostal": false,
        "payMethod": 2,
        "postalDays": {
            "default": {
                "timestamp": 1506355200000,
                "string": "2017/09/26(周二)",
                "month": 9,
                "year": 2017,
                "day": 26,
                "week": "周二"
            },
        },
        "isJdCreditEnough": false,
        "isJdPayDepositMore": false,
        "depositMsg": "（小白信用不足，未享用免押服务）",
        "unitRent": "13.8",
        "canOnsite": true,
        "payMoney": 456000,
        "rentPeriod": 20,
        "payOrder": 306000,
        "payDelivery": 30000,
        "deliveryMsg": "含两次上门费用",
        "refundMsg": "提交订单后，您的0元退款将在玩具收回之后的三个工作日之内，与未转移押金一起退还至您的账户中。",
        "totalMoney": 456000
    }
    ]
    var toys = [
        {
            "isLatest": false,
            "isInRent": false,
            "rentMoney": 5900,
            "specialMoney": 5900,
            "stockNum": 2,
            "rentPeriodType": 3,
            "image": "https://ts.zlimg.com/t/10240720008/h1.jpg!588",
            "isHot": true,
            "endTime": 0,
            "isSpecialMoney": false,
            "rentType": 3,
            "toyName": "小泰克红蓝滑梯",
            "abilityType": 2,
            "ageRange": "2岁~6岁",
            "stockText": "",
            "toyNum": 1,
            "price": 449000,
            "canRent": true,
            "toySize": "L",
            "abilityName": "大动作",
            "canPostal": false,
            "toyId": 10240720008,
            "isRecommend": false,
            "sw": false
        },
        {
            "isLatest": false,
            "isInRent": true,
            "rentMoney": 7900,
            "specialMoney": 7900,
            "stockNum": 1,
            "rentPeriodType": 3,
            "image": "https://ts.zlimg.com/t/10369990002/h1.jpg!588",
            "isHot": true,
            "endTime": 0,
            "isSpecialMoney": false,
            "rentType": 3,
            "toyName": "小泰克欢乐小蹦床",
            "abilityType": 2,
            "ageRange": "1岁半以上",
            "stockText": "库存紧张",
            "toyNum": 1,
            "price": 639000,
            "canRent": true,
            "toySize": "L",
            "abilityName": "肌肉力量",
            "canPostal": false,
            "toyId": 10369990002,
            "isRecommend": false,
            "sw": true
        }
    ]
    return {
        name: 'order-confirm',
        mounted: function(){
            var that = this;
            
             Axios.post('/order/buy/check', {

            })
            .then(function (response) {
                var data = response.data;
                console.log(data);
                if (data.code == 0) {
                    
                    console.log(data.data)
                     
                } else {
                    console.log(results);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItem : address,
                moneysItem : moneys,
                toyItem : toys,
            };
        },
        methods: {
            goToOrderList : function() {
                this.$router.push( '/mine/order' );
            },
            cellHref: function( e, url ){

                this.$router.push( url );
            }
        }
    }
})();

export default _default;