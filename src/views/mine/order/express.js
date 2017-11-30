'use strict';

import Sortor from "@/directives/sortor";
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'express',
        mounted: function(){
        	
            var vm = this;
            
            API.Mine.express(function(data){
            	
            	vm.hotItems = data.data.companyHot || [];
            	vm.listItems = Sortor.pinyin(data.data.companyList || []);
            });
        },
        data: function(){
            
            return {
                hotItems: [],
                listItems: []
            };
        },
        methods: {
            select: function( e, express ){
        
                this.$router.push( '/mine/order/return?express=' + express);
            }
        }
    }
})();

export default _default;