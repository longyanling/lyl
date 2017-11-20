import Vue from "vue";
var _default = (function(){
   
    var logistics = [ // 订单所有快递列表，列表按时间逆序排列
            {
                "code": "560716357809", // 快递单号
                "orderId": "75977926297", // 订单号
                "expressType": 200, // 100送出 200归还
                "company": "天天快递",
                "expressId": 2,
                "detail": [ // 快递信息详情，按时间逆序排列
                    {
                        "date": "2017-07-18 13:05:53.0",
                        "description": "客户 签收人: 邮件收发章 已签收 感谢使用圆通速递，期待再次为您服务"
                    },
                    {
                        "date": "2017-07-18 07:52:42.0",
                        "description": "【上海市闵行区七宝公司】 派件人: 孙欣 派件中 派件员电话13127935063"
                    },
                    {
                        "date": "2017-07-18 05:22:32.0",
                        "description": "【上海市闵行区七宝公司】 已收入"
                    },
                    {
                        "date": "2017-07-17 22:18:54.0",
                        "description": "【上海转运中心】 已发出 下一站 【上海市闵行区七宝公司】"
                    },
                    {
                        "date": "2017-07-17 22:09:56.0",
                        "description": "【上海转运中心】 已收入"
                    },
                    {
                        "date": "2017-07-16 23:10:15.0",
                        "description": "【北京转运中心】 已发出 下一站 【上海转运中心】"
                    },
                    {
                        "date": "2017-07-16 23:07:50.0",
                        "description": "【北京转运中心】 已收入"
                    },
                    {
                        "date": "2017-07-16 20:46:21.0",
                        "description": "【北京市大兴区医药基地公司】 已发出 下一站 【北京转运中心】"
                    },
                    {
                        "date": "2017-07-16 20:32:04.0",
                        "description": "【北京市大兴区医药基地公司】 已打包"
                    },
                    {
                        "date": "2017-07-16 20:31:48.0",
                        "description": "【北京市大兴区医药基地公司】 已收件"
                    },
                    {
                        "date": "2017-08-03 18:50:41.0",
                        "description": "您的订单已打包等待配送"
                    },
                    {
                        "date": "2017-08-03 16:50:41.0",
                        "description": "您的订单开始处理"
                    }
                ],
            },
            {
                "code": "560716357808",
                "orderId": "75977926297",
                "expressType": 100,
                "company": "达达",
                "expressId": 1,
                "detail": [
                    {
                        "date": "2017-07-18 13:05:53.0",
                        "description": "客户 签收人: 邮件收发章 已签收 感谢使用圆通速递，期待再次为您服务"
                    },
                    {
                        "date": "2017-07-18 07:52:42.0",
                        "description": "【上海市闵行区七宝公司】 派件人: 孙欣 派件中 派件员电话13127935063"
                    },
                    {
                        "date": "2017-07-18 05:22:32.0",
                        "description": "【上海市闵行区七宝公司】 已收入"
                    },
                    {
                        "date": "2017-07-17 22:18:54.0",
                        "description": "【上海转运中心】 已发出 下一站 【上海市闵行区七宝公司】"
                    },
                    {
                        "date": "2017-07-17 22:09:56.0",
                        "description": "【上海转运中心】 已收入"
                    },
                    {
                        "date": "2017-07-16 23:10:15.0",
                        "description": "【北京转运中心】 已发出 下一站 【上海转运中心】"
                    },
                    {
                        "date": "2017-07-16 23:07:50.0",
                        "description": "【北京转运中心】 已收入"
                    },
                    {
                        "date": "2017-07-16 20:46:21.0",
                        "description": "【北京市大兴区医药基地公司】 已发出 下一站 【北京转运中心】"
                    },
                    {
                        "date": "2017-07-16 20:32:04.0",
                        "description": "【北京市大兴区医药基地公司】 已打包"
                    },
                    {
                        "date": "2017-07-16 20:31:48.0",
                        "description": "【北京市大兴区医药基地公司】 已收件"
                    },
                    {
                        "date": "2017-08-18 18:57:05.0",
                        "description": "您的订单已打包等待配送"
                    },
                    {
                        "date": "2017-08-18 16:57:05.0",
                        "description": "您的订单开始处理"
                    }
                ],
            }
        ]
    return {
        name: 'order-logistics',
        mounted: function(){
             
            this.$emit('frameTabSetup', 3, false);
        },
        destoryed: function(){

        },
        data: function(){
            var mails = [];
            var returns = [];
            logistics.forEach(function(item){
                if(item.expressType == 200){
                    mails.push(item);
                }else {
                    returns.push(item);
                }
            });
            return {
                expressMail : mails,
                expressReturn : returns,
            	tabIndex: 0,
            };
        },
        methods: {
            cellHref: function( e, url ){
        
                this.$router.push( url );
            },
            tabShow: function(index) {
                console.log(index);
                this.tabIndex = index;
            }
        }
    }
})();

export default _default;