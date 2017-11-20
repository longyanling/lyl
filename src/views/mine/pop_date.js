'use strict';

import Utils from '@/directives/utils'

var _default = (function(){

	//	初始化日历选择器
	var pickerTimer;
	var yearList, monthList, dayList;
	var initDatePicker = function( vl ){
		
		var year = vl.birthDate.getFullYear();
		var month = vl.birthDate.getMonth();
		var day = vl.birthDate.getDate();
		
		vl.yearSelected = year;
		vl.monthSelected = month;
		vl.daySelected = day;
		
		resetDatePicker( vl );
	};
	
	var resetDatePicker = function( vl ){
		
		vl.dayItems = [];
		for (var i = 1 ; i < 32; i++){
			if (new Date(vl.yearSelected, vl.monthSelected - 1, i).getMonth() == vl.monthSelected - 1){
				vl.dayItems.push( i );
			}
		}
		
		setTimeout( function(){
			
			selectDatePicker( vl );
		}, 100);
	};
	
	var selectDatePicker = function( vl ){
		
		var yearIndex = -1;
		var monthIndex = -1;
		var dayIndex = -1;
		
		for (var i = 0; i<vl.yearItems.length; i++){
			if (vl.yearItems[i] == vl.yearSelected) yearIndex = i;
		}
		
		for (var i = 0; i<vl.monthItems.length; i++){
			if (vl.monthItems[i] == vl.monthSelected) monthIndex = i;
		}
		
		for (var i = 0; i<vl.dayItems.length; i++){
			if (vl.dayItems[i] == vl.daySelected) dayIndex = i;
		}
		
		yearList.scrollTop = (yearIndex * 24);
		monthList.scrollTop = (monthIndex * 24);
		dayList.scrollTop = (dayIndex * 24);
	};
	
    return {
        name: 'mine-pop-date',
        mounted: function(){
        	
			for (var i = 0; i < 16; i ++){
				this.yearItems.push( 2017 - i );
			}
			for (var i = 0; i < 12; i ++){
				this.monthItems.push( i + 1 );
			}
        	
        	this.birthDate = Utils.dateFromString( this.$route.query.birthdate );
        	
        	yearList = document.getElementById('pop_date_year');
        	monthList = document.getElementById('pop_date_month');
        	dayList = document.getElementById('pop_date_day');
        	initDatePicker( this );
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
               birthDate: new Date(),
               yearItems: [],
               yearSelected: 0,
               monthItems: [],
               monthSelected: 0,
               dayItems: [],
               daySelected: 0
            };
        },
        methods: {
            cellHref: function( e, url ){
        
                this.$router.push( '/mine/profile?birthdate=' + this.birthDate );
            },
            onDateScroll: function( type, e ){
            	
            	var index = -1; 
            	var self = this;
            	
            	if ( type == 1 ){
            		index = Math.floor(yearList.scrollTop / 24);
            		this.yearSelected = this.yearItems[index];
            	} else if ( type == 2 ){
            		index = Math.floor(monthList.scrollTop / 24);
            		this.monthSelected = this.monthItems[index];
            	} else {
            		index = Math.floor(dayList.scrollTop / 24);
            		this.daySelected = this.dayItems[index];
            	}
            	if ( type == 1 || type == 2){
            		resetDatePicker(this);
            	}
            	
            	this.birthDate = new Date(this.yearSelected, this.monthSelected - 1, this.daySelected);
            	
				setTimeout( function(){
					
					selectDatePicker( self );
				}, 100);
            }
        }
    }
})();

export default _default;
