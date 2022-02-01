import App from './App.svelte'
import './global.scss'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('Website needs to be refreshed to get latest content')
  },
  onOfflineReady() {
    console.log('Service worker is offline ready')
  }
})

const app = new App({
  target: document.getElementById('app')
})

export default app
