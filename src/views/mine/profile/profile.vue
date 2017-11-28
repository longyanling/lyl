<template>
    <div id="profile" class="tm-mine-profile-profile">
    	<div class="container">
    	    <em class="caption">宝宝信息</em>
    	    <div class="sexpicker">
    	    	<div class="item" v-on:click="sexChange(0);" v-bind:class="babyInfo.babySex == 0 ? 'selected' : '' ">
    	    		<img class="babyicon" src="https://ts.zlimg.com/v2/h5/jd/mine_sex_boy.png"/>
    	    		<img class="check" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/>
    	    		<span class="text">男宝宝</span>
    	    	</div>
    	    	<div class="item" v-on:click="sexChange(1);" v-bind:class="babyInfo.babySex == 1 ? 'selected' : '' ">
    	    		<img class="babyicon" src="https://ts.zlimg.com/v2/h5/jd/mine_sex_girl.png"/>
    	    		<img class="check" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/>
    	    		<span class="text">女宝宝</span>
    	    	</div>
    	    </div>
    	    <div class="birthdate" v-touch:tap="{event: birthPicker, params: [ ]}">
    	    	<img src="https://ts.zlimg.com/v2/h5/jd/mine_icon_date.png" class="icon" />
    	    	<span class="text">{{babyInfo.birthDateText}}</span>
    	    </div>
    	</div>
    	<div class="controls fixed">
    		<a class="button submit" v-on:click="submit();">确 定</a>
    	</div>
    	<router-view @resetBirthDate="birthReset"></router-view>
    </div>
</template>

<script>
    import Profile from '@/views/mine/profile/profile.js'
    import '@/components.scss';
    import '@/views/mine/profile/profile.scss'

    export default Profile;
</script>

