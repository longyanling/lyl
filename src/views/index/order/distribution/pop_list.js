'use strict';

var _default = (function(){

    return {
        name: 'distribution',
        mounted: function(){
            
            var vm = this;
            
            vm.canOnsite = vm.distribution[2].canOnsite;
            vm.canPostal = vm.distribution[2].canPostal;
            vm.methodItems = vm.distribution[1].methods;
            vm.methodIndex = vm.distribution[1].default;
            
            for (var i = 0; i < vm.methodItems.length; i++){
                if(vm.methodItems[i].value == vm.methodIndex){
                    vm.methodHint = vm.methodItems[i].tips;
                }
            }
            
            vm.infoDeterItem.splice(0, 1, (vm.methodIndex == 1 ? vm.methodItems[0] :  that.methodItems[1]));
            vm.dayItems = vm.distribution[0].days;
            vm.dayIndex = vm.distribution[0].default.timestamp;
            
            for (var i = 0; i < vm.dayItems.length; i++){
                if(vm.dayItems[i].value == vm.dayIndex){
                    vm.infoDeterItem.splice(1, 1, vm.dayItems[i]);
                }
            }
        },
        props: [
            'distribution'
        ], 
        data: function(){
            
            return {
                methodIndex : null,
                methodHint : null,
                methodItems : [],
                infoDeterItem : [],
                dayItems : [],
                dayIndex : null,
                canOnsite : null,
                canPostal : null
            };
        },
        methods: {
            deactive: function(e){
                
                if (e.target.id == 'distribution'){
                    this.$router.push( '/index/confirm' );   
                }
            },
            selectMethod  : function (e, index, item) {
                
                if((index == 1 && !this.canOnsite) || (index == 2 && !this.canPostal)) return;
                this.infoDeterItem.splice(0, 1, item);
                this.methodHint = item.tips;
                this.methodIndex = index;
            },
            selectDay : function (e, index, item) {
                
                this.infoDeterItem.splice(1, 1, item);
                this.dayIndex = index;
            },
            InfoDetermine : function () {
                
                var infoDeterData = this.infoDeterItem;
                this.$emit('resetDistribution', infoDeterData);
                this.$router.push( '/index/confirm' );
            }
        }
    }
})();

export default _default;
