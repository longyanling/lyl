'use strict';

import API from "@/services/api";
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import Modal from '@/components/modal.vue';
import Shortcut from '@/components/shortcut.vue'
import Slide from '@/components/slide.vue';

var _default = (function(){
	
	var getDetail = function(vm, toyId){
	
		vm.toyId = toyId;
		vm.backUrl = '/index/detail?toyid=' + toyId;
		
        API.Index.toyDetail(
            {
                tid : vm.toyId
            }, function (data) {
            	
                if (data.code == 0) {
                    vm.detailItem = data.data;
                    vm.slideItems = data.data.headers;
                    for (var i = 0; i<vm.slideItems.length;i++){
                        vm.slideItems[i]['src'] =vm.slideItems[i]['image'] ;
                    };
                    vm.toyAbilityItem = data.data.intro[0];
                    vm.toyFeatureItem = data.data.intro[1];
                    vm.toyShowItem = data.data.intro[2];
                    vm.toyDetailsItem = data.data.intro[3];
                    vm.toyItems = data.data.toys;
                    vm.loadingState = false;
                } else {
                    Toast.show(data.msg);
                }
            }
        );
	};
	
	return {
		name: 'Detail', 
		mounted: function(){
		    this.loadingState = true;
			getDetail(this, this.$route.query.toyid);
		},
		updated: function(){
			
			if (this.$route.query.toyid != this.toyId){
				
				getDetail(this, this.$route.query.toyid);
			}
		},
		data: function(){
			
			return {
			    loadingState: true,
			    detailItem : [],
			    toyId: 0,
			    toyAbilityItem : [],
			    toyFeatureItem : [],
				slideItems : [],
				toyShowItem : [],
				toyDetailsItem : [],
				tabsIsDock : false,
				toyDetail : [],
				toyItems : [],
				backUrl: '',
				cartUrl: '/index/detail/cart'
			};
		},
		methods: {
		    showToyExists: function (){
                
                this.$refs.modal.show('您购物车中已经有该玩具了，快去下单吧!', '看看别的', '去下单');
            },
		    addCart : function (e, toyId, isDetail) {
		        
		    	this.$refs.carts.addToy(toyId, isDetail);
		    },
		    goToToyDetail: function(e, toyId){
		        
                this.$router.push('/index/detail?toyid=' + toyId);
            },
            goToCart : function(){
                
                this.$router.push('/index/detail/cart');
            },
		    goToConfirm : function ( ) {
		    	
                var toys = new Array();
                
                toys.push(this.detailItem);
                Store.Index.orderToys = [];
		        Store.Index.orderToys = toys;
		        
		        this.$router.push('/index/confirm');
		    },
			tabsScroll: function( e, docked ){
				
				var tabsDock = document.querySelector('.tabs .dock');
				
				if (docked == true && tabsDock.style.display !== 'block'){
					tabsDock.style.display = 'block';
				}
				if (docked == false && tabsDock.style.display !== 'none'){
					tabsDock.style.display = 'none';
				}	
//				if (docked == true && this.tabsIsDock !== true ){
//					this.tabsIsDock = true;
//				}	
//				if (docked == false && this.tabsIsDock !== false ){
//					this.tabsIsDock = false;
//				}
			}
		},
		components: {
			'tm-slide': Slide,
			'tm-shortcut': Shortcut,
			'tm-modal': Modal
		}
	}
})();

export default _default;