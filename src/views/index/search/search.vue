<template>
	<div id="toy-search" class="tm-toy-search">
		
		<tm-search :submit="searchSubmit" :keyword='searchKeyword'></tm-search>
		
		<ins class="spacebar" />
		
		<!-- 搜索历史 -->
		<div class="history">
			<h5 class="caption">搜索历史</h5>
			<div class="list">
				<span v-for="(item, index) in historyItems" v-touch:tap=" { event: tagChange, params: [ item ]} " class="tag">{{item}}</span>
			</div>
		</div>
		
		<!-- 热门搜索 -->
		<div class="hots">
			<h5 class="caption">热门搜索</h5>
			<div class="list">
				<span v-for="(item, index) in hotItems" v-touch:tap=" { event: tagChange, params: [ item ]} " class="tag">{{item}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Search from '@/views/index/search/search.js'
	import '@/views/index/search/search.scss'
	
	export default Search;
	
</script>
