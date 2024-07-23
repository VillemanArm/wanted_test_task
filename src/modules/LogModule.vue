<template>
	<div class="log">
		<LogToolbar/>
		<logWindow/>
		<ProjectDescription/>
	</div>

</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUpdated, onUnmounted, watch } from 'vue'
import LogToolbar from '@/components/LogModule/LogToolbar.vue'
import logWindow from '@/components/LogModule/LogWindow.vue'
import ProjectDescription from '@/components/LogModule/ProjectDescription.vue'
import { useLogStore } from '@/stores/LogStore'

const logStore = useLogStore()

onUnmounted(() => {
	logStore.disconnectLogs()
})

</script>

<style scoped lang="sass">
@import '@/assets/styles/constants.sass'

</style>





