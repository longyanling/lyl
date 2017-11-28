'use strict';
import Vue from 'vue';
import Toast from '@/directives/toast';
import indexAPI from "@/services/index-service";
import Slide from '@/components/slide.vue'

var _default = (function(){
	return {
		name: 'toy-detail', 
		mounted: function(){
			var self = this;
        
            console.log(self.$route.query.toyid);
            indexAPI.toyDetail(
                {
                    tid : self.$route.query.toyid ,
                },
                function (data) {
                    if (data.code == 0) {
                        self.detailItem = data.data;
                        self.slideItems = data.data.headers;
                        for (var i = 0; i<self.slideItems.length;i++){
                            self.slideItems[i]['src'] =self.slideItems[i]['image'] ;
                        }
                        console.log(self.slideItems)
                        self.toyAbilityItem = data.data.intro[0];
                        self.toyFeatureItem = data.data.intro[1];
                        self.toyShowItem = data.data.intro[2];
                        self.toyDetailsItem = data.data.intro[3];
                        self.toysItem = data.data.toys;
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
				toysItem : [],
			};
		},
		methods: {
		    addCart : function (e, toyId) {
		        toyId = (toyId == undefined ? this.detailItem.toyId : toyId);
		        console.log(toyId)
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
		    goToToyDetail: function(e, toyId){
		        var that = this;
		        that.detailItem = [];
                that.toyAbilityItem = [];
                that.toyFeatureItem = [];
                that.slideItems = [];
                that.toyShowItem = [];
                that.toyDetailsItem = [];
		        console.log(toyId)
                indexAPI.toyDetail(
                    {
                        tid : toyId ,
                    },
                    function (data) {
                        if (data.code == 0) {
                            that.detailItem = data.data;
                            that.slideItems = data.data.headers;
                            for (var i = 0; i<that.slideItems.length;i++){
                                that.slideItems[i]['src'] =that.slideItems[i]['image'] ;
                            }
                            console.log(that.slideItems)
                            that.toyAbilityItem = data.data.intro[0];
                            that.toyFeatureItem = data.data.intro[1];
                            that.toyShowItem = data.data.intro[2];
                            that.toyDetailsItem = data.data.intro[3];
                            that.toysItem = data.data.toys;
                        } else {
                            Toast.show(data.msg);
                        }
                    }
                );
            },
		    goToConfirm : function (e,toyId) {
		        
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
			'tm-slide': Slide
		}
	}
})();

export default _default;