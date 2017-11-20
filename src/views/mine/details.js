var _default = (function(){
    var details = [
        {
        "phone": "1761007876",
        "deposit": 100000,
        "statusName": "已取消",
        "deliveryMethod": 1,
        "rentPeriodType": 3,
        "depositReturnTime": 1508083200000,
        "isDelete": true,
        "canChange": false,
        "totalRent": 102000,
        "userName": "樊信智先生",
        "deliveryMoney": 30000,
        "deliverTime": 1505836800000,
        "payMethod": 2,
        "orderRole": 0,
        "orderType": 1,
        "status": 1,
        "depositMakeup": 0,
        "couponMoney": 0,
        "depositReuse": 0,
        "rentDiscount": 0,
        "otherMoney": 0,
        "deliveryDisMakeup": 0,
        "unitRent": 5100,
        "expressDetail": [
            {
                "description": "您的订单已打包等待配送",
                "date": "2017-09-19 12:10:39.0"
            },
            {
                "description": "您的订单开始处理",
                "date": "2017-09-19 10:10:39.0"
            }
        ],
        "rentPeriod": 20,
        "channelPayMsg": "（未支付）",
        "thirdPay": 0,
        "canSa": true,
        "deliveryMethodName": "育儿师上门取送",
        "createTime": 1505787039000,
        "returnTime": 1507651200000,
        "depositDiscount": 0,
        "deliveryName": "配送",
        "orderCategory": 0,
        "logisticsStatus": 100000,
        "totalCount": 1,
        "realPayMoney": 232000,
        "canWithdraw": false,
        "orderId": 83067039347,
        "rentMakeup": 0,
        "serviceFee": 0,
        "rentReuse": 0,
        "depositMsg": "（小白信用80及以上免押租用）",
        "rentDisMakeup": 0,
        "showCancelBtn": false,
        "address": "北京市北京市海淀区北京市北京市海淀区华杰大厦7b3",
        "payOrder": 132000,
        "toys": [
            {
                "isLatest": false,
                "rentMoney": 5100,
                "specialMoney": 5100,
                "rentPeriodType": 3,
                "image": "https://ts.zlimg.com/t/10120360034/h1.jpg!588",
                "isHot": true,
                "isSpecialMoney": false,
                "rentType": 7,
                "toyName": "费雪新款跳跳弹床蓝色",
                "ageRange": "1岁~3岁",
                "toyNum": 1,
                "toySize": "M",
                "toyId": 10120360034,
                "realRentMoney": 5100,
                "isRecommend": false
            }
        ],
        "rentRefundMsg": "",
        "totalMoney": 232000
    }
    ]
    return {
        name: 'order-details',
        mounted: function(){
        

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                detailsItem : details,
            };
        },
        methods: {
            cellHref: function( e, url ){
        
                this.$router.push( url );
            }
        }
    }
})();

export default _default;