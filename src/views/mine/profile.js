'use strict';
var _default = (function(){

    return {
        name: 'cart-index',
        mounted: function(){


        },
        destoryed: function(){

        },
        data: function(){
            
            return {
            	sex: 0
            };
        },
        methods: {
            cellHref: function( e, url ){
                this.$router.push( url );
            },
            selectSex: function( sex ){
            	this.sex = sex;
            },
            saveChange: function(){
           
                this.$router.push( '/mine' );
            }
        }
    }
})();

export default _default;