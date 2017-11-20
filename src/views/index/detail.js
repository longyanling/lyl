'use strict';
import Vue from 'vue';
import Axios from 'axios';
import Slide from '@/components/slide.vue'

var _default = (function(){
	
	var slides = [
		{ url: 'https://ts.zlimg.com/t/10120600016/h1.jpg' },
		{ url: 'https://ts.zlimg.com/t/10120600016/h2.jpg' }
	]; 
	 
	return {
		name: 'toy-detail', 
		mounted: function(){
			var self = this;
        
            Axios.get('/toy/info', {
                params : {
                    tid : 10369990048 ,
                }
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    self.detailItem = data.data;
//                  self.slideItems = data.data.headers;
                    self.toyAbilityItem = data.data.intro[0];
                    self.toyFeatureItem = data.data.intro[1];
                    self.toyShowItem = data.data.intro[2];
                    self.toyDetailsItem = data.data.intro[3];
                    self.toysItem = data.data.toys;
                } else {
                    console.log(results);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},
		destoryed: function(){
			
		},
		data: function(){
			
			return {
			    detailItem : [],
			    toyAbilityItem : [],
			    toyFeatureItem : [],
				slideItems : slides,
				toyShowItem : [],
				toyDetailsItem : [],
				tabsIsDock : false,
				toyDetail : [],
				toysItem : [],
			};
		},
		methods: {
		    addCart : function (e) {
		        alert('您的商品已经加入购物车');
		    },
		    goToConfirm : function (e,toyId) {
		        
		        this.$router.push('/mine/order/confirm');
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