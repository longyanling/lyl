'use strict';

import API from "@/services/api";
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import Shortcut from '@/components/shortcut.vue'
import Slide from '@/components/slide.vue';

var _default = (function(){
	return {
		name: 'Detail', 
		mounted: function(){
		    
			var self = this;
			
            API.Index.toyDetail(
                {
                    tid : self.$route.query.toyid
                },function (data) {
                    if (data.code == 0) {
                        self.detailItem = data.data;
                        self.slideItems = data.data.headers;
                        for (var i = 0; i<self.slideItems.length;i++){
                            self.slideItems[i]['src'] =self.slideItems[i]['image'] ;
                        };
                        self.toyAbilityItem = data.data.intro[0];
                        self.toyFeatureItem = data.data.intro[1];
                        self.toyShowItem = data.data.intro[2];
                        self.toyDetailsItem = data.data.intro[3];
                        self.toyItems = data.data.toys;
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
			    detailItem : [],
			    toyAbilityItem : [],
			    toyFeatureItem : [],
				slideItems : [],
				toyShowItem : [],
				toyDetailsItem : [],
				tabsIsDock : false,
				toyDetail : [],
				toyItems : [],
			};
		},
		methods: {
		    goCart : function () {
		        this.$router.push( '/index/detail/cart');
		    },
		    addCart : function (e, toyId) {
		        
		        toyId = (toyId == undefined ? this.detailItem.toyId : toyId);
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
		        
		        var that = this;
		        that.detailItem = [];
                that.toyAbilityItem = [];
                that.toyFeatureItem = [];
                that.slideItems = [];
                that.toyShowItem = [];
                that.toyDetailsItem = [];
                API.Index.toyDetail(
                    {
                        tid : toyId ,
                    },
                    function (data) {
                        if (data.code == 0) {
                            that.detailItem = data.data;
                            that.slideItems = data.data.headers;
                            for (var i = 0; i<that.slideItems.length;i++){
                                that.slideItems[i]['src'] =that.slideItems[i]['image'] ;
                            };
                            that.toyAbilityItem = data.data.intro[0];
                            that.toyFeatureItem = data.data.intro[1];
                            that.toyShowItem = data.data.intro[2];
                            that.toyDetailsItem = data.data.intro[3];
                            that.toyItems = data.data.toys;
                        } else {
                            Toast.show(data.msg);
                        }
                    }
                );
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
			'tm-shortcut': Shortcut
		}
	}
})();

export default _default;