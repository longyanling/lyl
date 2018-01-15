'use strict';

import Utils from '@/directives/utils';
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'index-activity',
        mounted: function(){
        	var vm = this;
        	
        	API.Index.takeCoupon({
        		cid: 9031
        	}, function(data){
        		
        		console.log(data);
        		vm.couponItems = data;
        	});
        },
        data: function(){
            
            return {
                couponItems : [],
                
            };
        },
        methods: {
            goIndex: function(){
                
                this.$router.push('/index');
            }
        }
    }
})();

export default _default;