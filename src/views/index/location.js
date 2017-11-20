'use strict';
import Axios from 'axios';
import Sort from "@/directives/sort";

var _default = (function(){
    return {
        name: 'toy-location',
        mounted: function(){
            var self = this;
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
                            var initial = Sort(arr[j].cityName.charAt(0));
                            if(initial == letters[i] || initial == letters[i].toLowerCase()){
                                curr.data.push(arr[j]);
                            }
                        }
                    }
                    if(empty || curr.data.length) {
                        result.push(curr);
                        curr.data.sort(function(a,b){
                            return b.cityName.localeCompare(a);
                        });
                    }
                }
                return result;
            };

            
            Axios.get('/home/cities', {
                
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    var citys = data.data;
                    self.cityHotItem = citys.hotCities;
                    var queue = citys.cities;
                    self.cityListItem = pySort(queue);
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