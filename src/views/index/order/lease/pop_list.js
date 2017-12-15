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
        },
        props: [
            'lease'
        ], 
        data: function(){
            
            return {
                dayDefault : [],
                dayItems : [],
            };
        },
        methods: {
            SelectedDate : function( e, item ){
                
                this.$emit('resetDate', item);
                this.$router.back( -1 );
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