'use strict';

import Toast from '@/directives/toast';
import Store from "@/directives/store";
import Shortcut from '@/components/shortcut.vue';
import Modal from '@/components/modal.vue';
import API from "@/services/api";

var _default = (function(){
	
	var loadToyList = function(vm){
	    
        API.Index.toyList(
            {
                name : vm.keyword,
                q : vm.toyParams,
                rt : 2,
                sk : 0,
                tid : vm.toyLastId,
            },
            function (data) {
            
                if (data.code == 0) {
                    vm.toyIsEnd = data.data.isEnd;
                    vm.toyLastId = (data.data.toys.length > 0 ? data.data.toys.slice(-1)[0].toyId : -1);
                    vm.toyItems = vm.toyItems.concat(data.data.toys || []);
                    vm.loadingState = false;
                } else {
                    Toast.show(data.msg);
                }
            }
        ); 
	};
	
	return {
		name: 'search', 
		mounted: function(){
			
			var vm = this;
			vm.loadingState = true;
			vm.backUrl = '/index/search';
			vm.keyword = this.$route.query.keyword || '';
			vm.tagHistoryItems = (Store.Index.searchTagHistory || []).slice();

			API.Index.searchhot({
			    
			},function(data){
			    
			    vm.tagHotItems = data.hotSearchWords;
			});
			
            window.addEventListener('scroll',function(){
			     
                //  判断是否滚动到底部 
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight && 
                    !vm.toyIsEnd) {
                    loadToyList(vm);
                }
            });
            
            vm.keyword && this.submit();
		},
		data: function(){
			
			return {
			    loadingState: true,
			    wordText: null,
                tagHistoryItems: [],
                tagHotItems: null,
                tagVisible: true,
			    toyItems: [],
			    toyLastId: -1,
                toyIsEnd : false,
				toyParams : null,
				backUrl: '',
                cartUrl: '/index/search/cart'
			};
		},
		methods: {
		    showToyExists: function (){
                
                this.$refs.modal.show('您购物车中已经有该玩具了，快去下单吧!', '看看别的', '去下单');
            },
            goToCart: function(){
                
                this.$router.push('/index/search/cart');
                _hmt.push(["_trackEvent", "link", "click", "搜索-进入购物车"]);
            },
			tagDisplay: function(){
				
				this.tagVisible = true;
			},
			goToToyDetail: function(e, toyId){
			    
                this.$router.push('/index/detail?toyid=' + toyId);
                _hmt.push(["_trackEvent", "link", "click", "搜索-进入详情页"]);
            },
			addCart : function(e, toyId) {
			    
		    	this.$refs.carts.addToy(toyId);
		    	_hmt.push(["_trackEvent", "link", "click", "搜索-加入购物车"]);
            },
            tagChange: function( e, tag ){
                
                var vm = this;
                var index = -1;
                
                vm.keyword = tag;
                
                for(var i= 0; i < vm.tagHistoryItems.length ; i++){
                    if(vm.tagHistoryItems[i] == vm.keyword){
                        index = i;
                    }
                };
                
                (index > -1) && vm.tagHistoryItems.splice(index, 1);
                
                Store.Index.searchTagHistorySet(tag);
                
                vm.tagHistoryItems.unshift(tag);
                vm.submit();
            },
			submit: function(){
			    
			    var vm = this;
			    vm.loadingState = true;
			    
			    vm.toyParams = JSON.stringify({
                    "ageRange": "", 
                    "toySort" : 0,
                    "toyType": "",
                    "brand": "",
                    "ability": "",
                    "toySize": "",
                    "stockNum": 0,
                    "rentType": 2
                    });
			    
                vm.tagVisible = false;
                vm.toyItems = [];
			    vm.toyLastId = -1;
			    
			    document.getElementById('keyword').blur();
			    _hmt.push(["_trackEvent", "link", "click", "搜索-搜索玩具"]);
			    
			    loadToyList(vm);
			    return false;
			}
		},
        components: {
            'tm-shortcut': Shortcut,
            'tm-modal': Modal
        }
	}
})();

export default _default;
