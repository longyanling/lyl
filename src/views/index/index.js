'use strict';
import Slide from '@/components/slide.vue'
import Toast from '@/directives/toast';
import Sort from "@/directives/sort";
import indexAPI from "@/services/index-service";

var _default = (function(){
	
	var navigations = [{'text': '年龄'},{'text': '品牌'},{'text': '能力'},{'text': '类型'},{'text': '筛选'}];
	return {
		name: 'home-index',
		mounted: function(){
            var that = this;

            //排序
            function pySort(arr,empty){
                var $this = this;
                if(!String.prototype.localeCompare)return null;
                var letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
                var zh ="啊把差大额发噶哈*级卡啦吗那哦爬器然撒他**哇西呀咋".split('');
                var result = [];
                var curr;
                for( var i = 0;i < letters.length ; i++ ){
                    curr = {letter: letters[i], data:[]};
                    if(i!=26){
                        for(var j = 0;j <arr.length;j++){
                            var initial = Sort(arr[j].brandName.charAt(0));
                            if(initial == letters[i] || initial == letters[i].toLowerCase()){
                                curr.data.push(arr[j]);
                            }
                        }
                    }
                    if(empty || curr.data.length) {
                        result.push(curr);
                        curr.data.sort(function(a,b){
                            return b.brandName.localeCompare(a);
                        });
                    }
                }
                return result;
            };
        
        
        //请求接口：
            //首页banner接口
            indexAPI.banner(
                {
                    
                },
                function(data) {
                    if(data.code == 0){
                        that.bannerItems = data.data;
                        for (var i = 0; i<that.bannerItems.length;i++){
                            that.bannerItems[i]['src'] = that.bannerItems[i]['bannerImage'] ;
                        };
                    }else {
                       Toast.show(data.msg) 
                    }
                }
            );
            //玩具列表接口
            indexAPI.toyList(
                {
                    name : "",
                    q : that.screenJSON,
                    rt : 2,
                    sk : 1,
                    tid : that.commonLastToyId,
                },
                function (data) {
                    if (data.code == 0) {
                        if(data.data.isEnd==false) {
                            that.LoadState = true;
                        }else {
                            that.LoadState = false;
                        };
                        if (data.data.toys.length > 0) {
                            that.commonLastToyId = data.data.toys.slice(-1)[0].toyId;
                        } else {
                            that.commonLastToyId = -1;
                        };
                        var toyInit = data.data.toys;
                        toyInit.forEach(function(toys,index){  
                            that.toysListItem.push(toys);  
                        });
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
            
            //滑动到玩具列表底部加载玩具列表
            window.addEventListener('scroll',function(){
                // 判断是否滚动到底部  
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && that.LoadState) {
                    indexAPI.toyList(
                        {
                            name : "",
                            q : that.screenJSON,
                            rt : 2,
                            sk : 1,
                            tid : that.commonLastToyId,
                        },
                        function (data) {
                            if (data.code == 0) {
                                if(data.data.isEnd==false) {
                                    that.LoadState = true;
                                }else {
                                    that.LoadState = false;
                                };
                                if (data.data.toys.length > 0) {
                                    that.commonLastToyId = data.data.toys.slice(-1)[0].toyId;
                                } else {
                                    that.commonLastToyId = -1;
                                };
                                var toyLoad = data.data.toys;
                                toyLoad.forEach(function(toys,index){  
                                    that.toysListItem.push(toys); 
                                });
                            } else {
                                Toast.show(data.msg);
                            }
                            
                        }
                    ); 
                }
            });
            //筛选接口
            indexAPI.screen(
                {
 
                },
                function (data) {
                    if (data.code == 0) {
                        //年龄
                        that.ageItem = data.data.ageRange;
                        //品牌
                        that.brandHotItem = data.data.brand.hot;
                        var brandAll = data.data.brand.all;
                        that.brandAllItem = pySort(brandAll);
                        //能力
                        that.abilityItemOne = data.data.ability.slice(0,9);
                        that.abilityItemTwo = data.data.ability.slice(9,18),
                        that.abilityItemThree = data.data.ability.slice(18,27),
                        that.abilityItemFour = data.data.ability.slice(27,31),
                        //类型
                        that.toyTypeItemOne = data.data.toyType.slice(0,9);
                        that.toyTypeItemTwo = data.data.toyType.slice(9,18),
                        that.toyTypeItemThree = data.data.toyType.slice(18,27),
                        //筛选
                        that.toySortItem = data.data.toySort;
                        that.toySizeItem = data.data.toySize;
                        that.toyOtherRentType = data.data.toyOther[0];
                        that.toyOtherStockNum = data.data.toyOther[1];  
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
            

		},
		destoryed: function(){
			
		},
		data: function(){
            
			return {
//			    tabsIsIndex: 1,
				tabsIsDock: false,
				ageIsShow : false,
				brandIsShow : false,
				abilityIsShow : false,
				typeIsShow : false,
				screenIsShow : false,
				
				commonLastToyId : -1,
				//	是否为新用户
				userIsNew: false,
				
				//	幻灯片选项卡
				bannerItems: [],
				
				//玩具列表
				toysListItem: [],
				LoadState : false,
				//  导航栏
				navigationItems : navigations,
				
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
			};
		},
		methods: {
		    
		    //添加到购物车
		    addCart : function(e, toyId) {
		        indexAPI.cartAdd(
                    {
                        tid : toyId
                    },
                    function (data) {
                        if (data.code == 0) {
                            Toast.show('玩具成功加入购物车');
                        } else {
                            Toast.show(data.msg);
                        }
                    }
                );
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
                }
                console.log(this.rentSelectedData)
            },
                
            //有货选中
            stockSelected : function() {
                this.stockState = !this.stockState;
                if(this.stockState){
                    this.stockSelectedData = this.toyOtherStockNum.stockNum;
                }else {
                    this.stockSelectedData = 0;
                }
                console.log(this.stockSelectedData)
            },
 
            goToToyDetail: function(e, toyId){
                this.$router.push('/index/detail?toyid=' + toyId);
            },

            goToMine : function(){
                this.$router.push('/mine');
            },
            goToCart : function(){
                this.$router.push('/index/cart');
            },
            goToLocation : function() {
                this.$router.push('/index/location');
            },
            goToSearch : function() {
                this.$router.push('/index/search');
            },

		    //tab显示与隐藏
		    navShow : function (){
		        this.tabsIsDock = !this.tabsIsDock;
//		        document.body.scrollTop = 161;
		    },
		    goToToy : function(){
                this.tabsIsDock = false;
            },
            //筛选的切换
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
			recommendReset: function(){
				
				this.$router.push('/mine/reset');
			},
			morecommendAll: function(){
				
				document.body.scrollTop = 0;
				this.$router.push('/index/result');
			},
			
            tabsScroll: function( e, docked ){

                var tabsDock = document.querySelector('.nav .dock');
                if (docked == true && tabsDock.style.display !== 'block'){
                    tabsDock.style.display = 'block';
                }
                if (docked == false && tabsDock.style.display !== 'none'){
                    tabsDock.style.display = 'none';
                }   
                if (docked == true && this.tabsIsDock !== true ){
                    this.tabsIsDock = true;
                }   
                if (docked == false && this.tabsIsDock !== false ){
                    this.tabsIsDock = false;
                }
            },
            screenConfirm: function(){
                var self = this;
                self.commonLastToyId = -1;
                self.toysListItem = [];
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
                indexAPI.toyList(
                    {
                        name : "",
                        q : self.screenJSON,
                        rt : 2,
                        sk : 1,
                        tid : self.commonLastToyId
                    },
                    function (data) {
                        if (data.code == 0) {
                            if(data.data.isEnd==false) {
                                self.LoadState = true;
                            }else {
                                self.LoadState = false;
                            };
                            if (data.data.toys.length > 0) {
                                self.commonLastToyId = data.data.toys.slice(-1)[0].toyId;
                            } else {
                                self.commonLastToyId = -1;
                            };
                            var toysLoad = data.data.toys;
                            toysLoad.forEach(function(toys,index){  
                                self.toysListItem.push(toys);
                               
                            });

                        } else {
                            Toast.show(data.msg);
                        }
                        
                    }
                );
            },
            screenReset : function() {
                this.ageSelectedData = [];
                this.brandSelectedData = [];
                this.abilitySelectedData = [];
                this.typeSelectedData = [];
                this.sortSelectedData = 0;
                this.sizeSelectedData = [];
                this.rentSelectedData = 2;
                this.tockSelectedData = 0;
                this.stockState = false;
                this.rentState = false;
            },
            
		},
		components: {
			'tm-slide': Slide
		}
	}
})();

export default _default;