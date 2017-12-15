'use strict';

import Utils from '@/directives/utils';
import DatePicker from '@/components/datepicker.vue';

var _default = (function(){

    return {
        name: 'birthdate',
        mounted: function(){
        	
        	this.birthDate = Utils.Date.fromTicks(this.$route.query.date);
        },
        data: function(){
            
            return {
            	birthDate: null
            };
        },
        methods: {
        	resetBirthDate: function(date){
        		
        		this.birthDate = date;
        	},
            submit: function(e, url){
        
        		this.$emit('resetBirthDate', this.birthDate.getTime());
                this.$router.back( -1 );
            },
            deactive: function(e){
            	
            	if (e.target.id == 'birthdate'){
            		this.$router.back( -1 );	
            	}
            }
        },
		components: {
			'tm-datepicker': DatePicker
		}
    }
})();

export default _default;
