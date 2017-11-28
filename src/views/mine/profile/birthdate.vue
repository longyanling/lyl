<template>
    <div id="birthdate" class="tm-mine-profile-birthdate" v-touch:tap="{ event: deactive, params: [] }">
	    <div class="titlebar">
            <span class="text">选择宝宝生日</span>
            <a class="submit" v-touch:tap="{ event: submit, params: [] }">确定</a>
        </div>
        <div class="picker">
        	<tm-datepicker @resetDate="resetBirthDate" :value="birthDate"></tm-datepicker>
        </div>
    </div>
</template>

<script>
    import ProfileDate from '@/views/mine/profile/birthdate.js'
    import '@/views/mine/profile/birthdate.scss'
    
    export default ProfileDate;
</script>
