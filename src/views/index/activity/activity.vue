<template>
    <div id="index-activity" class="tm-activity">
        <div class="cancel" v-touch:tap="{event: goIndex, params: []}"></div>
        <div class="content">
            <img src="https://ts.zlimg.com/v2/h5/jd/popup_content.png"/>
        </div>
    </div>
    
</template>

<script>
    import Activity from '@/views/index/activity/activity.js';
    import '@/views/index/activity/activity.scss';

    export default Activity;
</script>
