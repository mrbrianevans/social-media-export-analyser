import App from './App.svelte'
import './global.scss'
import { registerSW } from 'virtual:pwa-register'
import topicsWasm from 'fast-topics/dist/topics.wasm?url'
import { initialiseWasm } from 'fast-topics'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('Website needs to be refreshed to get latest content')
  },
  onOfflineReady() {
    console.log('Service worker is offline ready')
  }
})
initialiseWasm(topicsWasm).then(() => console.log('fast-topics WASM ready'))

const app = new App({
  target: document.getElementById('app')
})

export default app
