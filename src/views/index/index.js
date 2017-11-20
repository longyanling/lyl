'use strict';
import Axios from 'axios';
import Slide from '@/components/slide.vue'
import Sort from "@/directives/sort";

var _default = (function(){
	
	var navigations = [
        {
            'name':'age',
            'text': '年龄',
            'url': '',
        },
        {
            'name':'brand',
            'text': '品牌',
            'url': '',
        },
        {
            'name':'ability',
            'text': '能力',
            'url': '',
        },          
        {
            'name':'type',
            'text': '类型',
            'url': '',
        },
        {
            'name':'screen',
            'text': '筛选',
            'url': '',
        }
    ];
	
	
	var banners = [
		{ url: 'https://ts.zlimg.com/b/20161228.png' },
		{ url: 'https://ts.zlimg.com/b/20170714102144.png' },
		{ url: 'https://ts.zlimg.com/b/20161228.png' }
	];

	var sameages = [
		{
			title: 'Hape 旋律敲琴台',
			image: 'https://ts.zlimg.com/t/10249990002/h0.png!588',
			price: '2.7',
			tags: '可邮寄'
		},
		{
			title: 'B.Toys换了摇滚宠物亦庄',
			image: 'https://ts.zlimg.com/t/10240720011/h0.png!588',
			price: '6',
			tags: ''
		},
		{
			title: '伟易达霹雳架子鼓',
			image: 'https://ts.zlimg.com/t/10360720001/h0.png!588',
			price: '3.3',
			tags: '可邮寄'
		},
		{
			title: '奇智奇思动感音乐蛋糕',
			image: 'https://ts.zlimg.com/t/10069990018/h0.png!588',
			price: '3.4',
			tags: '可邮寄'
		},
		{
			title: 'Hape 旋律敲琴台',    
			image: 'https://ts.zlimg.com/t/10249990002/h0.png!588',
			price: '2.7',
			tags: '可邮寄'
		},
		{
			title: 'B.Toys树莓红印第安儿童',
			image: 'https://ts.zlimg.com/t/10360960003/h0.png!588',
			price: '8',
			tags: '可邮寄'
		},
		{
            title: 'Hape 旋律敲琴台',
            image: 'https://ts.zlimg.com/t/10249990002/h0.png!588',
            price: '2.7',
            tags: '可邮寄'
        },
        {
            title: 'Hape 旋律敲琴台',    
            image: 'https://ts.zlimg.com/t/10249990002/h0.png!588',
            price: '2.7',
            tags: '可邮寄'
        }
	];
   
	
	return {
		name: 'home-index',
		mounted: function(){
            var that = this;
            
            //排序
            function pySort(arr,empty){
                var $this = this;
                if(!String.prototype.localeCompare)return null;
                var letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
                var zh ="啊把差大额发噶哈*级卡啦吗那哦爬器然撒他**哇西呀咋".split('');
                var result = [];
                var curr;
                for( var i = 0;i < letters.length ; i++ ){
                    curr = {letter: letters[i], data:[]};
                    if(i!=26){
                        for(var j = 0;j <arr.length;j++){
                            var initial = Sort(arr[j].brandName.charAt(0));
                            if(initial == letters[i] || initial == letters[i].toLowerCase()){
                                curr.data.push(arr[j]);
                            }
                        }
                    }
                    if(empty || curr.data.length) {
                        result.push(curr);
                        curr.data.sort(function(a,b){
                            return b.brandName.localeCompare(a);
                        });
                    }
                }
                return result;
            };
        
        
        //请求接口：
        //玩具列表接口
             Axios.get('/toy/list', {
//              params : {
//                 
//              }
            })
            .then(function (response) {
                var data = response.data;
                console.log(data);
                if (data.code == 0) {
                    that.toysListItem = data.data.toys;
                    console.log(data.data.toys)
                     
                } else {
                    console.log(results);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        
        //筛选接口
            Axios.get('/search/filter/list/v3', {
//              params : {
//                 
//              }
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    //年龄
                    that.ageItem = data.data.ageRange;
                    //品牌
                    that.brandHotItem = data.data.brand.hot;
                    var brandAll = data.data.brand.all;
                    that.brandAllItem = pySort(brandAll);
                    //能力
                    that.abilityItemOne = data.data.ability.slice(0,9);
                    that.abilityItemTwo = data.data.ability.slice(9,18),
                    that.abilityItemThree = data.data.ability.slice(18,27),
                    that.abilityItemFour = data.data.ability.slice(27,31),
                    //类型
                    that.toyTypeItemOne = data.data.toyType.slice(0,9);
                    that.toyTypeItemTwo = data.data.toyType.slice(9,18),
                    that.toyTypeItemThree = data.data.toyType.slice(18,27),
                    //筛选
                    that.toySortItem = data.data.toySort;
                    that.toySizeItem = data.data.toySize;
                    that.toyOtherRentType = data.data.toyOther[0];
                    that.toyOtherStockNum = data.data.toyOther[1];  
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
//			    tabsIsIndex: 1,
				tabsIsDock: false,
				ageIsShow : false,
				brandIsShow : false,
				abilityIsShow : false,
				typeIsShow : false,
				screenIsShow : false,
				
				//	是否为新用户
				userIsNew: false,
				
				//	幻灯片选项卡
				bannerItems: banners,
				
				//玩具列表
				toysListItem: [],
				
				//  导航栏
				navigationItems : navigations,
				
				//年龄
				ageItem : [],
				//品牌
				brandHotItem : [],
				brandAllItem : [],
				//能力
				abilityItemOne : [],
				abilityItemTwo : [],
				abilityItemThree : [],
				abilityItemFour : [],
				//类型
				toyTypeItemOne : [],
				toyTypeItemTwo : [],
				toyTypeItemThree : [],
				//排序
				toySortItem : [],
				//大小
				toySizeItem : [],
				//其他
				toyOtherRentType : [],
				toyOtherStockNum : [],
				
			};
		},
		methods: {
		    navShow : function (){
		        this.tabsIsDock = true;
                document.body.scrollTop = 161;
                
		    },
		    goToToy : function(){
                this.tabsIsDock = false;
            },
		    ageShow: function (){
                this.ageIsShow = !this.ageIsShow;
                this.brandIsShow = false;
                this.abilityIsShow = false;
                this.typeIsShow = false;
                this.screenIsShow = false;
            },
            brandShow: function (){
                this.brandIsShow = !this.brandIsShow;
                this.ageIsShow = false;
                this.abilityIsShow = false;
                this.typeIsShow = false;
                this.screenIsShow = false;
            },
            abilityShow: function (){
                this.abilityIsShow = !this.abilityIsShow;
                this.ageIsShow = false;
                this.brandIsShow = false;
                this.typeIsShow = false;
                this.screenIsShow = false;
            },
            typeShow: function (){
                this.typeIsShow = !this.typeIsShow;
                this.ageIsShow = false;
                this.brandIsShow = false;
                this.abilityIsShow = false;
                this.screenIsShow = false;
            },
            screenShow: function (){
                this.screenIsShow = !this.screenIsShow;
                this.typeIsShow = false;
                this.ageIsShow = false;
                this.brandIsShow = false;
                this.abilityIsShow = false;
            },
			recommendReset: function(){
				
				this.$router.push('/mine/reset');
			},
			morecommendAll: function(){
				
				document.body.scrollTop = 0;
				this.$router.push('/index/result');
			},
			toyDetail: function(toyId){
				
				this.$router.push('/index/detail');
			},
			toyCart: function(e, toyId){
							
				this.$emit('frameTabCartAdd', e.source);
							
				e.stopPropagation();
			},
			goToMine : function(){
			    this.$router.push('/mine');
			},
			goToCart : function(){
//			    console.log(1111);
                this.$router.push('/index/cart');
            },
            goToLocation : function() {
                this.$router.push('/index/location');
            },
            goToSearch : function() {
                this.$router.push('/index/search');
            },
            tabsScroll: function( e, docked ){

                var tabsDock = document.querySelector('.nav .dock');
                if (docked == true && tabsDock.style.display !== 'block'){
                    tabsDock.style.display = 'block';
                }
                if (docked == false && tabsDock.style.display !== 'none'){
                    tabsDock.style.display = 'none';
                }   
                if (docked == true && this.tabsIsDock !== true ){
                    this.tabsIsDock = true;
                }   
                if (docked == false && this.tabsIsDock !== false ){
                    this.tabsIsDock = false;
                }
            }
			
		},
		components: {
			'tm-slide': Slide
		}
	}
})();

export default _default;