var _default = (function(){
    var days = new Array();
    for (var i = 9; i <= 60; i++) {
        days.push(i);
    };
    return {
        name: 'pop_lease',
        mounted: function(){

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                daysItem : days,
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