<template>
    <div id="pop_date" class="tm-mine-pop_date">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/mine/profile'] }"></div>
    	<div class="time">
    	    <div class="title">
                <span class="name">选择宝宝生日</span>
                <span class="confirm" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }">确定</span>
            </div>
            <div class="choice">
            	<div class="years">
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
            	    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
                    <div class="each">2017</div>
            	    
            	    <span class="word">年</span>
            	</div>
            	<div class="months">
            		月
            	</div>
            	<div class="days">
            		日
            	</div>
            </div>
    	</div>
    </div>
</template>

<script>
    import ProfileDate from '@/views/mine/pop_date.js'
    import '@/views/mine/pop_date.scss'
    
    export default ProfileDate;
</script>
