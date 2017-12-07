'use strict';

import Toast from '@/directives/toast';
import Slide from '@/components/slide.vue'
import Shortcut from '@/components/shortcut.vue'
import API from "@/services/api";

var _default = (function(){
	
	var navigations = [{'text': '年龄'},{'text': '品牌'},{'text': '能力'},{'text': '类型'},{'text': '筛选'}];
	return {
		name: 'home-index',
		mounted: function(){
		    
            var vm = this;

            API.Index.banner({
                    
            },function(data) {
                    if(data.code == 0){
                        vm.bannerItems = data.data;
                        for (var i = 0; i<vm.bannerItems.length;i++){
                            vm.bannerItems[i]['src'] = vm.bannerItems[i]['bannerImage'] ;
                        };
                    }else {
                       Toast.show(data.msg) 
                    }
                }
            );
            
            API.Index.toyList(
                {
                    name : "",
                    q : vm.screenJSON,
                    rt : 2,
                    sk : 1,
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
                            vm.toysListItem.push(toys);  
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
                            sk : 1,
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
                                    vm.toysListItem.push(toys); 
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
				toysListItem: [],
				LoadState : false,
				navigationItems : navigations,
                screenJSON : null,
			};
		},
		methods: {
		    
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