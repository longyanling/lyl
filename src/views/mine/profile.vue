<template>
    <div id="profile" class="tm-mine-profile">
    	<div class="content">
    	    <em class="title">宝宝信息</em>
    	    <div class="box">
    	    	<div class="boy all">
    	    		<img class="sex" src="https://ts.zlimg.com/v2/h5/jd/mine_sex_boy.png"/>
    	    		<span class="con">男宝宝</span>
    	    		<img class="selected" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/>
    	    	</div>
    	    	<div class="girl all">
    	    		<img class="sex" src="https://ts.zlimg.com/v2/h5/jd/mine_sex_girl.png"/>
    	    		<span class="con">女宝宝</span>
    	    		<img class="selected" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/>
    	    	</div>
    	    </div>
    	    <div class="date" v-touch:tap="{event : cellHref,params : ['/mine/profile/date']}"><span>2017-10-01</span> <img src="https://ts.zlimg.com/v2/h5/jd/mine_icon_date.png"/></div>
    	</div>
    	<div class="submit">确定</div>
    	<router-view></router-view>
    </div>
</template>

<script>
    import Profile from '@/views/mine/profile.js'
    import '@/views/mine/profile.scss'

    export default Profile;
</script>

