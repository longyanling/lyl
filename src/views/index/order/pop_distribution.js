'use strict';

var _default = (function(){

    return {
        name: 'pop_distribution',
        mounted: function(){
            var that = this;
            that.methodsItem = that.distribution[1].methods;
            that.modeIndex = that.distribution[1].default;
            console.log(that.modeIndex)
            console.log(that.modeIndex);
            that.infoDeterItem.splice(0, 1, that.methodsItem[0]);
            that.daysItem = that.distribution[0].days;
            that.infoDeterItem.splice(1, 1, that.daysItem[0])
            console.log(that.infoDeterItem)
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
                modeIndex : null,
                dayIndex : 0,
                infoDeterItem : [],
            };
        },
        methods: {
            selectMode : function (e, index, item) {
                this.infoDeterItem.splice(0, 1, item);
                this.modeIndex = index;
            },
            selectDay : function (e, index, item) {
                this.infoDeterItem.splice(1, 1, item);
                this.dayIndex = index;
            },
            InfoDetermine : function () {
                var infoDeterData = this.infoDeterItem;
                this.$emit('resetDistribution', infoDeterData);
                this.$router.push( '/index/confirm' );
            },
            cellHref: function( e, url ){

                this.$router.push( url );
            }
        }
    }
})();

export default _default;
