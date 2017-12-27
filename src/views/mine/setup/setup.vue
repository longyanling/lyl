<template>
    <div id="setup" class="tm-mine-setup">
        <div class="iconjd">
            <img class="lion" src="https://ts.zlimg.com/v2/h5/jd/setting_lion.png"/>
            <img class="conversion" src="https://ts.zlimg.com/v2/h5/jd/setting_conversion.png"/>
            <img class="jdlogo" src="https://ts.zlimg.com/v2/h5/jd/setting_jd.png"/>
        </div>
        <div class="content">
            <span class="title">点击"解除授权"按钮将解除以下授权:</span>
            <span class="detail">解除绑定后，您将无法在玩具超人与京东之间进行无需登录的快速跳转，同时也无法享受更多玩具超人给予京东用户的专享都是服务。</span>
        	<span class="relieve" v-touch:tap="{event: unbound, params: []}">解除授权</span>
        </div>
        <tm-modal ref="modal" :success="success"></tm-modal>
    </div>
    
</template>

<script>
    import Setup from '@/views/mine/setup/setup.js';
    import '@/views/mine/setup/setup.scss';

    export default Setup;
</script>