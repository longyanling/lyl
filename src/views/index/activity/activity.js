'use strict';

import Utils from '@/directives/utils';
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'index-activity',
        mounted: function(){
            
             
        },
        data: function(){
            
            return {
               
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