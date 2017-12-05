'use strict';
import Axios from 'axios';
import Sortor from "@/directives/sortor";

var _default = (function(){
    return {
        name: 'Location',
        mounted: function(){
            var self = this;
            
            Axios.get('/home/cities', {
                
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    var citys = data.data;
                    self.cityHotItem = citys.hotCities;
                    var queue = citys.cities;
                    self.cityListItem = Sortor.pinyin(queue);
                } else {
                    console.log(results);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
           
        },
        destoryed: function(){

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