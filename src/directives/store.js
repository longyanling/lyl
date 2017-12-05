var data = {
    Index: {
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
        searchHot: null
    },
    Mine: {
        profile: null,
        address: null,
        addressCurrent: null,
        coupons: null,
        carts: null
    }
};

export default data; 
