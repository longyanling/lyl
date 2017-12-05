'use strict';
import API from "@/services/api";
import Sortor from "@/directives/sortor";

var _default = (function(){
    return {
        name: 'Location',
        mounted: function(){
            var self = this;
            
            API.Index.location({
                
            },function (data) {
                if (data.code == 0) {
                    
                    var citys = data.data;
                    self.cityHotItem = citys.hotCities;
                    var queue = citys.cities;
                    self.cityListItem = Sortor.pinyin(queue);
                } else {
                    console.log(data.msg);
                }
            })
           
        },
        data: function(){

            return {
                cityHotItem : null,
                cityListItem : null,
            };
        },
        methods: {
            goToHome : function() {
                this.$router.push('/toy');
            }
        }
    }
})();

export default _default;