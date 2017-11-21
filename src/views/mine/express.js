'use strict';
import Vue from "vue";
import Sort from "@/directives/sort";
import Toast from '@/directives/toast';
import mineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'order-express',
        mounted: function(){
            var that = this;
            
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
                            var initial = Sort(arr[j].name.charAt(0));
                            if(initial == letters[i] || initial == letters[i].toLowerCase()){
                                curr.data.push(arr[j]);
                            }
                        }
                    }
                    if(empty || curr.data.length) {
                        result.push(curr);
                        curr.data.sort(function(a,b){
                            return b.name.localeCompare(a);
                        });
                    }
                }
                return result;
            };
            
            mineAPI.express(
                {
                
                },
                function (data) {
                    if (data.code == 0) {
                        that.companyHotItem = data.data.companyHot;
                        var express = data.data.companyList;
                        that.companyListItem = pySort(express);
                    } else {
                        Toast.show(data.msg);;
                    }
                })
                  
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                companyListItem : [],
                companyHotItem : [],
            };
        },
        methods: {
            cellHref: function( e, url ){
        
                this.$router.push( url );
            }
        }
    }
})();

export default _default;