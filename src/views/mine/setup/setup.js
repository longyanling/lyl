'use strict';

import Toast from '@/directives/toast';
import Utils from '@/directives/utils';
import Modal from '@/components/modal.vue';
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
            unbound: function(){
                var vm = this;
                vm.$refs.modal.show("您确认要解除绑定？不再考虑一下？" , '再想想~', '不了，谢谢');
            },
            success :function(){
                var vm = this;
                
                API.Mine.unbound({},function(data){
                    if(data.code == 0){
                        Utils.Cookie.delCookie("ZL_UEC");
                        window.location = "https://www.toysuperman.com/jdapi/main";
                    }else {
                        Toast.show("解除授权失败，请回首页查看您是否已解除授权!")
                    }
                    
                });
            },
            go: function(e, url){
                
                this.$router.push(url);
            }
        },
        components: {
            'tm-modal': Modal
        }
    }
})();

export default _default;