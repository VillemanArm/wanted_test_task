import {  reactive, ref, computed, onMounted, onUpdated, watch  } from 'vue'
import { defineStore } from 'pinia'
import Api from "@/common_functions/api"
import Helpers from '@/common_functions/helpers'

declare global {
  interface Log {
    Level: string
    Message: string
    Source: string
    Timestamp: string
    id?: string
}
}

const helpers = new Helpers

export const useLogStore = defineStore('log', () => {
  const api = new Api('ws://test.enter-systems.ru/', 'enter', 'A505a')

  const disconnectLogs = () => {
    api.disconnectFromServer()
  }

  const logs = ref<Log[]>([])

  const addLogs = (newLogs: Log[]) => {  
    logs.value.push(...newLogs)
  }

  const filterOption = ref<string>()

  const filteredLogs = computed<Log[]>(() => {
      if (filterOption.value) {
        return [...logs.value].filter((log) => log.Level === filterOption.value)
      }
      return [...logs.value]
  })

  const searchQuery = ref<string>()
  const highlightedElements = ref()
  const highlightedElementNumber = ref(0)

  const setHighlightedElementNumber = (num: number) => {
    if (highlightedElements.value) {
      if (highlightedElementNumber.value + num >= 1 && highlightedElementNumber.value + num <= highlightedElements.value.length) {
        highlightedElementNumber.value += num
      } else if (highlightedElementNumber.value + num <= 0) {
        highlightedElementNumber.value = highlightedElements.value.length
      } else {
        highlightedElementNumber.value = num
      }
    }
  }

  const logWindow = ref<HTMLDivElement | null>(null)
    
  const highlightText = () => {
    if (logWindow.value) {
        let regex = /<span class="highlight">|<\/span>/g
        logWindow.value.innerHTML = logWindow.value?.innerHTML.replace(regex, '')
        highlightedElementNumber.value = 0 
        highlightedElements.value = null
      }
    if (searchQuery) {
      if (logWindow.value && searchQuery.value) {
        const regex = new RegExp(searchQuery.value, 'gi')
        logWindow.value.innerHTML = logWindow.value?.innerHTML.replace(regex, (match) => `<span class="highlight">${match}</span>`)
        
        highlightedElements.value = logWindow.value.querySelectorAll('.highlight')
        if (highlightedElements.value.length) {
          highlightedElementNumber.value = highlightedElements.value.length
        }
        scrollToHighlightedElement()
      }
    } 
  }  
    
  const scrollToHighlightedElement = () => {
    if (highlightedElements.value) {
      highlightedElements.value[highlightedElementNumber.value - 1]?.scrollIntoView()
    }
  }

  watch(highlightedElementNumber, scrollToHighlightedElement)


  return { logs, addLogs, searchQuery, filterOption, filteredLogs, highlightedElementNumber, setHighlightedElementNumber, logWindow, highlightText, highlightedElements, disconnectLogs }
})