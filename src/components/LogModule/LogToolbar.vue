<template>
		<div class="toolbar">
			<div class="toolbar__search">
				<input 
					type="text" 
					class="toolbar__text-input" 
					v-model="logStore.searchQuery" 
					@keyup.enter="logStore.highlightText"
				>
				<button 
					class="toolbar__button" 
					@click="logStore.highlightText"
				>
					Search
				</button>

				<div 
					v-if="logStore.highlightedElements?.length" 
					class="toolbar__search-selector"
				>
					<button 
						class="toolbar__button" 
						@click="logStore.setHighlightedElementNumber(-1)"
					>
						&#x2191
					</button>
					<button 
						class="toolbar__button" 
						@click="logStore.setHighlightedElementNumber(+1)"
					>
						&#x2193
					</button>
					<span>{{ logStore.highlightedElementNumber }} out of {{ logStore.highlightedElements.length }}</span>
				</div>

			</div>
			<div class="toolbar__filter">
				<select  
					v-model="logStore.filterOption" 
					class="toolbar__select"
				> 
					<option value=""></option>
					<option value="TRACE">TRACE</option>
					<option value="DEBUG">DEBUG</option>
					<option value="WARN">WARN</option>
				</select>
			</div>
		</div>

</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onUpdated, watch } from 'vue'
import {useLogStore} from '@/stores/LogStore'

const logStore = useLogStore()
</script>

<style scoped lang="sass">
@import '@/assets/styles/constants.sass'
.toolbar
	padding: 16rem
	display: flex
	justify-content: space-between

.toolbar__search
	display: flex
	gap: 16rem

.toolbar__text-input
	width: 300rem
	height: 28rem
	padding: 0 12rem

	border: 1rem solid $secondary-color
	border-radius: 4rem

.toolbar__button
	height: 28rem
	padding: 0 12rem

	font-size: 16rem

	border: 1rem solid $primary-color
	border-radius: 4rem
	background-color: $primary-color
	color: $secondary-font-color

	&:hover
		background-color: transparent
		color: $primary-color

.toolbar__search-selector 
	& button
		margin-right: 8rem

	& span
		margin-left: 16rem
	
.toolbar__select
	width: 100rem
	height: 28rem
	padding-left: 12rem

	border: 1rem solid $secondary-color
	border-radius: 4rem

</style>





