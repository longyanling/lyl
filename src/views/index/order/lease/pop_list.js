var _default = (function(){
    return {
        name: 'Lease',
        mounted: function(){
            
            var vm = this;
            
            vm.dayDefault = vm.lease;
            vm.dayItem = new Array();
            
            for (var i = vm.lease.min; i <= vm.lease.max; i++) {
                vm.dayItems.push(i);
            };
            vm.dayFirstItems = vm.dayItems.slice(0, 18);
            vm.daySecondItems = vm.dayItems.slice(18, 36);
            vm.dayThirdItems = vm.dayItems.slice(36, 54);
        },
        props: [
            'lease'
        ], 
        data: function(){
            
            return {
                dayDefault : [],
                dayItems : [],
                dayFirstItems : [],
                daySecondItems : [],
                dayThirdItems : []
            };
        },
        methods: {
            SelectedDate : function( e, item ){
                
                this.$emit('resetDate', item);
                this.$router.back( -1 );
                _hmt.push(["_trackEvent", "link", "click", "下单-租期-租期选择"]);
            },
           deactive: function(e){
                
                if (e.target.id == 'lease'){
                    this.$router.back( -1 );   
                }
            },
        }
    }
})();

export default _default;