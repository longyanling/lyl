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
        },
        {
            "provinceId": 0,
            "gdId": "B0FFHONJ42",
            "gdBusinessArea": " ",
            "gdProvinceName": "北京市",
            "addressConsignee": "华杰大厦",
            "consigneeSex": 0,
            "cityId": 0,
            "addressTotal": "北京市海淀区北京市北京市海淀区华杰大厦A座取而且",
            "gdCityCode": "010",
            "gdTitle": "北京市北京市海淀区华杰大厦A座",
            "gdProvinceCode": "110000",
            "addressDetail": "取而且",
            "addressId": 4606499,
            "gdLatitude": 39.964792,
            "districtId": 0,
            "unitDeliveryMoney": 15000,
            "deliverMoney": 30000,
            "gdCityName": "北京市",
            "freeDeliverMoneyLimit": 300000,
            "deliveryMoneyCount": 2,
            "gdAdName": "海淀区",
            "gdAdCode": "110108",
            "gdLongitude": 116.341679,
            "consigneePhone": "12313131312"
        },
        {
            "provinceId": 0,
            "gdId": "B0FFFZCFOT",
            "gdBusinessArea": " ",
            "gdProvinceName": "北京市",
            "addressConsignee": "樊信智",
            "consigneeSex": 0,
            "cityId": 0,
            "addressTotal": "北京市海淀区北京市北京市海淀区华杰通力13",
            "gdCityCode": "010",
            "gdTitle": "北京市北京市海淀区华杰通力",
            "gdProvinceCode": "110000",
            "addressDetail": "13",
            "addressId": 4606498,
            "gdLatitude": 39.979799,
            "districtId": 0,
            "unitDeliveryMoney": 15000,
            "deliverMoney": 30000,
            "gdCityName": "北京市",
            "freeDeliverMoneyLimit": 300000,
            "deliveryMoneyCount": 2,
            "gdAdName": "海淀区",
            "gdAdCode": "110108",
            "gdLongitude": 116.333954,
            "consigneePhone": "1313131313"
        }
    ];
    return {
        name: 'order-addressList',
        mounted: function(){
            
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItem : address,
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