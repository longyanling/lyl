'use strict';

import Toast from '@/directives/toast';
import Store from "@/directives/store";
import Sortor from "@/directives/sortor";
import Shortcut from '@/components/shortcut.vue';
import Modal from '@/components/modal.vue';
import API from "@/services/api";

var _default = (function() {

    return {
        name: 'index-screen',
        mounted: function() {
            var vm = this;
            
            vm.loadingState = true;
            var dataBrandId = vm.$route.query.brandid && vm.$route.query.brandid == 35 ? "35" : "";
            if(dataBrandId && dataBrandId==35){
                vm.brandSelectedData.push(dataBrandId);
            };
            API.Index.toyList(
                {
                    name : "",
                    q : JSON.stringify({
                        "ageRange": "", 
                        "toySort" : 0,
                        "toyType": "",
                        "brand": dataBrandId,
                        "ability": "",
                        "toySize": "",
                        "stockNum": 0,
                        "rentType": 2
                    }),
                    rt : 2,
                    sk : 0,
                    tid : -1
                },
                function (data) {
                    if (data.code == 0) {
                        vm.toyIsEnd = data.data.isEnd;
                        vm.toyLastId = (data.data.toys.length > 0 ? data.data.toys.slice(-1)[0].toyId : -1);
                        var toysLoad = data.data.toys;
                        for(var i = 0; i < toysLoad.length ; i++){
                            vm.toysListItem.push(toysLoad[i]);
                        }
                        vm.loadingState = false;
                    } else {
                        Toast.show(data.msg);
                    }
                    
                }
            );
            
            API.Index.screen(
                {
 
                },
                function (data) {
                    if (data.code == 0) {
                        //年龄
                        vm.ageItem = data.data.ageRange;
                        //品牌
                        vm.brandHotItem = data.data.brand.hot;
                        var brandAll = data.data.brand.all;
                        vm.brandAllItem = Sortor.pinyin(brandAll);
                        //能力
                        vm.abilityItemOne = data.data.ability.slice(0,9);
                        vm.abilityItemTwo = data.data.ability.slice(9,18),
                        vm.abilityItemThree = data.data.ability.slice(18,27),
                        vm.abilityItemFour = data.data.ability.slice(27,31),
                        //类型
                        vm.toyTypeItemOne = data.data.toyType.slice(0,9);
                        vm.toyTypeItemTwo = data.data.toyType.slice(9,18),
                        vm.toyTypeItemThree = data.data.toyType.slice(18,27),
                        //筛选
                        vm.toySortItem = data.data.toySort;
                        vm.toySizeItem = data.data.toySize;
                        vm.toyOtherRentType = data.data.toyOther[0];
                        vm.toyOtherStockNum = data.data.toyOther[1];  
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
            
            //滑动到玩具列表底部加载玩具列表
            window.addEventListener('scroll',function(){
                // 判断是否滚动到底部  
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && !vm.toyIsEnd) {
                    API.Index.toyList(
                        {
                            name : "",
                            q : vm.screenJSON,
                            rt : 2,
                            sk : 0,
                            tid : vm.toyLastId,
                        },
                        function (data) {
                            if (data.code == 0) {
                                vm.toyIsEnd = data.data.isEnd;
                                vm.toyLastId = (data.data.toys.length > 0 ? data.data.toys.slice(-1)[0].toyId : -1);
                                var toyLoad = data.data.toys;
                                for(var i = 0; i < toyLoad.length ; i++){
                                    vm.toysListItem.push(toyLoad[i]);
                                }
                            } else {
                                Toast.show(data.msg);
                            }
                            
                        }
                    ); 
                }
            });
        },
        data: function() {

            return {
                loadingState: true,
                tabsIsDock: false,
                ageIsShow : false,
                brandIsShow : false,
                abilityIsShow : false,
                typeIsShow : false,
                screenIsShow : false,
                
                toyLastId : -1,
                //玩具列表
                toysListItem: [],
                toyIsEnd : false,
                //年龄
                ageItem : [],
                //品牌
                brandHotItem : [],
                brandAllItem : [],
                //能力
                abilityItemOne : [],
                abilityItemTwo : [],
                abilityItemThree : [],
                abilityItemFour : [],
                //类型
                toyTypeItemOne : [],
                toyTypeItemTwo : [],
                toyTypeItemThree : [],
                //排序
                toySortItem : [],
                //大小
                toySizeItem : [],
                //其他
                toyOtherRentType : [],
                toyOtherStockNum : [],
                
                
                //选中
                ageSelectedData : [],
                brandSelectedData : [],
                abilitySelectedData : [],
                typeSelectedData : [],
                sortSelectedData : 0,
                sizeSelectedData : [],
                rentSelectedData : 2,
                stockSelectedData : 0,
                stockState : false,
                rentState : false,
                screenJSON : null,
                
                backUrl: '/index/screen',
                cartUrl: '/index/screen/cart'
            };
        },
        methods: {
            deactive: function(e){
            	
                if (e.target.className == 'box' || e.target.className == 'brand' || e.target.className == 'ability' || e.target.className == 'screen'){
                    this.ageIsShow = false;
                    this.brandIsShow = false;
                    this.abilityIsShow = false;
                    this.typeIsShow = false;
                    this.screenIsShow = false;  
                }
            },
            showToyExists: function (){
                
                this.$refs.modal.show('您购物车中已经有该玩具了，快去下单吧!', '看看别的', '去下单');
            },
            goToCart: function(){
                
                this.$router.push('/index/screen/cart');
                _hmt.push(["_trackEvent", "link", "click", "筛选-进入购物车"]);
            },
            //添加到购物车
            addCart : function(e, toyId) {
			    
		    	this.$refs.carts.addToy(toyId);
		    	_hmt.push(["_trackEvent", "link", "click", "筛选-加入购物车"]);
            },
            goToToyDetail: function(e, toyId){
            	
                this.$router.push('/index/detail?toyid=' + toyId);
                _hmt.push(["_trackEvent", "link", "click", "筛选-进入详情页"]);
            },
             //年龄选中
            ageSelected : function( e, ageRangeId) {
            	
                for(var i =0; i<this.ageSelectedData.length; i++){
                    if (this.ageSelectedData[i] == ageRangeId){
                        this.ageSelectedData.splice(i,1);
                        return ;
                    }
                }
                this.ageSelectedData.push(ageRangeId);
                _hmt.push(["_trackEvent", "link", "click", "筛选-年龄选择"]);
            },
            ageIsSelected: function( ageRangeId ){
            	
                for(var i =0; i<this.ageSelectedData.length; i++){
                    if (this.ageSelectedData[i] == ageRangeId){
                        return true;
                    }
                }
                return false;
            },
            //品牌选中
            brandSelected : function(e, brandId) {
            	
                for(var i =0; i<this.brandSelectedData.length; i++){
                    if (this.brandSelectedData[i] == brandId){
                        this.brandSelectedData.splice(i,1);
                        return ;
                    }
                }
                this.brandSelectedData.push(brandId);
                _hmt.push(["_trackEvent", "link", "click", "筛选-品牌选择"]);
            },
            brandIsSelected : function(brandId) {
            	
                for(var i =0; i<this.brandSelectedData.length; i++){
                    if (this.brandSelectedData[i] == brandId){
                        return true;
                    }
                }
                return false;
            },
            //能力选中
            abilitySelected : function(e, abilityId){
            	
                for(var i =0; i<this.abilitySelectedData.length; i++){
                    if (this.abilitySelectedData[i] == abilityId){
                        this.abilitySelectedData.splice(i,1);
                        return ;
                    }
                }
                this.abilitySelectedData.push(abilityId);
                _hmt.push(["_trackEvent", "link", "click", "筛选-能力选择"]);
            },
            abilityIsSelected : function(abilityId) {
            	
                for(var i =0; i<this.abilitySelectedData.length; i++){
                    if (this.abilitySelectedData[i] == abilityId){
                        return true;
                    }
                }
                return false;
            },
            //类型选中
            typeSelected : function(e, toyTypeId) {
            	
                for(var i =0; i<this.typeSelectedData.length; i++){
                    if (this.typeSelectedData[i] == toyTypeId){
                        this.typeSelectedData.splice(i,1);
                        return ;
                    }
                }
                this.typeSelectedData.push(toyTypeId);
                _hmt.push(["_trackEvent", "link", "click", "筛选-类型选择"]);
            },
            typeIsSelected : function(toyTypeId) {
            	
                for(var i =0; i<this.typeSelectedData.length; i++){
                    if (this.typeSelectedData[i] == toyTypeId){
                        return true;
                    }
                }
                return false;
            },
            //排序选中
             sortSelected : function(e, toySortTypeId){
             	
                this.sortSelectedData = toySortTypeId;
                _hmt.push(["_trackEvent", "link", "click", "筛选-排序选择"]);
            },
            //玩具大小选中
            sizeSelected : function(e, toySizeTypeId) {
                for(var i =0; i<this.sizeSelectedData.length; i++){
                    if (this.sizeSelectedData[i] == toySizeTypeId){
                        this.sizeSelectedData.splice(i,1);
                        return ;
                    }
                }
                this.sizeSelectedData.push(toySizeTypeId);
                _hmt.push(["_trackEvent", "link", "click", "筛选-大小选择"]);
            },
            sizeIsSelected : function(toySizeTypeId) {
            	
                for(var i =0; i<this.sizeSelectedData.length; i++){
                    if (this.sizeSelectedData[i] == toySizeTypeId){
                        return true;
                    }
                }
                return false;
            },
            //可邮寄选中
            rentSelected : function() {
            	
                this.rentState = !this.rentState;
                if(this.rentState){
                    this.rentSelectedData = this.toyOtherRentType.rentTypeId; 
                }else {
                    this.rentSelectedData = 2;
                };
                _hmt.push(["_trackEvent", "link", "click", "筛选-邮寄选择"]);
            },
                
            //有货选中
            stockSelected : function() {
            	
                this.stockState = !this.stockState;
                if(this.stockState){
                    this.stockSelectedData = this.toyOtherStockNum.stockNum;
                }else {
                    this.stockSelectedData = 0;
                };
                _hmt.push(["_trackEvent", "link", "click", "筛选-有货选择"]);
            },
            //  筛选的切换
            ageShow: function (){
            	
                this.ageIsShow = !this.ageIsShow;
                this.brandIsShow = false;
                this.abilityIsShow = false;
                this.typeIsShow = false;
                this.screenIsShow = false;
            },
            brandShow: function (){
            	
                this.brandIsShow = !this.brandIsShow;
                this.ageIsShow = false;
                this.abilityIsShow = false;
                this.typeIsShow = false;
                this.screenIsShow = false;
            },
            abilityShow: function (){
            	
                this.abilityIsShow = !this.abilityIsShow;
                this.ageIsShow = false;
                this.brandIsShow = false;
                this.typeIsShow = false;
                this.screenIsShow = false;
            },
            typeShow: function (){
            	
                this.typeIsShow = !this.typeIsShow;
                this.ageIsShow = false;
                this.brandIsShow = false;
                this.abilityIsShow = false;
                this.screenIsShow = false;
            },
            screenShow: function (){
            	
                this.screenIsShow = !this.screenIsShow;
                this.typeIsShow = false;
                this.ageIsShow = false;
                this.brandIsShow = false;
                this.abilityIsShow = false;
            },
            
            screenConfirm: function(){
            	
                var self = this;
                self.commonLastToyId = -1;
                self.tabsIsDock = false;
                self.ageIsShow = false;
                self.brandIsShow = false;
                self.abilityIsShow = false;
                self.typeIsShow = false;
                self.screenIsShow = false;
                
                var ages = (self.ageSelectedData && self.ageSelectedData.length ? self.ageSelectedData.join(';') : '');
                var types = (self.typeSelectedData && self.typeSelectedData.length ? self.typeSelectedData.join(';') : '');
                var brandes = (self.brandSelectedData && self.brandSelectedData.length ? self.brandSelectedData.join(';') : '');
                var abilitys = (self.abilitySelectedData && self.abilitySelectedData.length ? self.abilitySelectedData.join(';') : '');
                var sizes = (self.sizeSelectedData && self.sizeSelectedData.length ? self.sizeSelectedData.join(';') : '');
                self.screenJSON = JSON.stringify({
                    "ageRange": ages , 
                    "toySort" : self.sortSelectedData ,
                    "toyType": types ,
                    "brand": brandes ,
                    "ability": abilitys ,
                    "toySize": sizes ,
                    "stockNum": self.stockSelectedData ,
                    "rentType": self.rentSelectedData 
                });
                API.Index.toyList(
                    {
                        name : "",
                        q : self.screenJSON,
                        rt : 2,
                        sk : 0,
                        tid : -1
                    },
                    function (data) {
                        if (data.code == 0) {
                            self.toysListItem = [];
                            self.toyIsEnd = data.data.isEnd;
                            self.toyLastId = (data.data.toys.length > 0 ? data.data.toys.slice(-1)[0].toyId : -1);
                            var toysLoad = data.data.toys;
                            for(var i = 0; i < toysLoad.length ; i++){
                                self.toysListItem.push(toysLoad[i]);
                            }

                        } else {
                            Toast.show(data.msg);
                        }
                        
                    }
                );
                _hmt.push(["_trackEvent", "link", "click", "筛选-确认"]);
            },
            screenReset : function() {
            	
                this.ageSelectedData = [];
                this.brandSelectedData = [];
                this.abilitySelectedData = [];
                this.typeSelectedData = [];
                this.sortSelectedData = 0;
                this.sizeSelectedData = [];
                this.rentSelectedData = 2;
                this.stockSelectedData = 0;
                this.stockState = false;
                this.rentState = false;
                _hmt.push(["_trackEvent", "link", "click", "筛选-重置"]);
            },
        },
        components: {
            'tm-shortcut': Shortcut,
            'tm-modal': Modal
        }
    }
})();

export default _default;