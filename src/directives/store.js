'use strict';

var data = {
	Hub: new Vue(),
    Index: {
        cityNameSet: function(name){

            data.Index.cityName = name;
            localStorage.setItem('CITY_NAME', name);
        },
        cityName: (function(){
            
            return localStorage.getItem('CITY_NAME');
        })(),
        cityHot: null,
        cityAll: null,
        filterAge: null,
        filterBrandHots: null,
        filterBrandAll: null,
        filterAbility: null,
        filterType: null,
        filterSort: null,
        filterSize: null,
        filterRentType: null,
        filterStockNum: null,
        cartToys: null,
        searchTagHistory: (function(){
            
            if (localStorage.getItem('SEARCH_HISTORY')){
                return (localStorage.getItem('SEARCH_HISTORY') || '').split(',');
            }
            return [];
        })(),
        searchTagHistorySet: function(item){
        
            var words = [];
            for (var i = 0; i < data.Index.searchTagHistory.length; i++){
                if (data.Index.searchTagHistory[i] != item ){
                    words.push(data.Index.searchTagHistory[i]);
                }
            }
            words.unshift(item);
            localStorage.setItem('SEARCH_HISTORY', words.join(','));

        },
        searchHot: null,
        orderToys: []
    },
    Mine: {
        profile: null,
        address: null,
        addressCurrent: null,
        coupons: null,
        logined: null
    }
};

export default data; 
