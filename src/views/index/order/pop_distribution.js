'use strict';

var _default = (function(){

    return {
        name: 'pop_distribution',
        mounted: function(){
            var that = this;
            that.methodsItem = that.distribution[1].methods;
            that.daysItem = that.distribution[0].days;
            console.log(that.daysItem);
        },
        destoryed: function(){

        },
        props: [
            'distribution'
        ], 
        data: function(){
            
            return {
                methodsItem : [],
                daysItem : [],
                modeIndex : 1,
                dayIndex : 0,
            };
        },
        methods: {
            selectMode : function (e, index) {
                this.modeIndex = index;
            },
             selectDay : function (e, index) {
                this.dayIndex = index;
            },
            cellHref: function( e, url ){

                this.$router.push( url );
            }
        }
    }
})();

export default _default;
