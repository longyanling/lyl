'use strict';

import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import Slide from '@/components/slide.vue'
import Modal from '@/components/modal.vue';
import Guide from '@/components/guide.vue';
import Shortcut from '@/components/shortcut.vue'
import API from "@/services/api";

var _default = (function(){
	
	var baseQ = { "ageRange": "", "toySort" : 0, "toyType": "", "brand": "", "ability": "", "toySize": "", "stockNum": 0, "rentType": 0 };
	
	var makeQ = function(data){
		
		for (var key in data){
			data[key] = data[key] || _q[key]; 
		}
		return JSON.stringify(data);
	};
	
	var makeToy = function(data, index){
		
		if (data.data.toys && data.data.toys.length > index) {
			data.data.toys[index] = data.data.toys[index] || {};
			data.data.toys[index].image = (data.data.toys[index].image || '').replace('h1.jpg','h0.png');
			return data.data.toys[index] || {};
		}
		return {};
	};
	
	var homeLoad = function(vm){
	
        API.Index.homeList({
                
        },function(data) {
        	
        	if(data.code == 0){
        		vm.bannerItems = data.data[0].banner;
        		for (var i = 0; i<vm.bannerItems.length;i++){
        			vm.bannerItems[i]['src'] = vm.bannerItems[i]['bannerImage'] ;
        		};
        		vm.recommendItems = data.data[2];
        		vm.hotItems = data.data[4];
        		vm.loadingShow = false;
        		
        	}else {
        		Toast.show(data.msg);
            }
        });
	};
	
	var legoLoad = function(vm){
		
        API.Index.toyList( 
            {
                q : makeQ( { "brand": "35", "rentType": 2 } ),
                name : "",
                rt : 2,
                sk : 0,
                tid : -1,
            }, function (data) {
            	
                if (data.code == 0) {
                    vm.legoItems = [makeToy(data, 0), makeToy(data, 1), makeToy(data, 2) , makeToy(data, 3),makeToy(data, 4),makeToy(data, 5)];
                    vm.legoLoadsing = true;
                } else {
                    Toast.show(data.msg);
                }
            });
	};
	
	var toyLoad = function(vm){
		
		vm.toyLoading = true;
        API.Index.toyList(
            {
                name : "",
                q : "",
                rt : 2,
                sk : 0,
                tid : vm.toyLastId,
            },
            function (data) {
            	
                if (data.code == 0) {
                	vm.toyIsEnd = data.data.isEnd;
                	vm.toyLastId = (data.data.toys.length > 0 ? (data.data.toys.slice(-1)[0] || {}).toyId : -1);
                	vm.toyItems = vm.toyItems.concat( data.data.toys  || [] );
                } else {
                    Toast.show(data.msg);
                }
				vm.toyLoading = false;
            }
        );
	};
	
	return {
		name: 'home-index',
		mounted: function(){
		    var personal = document.getElementById("personal").getBoundingClientRect().left;
		    var banner = document.getElementById("componentSlide");
		    var bannerWidth = banner.getBoundingClientRect().width;
		    var bannerHeight = banner.style.height = (160/375) * bannerWidth;
		    Store.Index.noviceGuideCoordinatee = {x : personal, y : bannerHeight};
		    
            var visited = Utils.Cookie.getCookie("visited");
            var activityed = Utils.Cookie.getCookie("activityed");
            
            this.loadingShow = true;
            this.locationInfo = Store.Index.cityName ? Store.Index.cityName : '北京';
        
            homeLoad (this);
            legoLoad(this);
            toyLoad (this);
            
            if (activityed != 'true'){
            	this.$router.push('/index/activity');
                Utils.Cookie.setCookie("activityed", "true", 30);
            } else {
	            if (visited != 'true'){
	            	this.$refs.guide.show(true);
                	Utils.Cookie.setCookie("visited", "true", 30);
	            } else {
//          		console.log('都看过了');
	            }
            }
		},
		data: function(){
            
			return {
			    loadingShow: true,
                locationInfo: null,
				bannerItems: [],
				navigationItems : [{'text': '年龄'},{'text': '品牌'},{'text': '能力'},{'text': '类型'},{'text': '筛选'}],
				legoItems: [],
				recommendItems : [],
				hotItems : [],
				toyItems: [],
				toyLastId: -1,
				toyIsEnd: false,
				toyLoading: false,
				brandid: ""
			};
		},
		methods: {
			showToyExists: function (){
			    
			    this.$refs.modal.show('您购物车中已经有该玩具了，快去下单吧!', '看看别的', '去下单');
			},
		    //添加到购物车
		    addCart : function(e, toyId) {

		    	this.$refs.carts.addToy(toyId);
		    	_hmt.push(["_trackEvent", "link", "click", "首页-加入购物车"]);
		    },
		    loadMore: function(e){
		    	
		    	!this.toyLoading && toyLoad(this);
		    },

            goToToyDetail: function(e, toyId){
            	
                this.$router.push('/index/detail?toyid=' + toyId);
                _hmt.push(["_trackEvent", "link", "click", "首页-进入详情页"]);
            },

            goToMine : function(){
            	
                this.$router.push('/mine');
                _hmt.push(["_trackEvent", "link", "click", "首页-进入个人中心"]);
            },
            goToCart : function(){
            	
                this.$router.push('/index/cart');
                _hmt.push(["_trackEvent", "link", "click", "首页-进入购物车"]);
            },
            goToLocation : function() {
            	
                this.$router.push('/index/location');
                _hmt.push(["_trackEvent", "link", "click", "首页-进入城市定位"]);
            },
            goToSearch : function() {
            	
                this.$router.push('/index/search');
                _hmt.push(["_trackEvent", "link", "click", "首页-进入搜索页"]);
            },
            goScreen : function(e , brandid) {
            	
                this.$router.push('/index/screen?brandid=' + brandid);
                _hmt.push(["_trackEvent", "link", "click", "首页-进入筛选页"]);
            },
            goActivity :function(){

                this.$router.push('/index/activity');
            }
		},
		components: {
			'tm-slide': Slide,
			'tm-shortcut': Shortcut,
			'tm-modal': Modal,
			'tm-guide': Guide
		}
	}
})();

export default _default;