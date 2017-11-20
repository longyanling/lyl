<template>
  <div id="frame" class="tm-frame">
  	<div class="tm-page">
  		<router-view @frameTabSetup="tabSetup"  @frameTabCartAdd="tabCartAdd"></router-view>
  	</div>
  </div>
</template>

<script>
	
import Frame from '@/frame.js'
import '@/frame.scss';

export default Frame;

</script>