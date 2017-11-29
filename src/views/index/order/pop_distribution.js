'use strict';

var _default = (function(){

    return {
        name: 'pop_distribution',
        mounted: function(){
            var that = this;
            that.canOnsite = that.distribution[2].canOnsite;
            that.canPostal = that.distribution[2].canPostal;
            that.methodsItem = that.distribution[1].methods;
            that.modeIndex = that.distribution[1].default;
            that.methodsItem.forEach(function(item){
                if(item.value == that.modeIndex){
                    that.deliveryHint = item.tips;
                }
            })
            that.infoDeterItem.splice(0, 1, (that.modeIndex == 1 ? that.methodsItem[0] :  that.methodsItem[1]));
            that.daysItem = that.distribution[0].days;
            that.daysIndex = that.distribution[0].default.timestamp;
            that.daysItem.forEach(function(day){
                if(day.timestamp == that.daysIndex){
                   that.infoDeterItem.splice(1, 1, day);
                }
            });
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
                daysIndex : null,
                infoDeterItem : [],
                canOnsite : null,
                canPostal : null,
                deliveryHint : null
            };
        },
        methods: {
            selectMode : function (e, index, item) {
                if((index == 1 && !this.canOnsite) || (index == 2 && !this.canPostal)) return;
                this.infoDeterItem.splice(0, 1, item);
                this.deliveryHint = item.tips;
                this.modeIndex = index;
            },
            selectDay : function (e, index, item) {
                this.infoDeterItem.splice(1, 1, item);
                this.daysIndex = index;
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
