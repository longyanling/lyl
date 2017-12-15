'use strict';

import Toast from '@/directives/toast';
import Store from '@/directives/store';
import Affirm from '@/directives/affirm';
import Slide from '@/components/slide.vue'
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
        		vm.recommendItems = data.data[2].toyList;
        		vm.hotItems = data.data[4].toyList;
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
                    vm.legoBest = makeToy(data, 0);
                    vm.legoNext = makeToy(data, 1);
                    vm.legoThird = [makeToy(data, 2) , makeToy(data, 3)];
                } else {
                    Toast.show(data.msg);
                }
            });
	};
	
	var toyLoad = function(vm){
		
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
            }
        );
	};
	
	return {
		name: 'home-index',
		mounted: function(){
			
            this.locationInfo = this.$route.query.location ? this.$route.query.location : '北京';

			homeLoad (this);
			legoLoad(this);
			toyLoad (this);
		},
		data: function(){
            
			return {
                locationInfo : null,
				bannerItems: [],
				navigationItems : [{'text': '年龄'},{'text': '品牌'},{'text': '能力'},{'text': '类型'},{'text': '筛选'}],
				legoBest: {},
				legoNext: {}, 
				legoThird: [],
				recommendItems : [],
				hotItems : [],
				toyItems: [],
				toyLastId: -1,
				toyIsEnd: false
			};
		},
		methods: {
			
		    //添加到购物车
		    addCart : function(e, toyId) {

		    	this.$refs.carts.addToy(toyId);
		    },
		    
		    goToLego :function(){
		    	
		    	this.$router.push('/screen/screen?brandid=35');
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