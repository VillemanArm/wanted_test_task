<template>
	<div class="log__window" ref="logWindow">
		<p v-for="log in logStore.filteredLogs" :key="log.id">{{`${log.Timestamp}   ${log.Level}   ${log.Message}   ${log.Source}`}}</p>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUpdated, watch } from 'vue'
import {useLogStore} from '@/stores/LogStore'

const logStore = useLogStore()

const logWindow = ref<HTMLDivElement | null>(null)

onMounted(() => {
	logStore.logWindow = logWindow.value
})



</script>


<style scoped lang="sass">
@import '@/assets/styles/constants.sass'

.log__window
	height: 600rem
	padding: 10rem

	background-color: $secondary-color
	color: $secondary-font-color
	overflow-x: hidden

	& p
		margin-top: 4rem

		white-space: pre
</style>





