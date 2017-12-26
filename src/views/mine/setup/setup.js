'use strict';

import Utils from '@/directives/utils';
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'setup',
        mounted: function(){
            

        },
        data: function(){
            
            return {

            };
        },
        methods: {
            go: function(e, url){
                
                this.$router.push(url);
            }
        }
    }
})();

export default _default;