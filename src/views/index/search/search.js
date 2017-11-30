'use strict';
import Search from '@/components/search.vue'

var _default = (function(){
	
	var historys = [
		'小泰克', '遥控车', '积木'
	];
	var hots = [
		'蒙奇奇', '户外摇椅', '乐高积木', '百变金刚', '四驱兄弟' 
	];
	
	return {
		name: 'toy-search', 
		mounted: function(){
			
			this.searchKeyword = this.$route.query.keyword;
		},
		destoryed: function(){
			
		},
		data: function(){
			
			return {
				searchKeyword: '小火车',
				searchIsExpand: false,
				historyItems: historys,
				hotItems: hots
			};
		},
		methods: {
			searchActive: function(){
				
				this.$router.replace('/toy/result');
			},
			searchSubmit: function(){
				
				this.$router.replace('/toy/result?keyword=' + (this.searchKeyword || '') );
			},
			tagChange: function( e, tag ){
				
				console.log( tag );
				this.$router.replace('/toy/result?keyword=' + (tag || '') );
			}
		},
		components: {
			'tm-search': Search
		}
	}
})();

export default _default;
