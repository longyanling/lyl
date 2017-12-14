'use strict';

import Toast from '@/directives/toast';
import Affirm from '@/directives/affirm';
import Slide from '@/components/slide.vue'
import Shortcut from '@/components/shortcut.vue'
import API from "@/services/api";

var _default = (function(){
	
	var navigations = [{'text': '年龄'},{'text': '品牌'},{'text': '能力'},{'text': '类型'},{'text': '筛选'}];
	return {
		name: 'home-index',
		mounted: function(){
		    
            var vm = this;
            vm.locationItem = this.$route.query.location ? this.$route.query.location : '北京';

            API.Index.homeList({
                    
            },function(data) {
                    if(data.code == 0){
                        vm.bannerItems = data.data[0].banner;
                        for (var i = 0; i<vm.bannerItems.length;i++){
                            vm.bannerItems[i]['src'] = vm.bannerItems[i]['bannerImage'] ;
                        };
                        vm.toyRecommendItems = data.data[2].toyList;
                        vm.toyHotItems = data.data[4].toyList;
                    }else {
                       Toast.show(data.msg) 
                    }
                }
            );
            API.Index.toyList(
                {
                    name : "",
                    q : JSON.stringify({
                        "ageRange": "", 
                        "toySort" : 0,
                        "toyType": "",
                        "brand": "35",
                        "ability": "",
                        "toySize": "",
                        "stockNum": 0,
                        "rentType": 2
                    }),
                    rt : 2,
                    sk : 0,
                    tid : -1,
                },
                function (data) {
                    if (data.code == 0) {
                        vm.toyLegoFirst = (data.data.toys && data.data.toys.length > 0 ? data.data.toys[0] : {});
                        vm.toyLegoFirst.image = (vm.toyLegoFirst.image || '').replace('h1.jpg','h0.png'); 
                        vm.toyLegoSecond = (data.data.toys && data.data.toys.length > 0 ? data.data.toys[1] : {});
                        vm.toyLegoSecond.image = (vm.toyLegoSecond.image || '').replace('h1.jpg','h0.png');
                        vm.toyLegoThird = (data.data.toys && data.data.toys.length > 0 ? data.data.toys[2] : {});
                        vm.toyLegoThird.image = (vm.toyLegoThird.image || '').replace('h1.jpg','h0.png');
                        vm.toyLegoFourth =(data.data.toys && data.data.toys.length > 0 ? data.data.toys[3] : {});
                        vm.toyLegoFourth.image = (vm.toyLegoFourth.image || '').replace('h1.jpg','h0.png');
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
            
            API.Index.toyList(
                {
                    name : "",
                    q : vm.screenJSON,
                    rt : 2,
                    sk : 0,
                    tid : vm.commonLastToyId,
                },
                function (data) {
                    if (data.code == 0) {
                        if(data.data.isEnd==false) {
                            vm.LoadState = true;
                        }else {
                            vm.LoadState = false;
                        };
                        if (data.data.toys.length > 0) {
                            vm.commonLastToyId = data.data.toys.slice(-1)[0].toyId;
                        } else {
                            vm.commonLastToyId = -1;
                        };
                        var toyInit = data.data.toys;
                        toyInit.forEach(function(toys,index){  
                            vm.toyListItems.push(toys);  
                        });
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
            
            //滑动到玩具列表底部加载玩具列表
            window.addEventListener('scroll',function(){
                // 判断是否滚动到底部  
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && vm.LoadState) {
                    API.Index.toyList(
                        {
                            name : "",
                            q : vm.screenJSON,
                            rt : 2,
                            sk : 0,
                            tid : vm.commonLastToyId,
                        },
                        function (data) {
                            if (data.code == 0) {
                                if(data.data.isEnd==false) {
                                    vm.LoadState = true;
                                }else {
                                    vm.LoadState = false;
                                };
                                if (data.data.toys.length > 0) {
                                    vm.commonLastToyId = data.data.toys.slice(-1)[0].toyId;
                                } else {
                                    vm.commonLastToyId = -1;
                                };
                                var toyLoad = data.data.toys;
                                toyLoad.forEach(function(toys,index){  
                                    vm.toyListItems.push(toys); 
                                });
                            } else {
                                Toast.show(data.msg);
                            }
                            
                        }
                    ); 
                }
            });
		},
		data: function(){
            
			return {
				commonLastToyId : -1,
				bannerItems: [],
				toyHotItems : [],
				toyRecommendItems : [],
				toyLegoFirst: {},
				toyLegoSecond: {},
				toyLegoThird: {},
				toyLegoFourth: {},
				toyListItems: [],
				LoadState : false,
				navigationItems : navigations,
                screenJSON : null,
                locationItem : null
			};
		},
		methods: {
		    
		    aaaa :function(){
		        Affirm.show('您确定要删除改地址吗');
		    },
		    
		    //添加到购物车
		    addCart : function(e, toyId) {
		        API.Index.cartAdd(
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
            goScreen : function() {
                this.$router.push('/index/screen');
            }
		},
		components: {
			'tm-slide': Slide,
			'tm-shortcut': Shortcut
		}
	}
})();

export default _default;