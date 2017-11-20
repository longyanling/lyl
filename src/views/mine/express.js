var _default = (function(){
    
    var companyList = [
        {
            "name": "百世快递",
            "hot": 0,
            "pinyin": "bs"
        },
        {
            "name": "邮政EMS",
            "hot": 7,
            "pinyin": "ems"
        },
        {
            "name": "国通快递",
            "hot": 0,
            "pinyin": "gt"
        },
        {
            "name": "如风达",
            "hot": 0,
            "pinyin": "rfd"
        },
        {
            "name": "顺丰速递",
            "hot": 4,
            "pinyin": "sf"
        },
        {
            "name": "申通快递",
            "hot": 3,
            "pinyin": "st"
        },
        {
            "name": "天天快递",
            "hot": 5,
            "pinyin": "tt"
        },
        {
            "name": "优速快递",
            "hot": 0,
            "pinyin": "uc"
        },
        {
            "name": "万象物流",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "德邦快递",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "佳怡物流",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "跨越速运",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "快捷速运",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "联邦快递",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "龙邦速运",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "联昊通",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "全峰快递",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "全一快递",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "盛辉物流",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "天地华宇",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "信丰物流",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "新邦物流",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "远成物流",
            "hot": 0,
            "pinyin": "wx"
        },
        {
            "name": "韵达快递",
            "hot": 6,
            "pinyin": "yd"
        },
        {
            "name": "圆通快递",
            "hot": 1,
            "pinyin": "yt"
        },
        {
            "name": "宅急送",
            "hot": 0,
            "pinyin": "zjs"
        },
        {
            "name": "中通快递",
            "hot": 2,
            "pinyin": "zt"
        }
    ];
    var companyHot = [
        {
            "name": "圆通快递",
            "hot": 1,
            "pinyin": "yt"
        },
        {
            "name": "中通快递",
            "hot": 2,
            "pinyin": "zt"
        },
        {
            "name": "申通快递",
            "hot": 3,
            "pinyin": "st"
        },
        {
            "name": "顺丰速递",
            "hot": 4,
            "pinyin": "sf"
        },
        {
            "name": "天天快递",
            "hot": 5,
            "pinyin": "tt"
        },
        {
            "name": "韵达快递",
            "hot": 6,
            "pinyin": "yd"
        },
        {
            "name": "邮政EMS",
            "hot": 7,
            "pinyin": "ems"
        }
    ];
    return {
        name: 'order-express',
        mounted: function(){
            

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                companyListItem : companyList,
                companyHotItem : companyHot,
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