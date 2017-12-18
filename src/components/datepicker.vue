<template>
	<div id="datepicker" class="tm-datepicker">
    	<div class="segment years">
    		<em class="label">年</em>
    		<span id="dateYear" class="list" @scroll="scrollSegment(1,$event)">
    			<dfn class="item" v-for="(item,index) in yearItems" v-bind:class="item==yearValue ? 'selected':''">{{item}}</dfn>
    		</span>
    	</div>
    	<div class="segment months">
    		<em class="label">月</em>
    		<span id="dateMonth" class="list" @scroll="scrollSegment(2,$event)">
    			<dfn class="item" v-for="(item,index) in monthItems" v-bind:class="item==monthValue ? 'selected':''">{{item}}</dfn>
    		</span>
    	</div>
    	<div class="segment days">
    		<em class="label">日</em>
    		<span id="dateDay" class="list" @scroll="scrollSegment(3,$event)">
    			<dfn class="item" v-for="(item,index) in dayItems" v-bind:class="item==dayValue ? 'selected':''">{{item}}</dfn>
    		</span>
    	</div>
    	<div class="current"></div>
	</div>
</template>

<script>
	
	var timer;
	var eleYear, eleMonth, eleDay;
	var setScrollIndex = function(ele, index){
		
		ele.scrollTop = (index * 28);
	};
	var getScrollIndex = function(ele){
		
		return Math.floor(ele.scrollTop / 28);
	};
	
	export default {
		name: 'datepicker',
		mounted: function(){
			
			for (var i = 2017; i > 2000; i --){
				this.yearItems.push( i );
			}
			for (var i = 0; i < 12; i ++){
				this.monthItems.push( i + 1 );
			}
			
        	eleYear = document.getElementById('dateYear');
        	eleMonth = document.getElementById('dateMonth');
        	eleDay = document.getElementById('dateDay');
        	
        	setTimeout(this.initValue, 10);
		},
		props: [
			'value'
		],
		data: function(){
			
			return {
				yearValue: null,
				yearItems: [],
				monthValue: null,
				monthItems: [],
				dayValue: null,
				dayItems: [],
			};
		},
		methods: {
			initValue: function(){
				
				this.yearValue = this.value.getFullYear();
				this.monthValue = this.value.getMonth() + 1;
				this.dayValue = this.value.getDate();
				
				this.resetMonth();
				setTimeout(this.resetSegment, 10);
			},
			resetMonth: function(){
				
				this.dayItems = [];
				
				for (var i = 1 ; i < 32; i++){
					if (new Date(this.yearValue, this.monthValue - 1, i).getMonth() == this.monthValue - 1){
						this.dayItems.push( i );
					}
				}
			},
			scrollSegment: function(type, e){
				
            	var index = -1; 
            	var self = this;
            	
				timer && clearTimeout(timer);
				timer = setTimeout(function(){
					
	            	if ( type == 1 ){
	            		index = getScrollIndex(eleYear);
	            		self.yearValue = self.yearItems[index];
	            	} else if ( type == 2 ){
	            		index = getScrollIndex(eleMonth);
	            		self.monthValue = self.monthItems[index];
	            	} else {
	            		index = getScrollIndex(eleDay);
	            		self.dayValue = self.dayItems[index];
	            	}
	            	if ( type == 1 || type == 2){
	            		self.resetMonth();
	            	}
	            	self.$emit('resetDate', new Date(self.yearValue, self.monthValue - 1, self.dayValue));
	        		setTimeout(self.resetSegment, 10);
				}, 100);
			},
			resetSegment: function(){
						
				var yearIndex = -1;
				var monthIndex = -1;
				var dayIndex = -1;
				
				for (var i = 0; i<this.yearItems.length; i++){
					if (this.yearItems[i] == this.yearValue) yearIndex = i;
				}
				
				for (var i = 0; i<this.monthItems.length; i++){
					if (this.monthItems[i] == this.monthValue) monthIndex = i;
				}
				
				for (var i = 0; i<this.dayItems.length; i++){
					if (this.dayItems[i] == this.dayValue) dayIndex = i;
				}
				
				setScrollIndex(eleYear, yearIndex);
				setScrollIndex(eleMonth, monthIndex);
				setScrollIndex(eleDay, dayIndex);
			}
		}
	}
	
</script>

<style lang="scss">
	
    .tm-datepicker {
    	width:100%;
    	height:196px;
               
        .segment {
            float: left;
            display:block;
            width: 33%;
            height: inherit;
                
            .label {
                float: right;
                display:block;
                width: 28px;
                height: inherit;
                line-height:28px;
                margin-top:84px;
            }
            .list {                 
                display:block;
                overflow: auto;
                height: inherit;
                padding-left:30px;
                margin-right:30px;
                -webkit-overflow-scrolling: touch;
                
                .item {
                    display:block;
                    overflow:hidden;
                    height:28px;
                    line-height: 28px;
                    text-align:center;
                    
                    &.selected {
                        color: #ed6f37;
                        font-size:14px;
                    }
                    &:first-child{
                        margin-top:84px;
                    }
                    &:last-child{
                        margin-bottom:84px;
                    }
                }   
            }   
        }
        .current {
            display: block;
            position:relative;
            top:83px;
            height: 28px;
            border: 1px solid #f0f0f0;
            border-left: 0px;
            border-right: 0px;
        }
    }
    
</style>