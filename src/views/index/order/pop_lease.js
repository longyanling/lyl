var _default = (function(){
    return {
        name: 'pop_lease',
        mounted: function(){
            var that = this;
            that.daysDefault = that.lease;
            that.daysItem = new Array();
            for (var i = that.lease.min; i <= that.lease.max; i++) {
                that.daysItem.push(i);
            };
        },
        destoryed: function(){

        },
        props: [
            'lease'
        ], 
        data: function(){
            
            return {
                daysDefault : [],
                daysItem : [],
            };
        },
        methods: {
            SelectedDate : function( e, item ){
                this.$emit('resetDate', item);
                this.$router.push( '/index/confirm' );
            },
            cellHref: function( e, url ){

                this.$router.push( url );
            }
        }
    }
})();

export default _default;