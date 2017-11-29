'use strict';

import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'edit',
        mounted: function(){

        },
        data: function(){
            
            return {
            	sex: 0,
                consignee: '',
                phone: '',
                location: '',
                address: '',
                isDefault: false
            };
        },
        methods: {
        	sexChange: function(e, sex){
        		
        		this.sex = sex;
        	},
        	defaultCheck: function(e){
        		
        		this.isDefault = !this.isDefault;
        	},
            submit: function( e, url ){
            	
            	console.log(this.consignee);
            }
        }
    }
})();

export default _default;