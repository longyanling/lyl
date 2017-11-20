var _default = (function(){
    var methods= [
        {
            "title": "育儿师上门取送",
            "desc": "仅支持北京地区，优惠后租金满300元可减30元运费",
            "name": "上门",
            "money": 30000,
            "value": 1,
            "image": "https://ts.zlimg.com/z/delivery-onsite.png",
            "tips": "您所选的日期仅作为参考，在出发之前我们的客服人员会与您电话确认最终的送货日期。"
        },
        {
            "title": "快递邮寄",
            "desc": "优惠后租金满200元可免单程运费，返程运费由您自理；满300元可免往返运费",
            "name": "邮寄",
            "money": 0,
            "value": 2,
            "image": "https://ts.zlimg.com/z/delivery-postal.png",
            "tips": "发货日期为玩具寄出日期，租期从您收到玩具之后的第二天开始计算。"
        }
    ];
    var days = [
        {
            "timestamp": 1506355200000,
            "string": "2017/09/26(周二)",
            "month": 9,
            "year": 2017,
            "day": 26,
            "week": "周二"
        },
        {
            "timestamp": 1506441600000,
            "string": "2017/09/27(周三)",
            "month": 9,
            "year": 2017,
            "day": 27,
            "week": "周三"
        },
        {
            "timestamp": 1506528000000,
            "string": "2017/09/28(周四)",
            "month": 9,
            "year": 2017,
            "day": 28,
            "week": "周四"
        },
        {
            "timestamp": 1506614400000,
            "string": "2017/09/29(周五)",
            "month": 9,
            "year": 2017,
            "day": 29,
            "week": "周五"
        }
    ];
    return {
        name: 'pop_distribution',
        mounted: function(){

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                methodsItem : methods,
                daysItem : days,
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
