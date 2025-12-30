import { mount } from 'svelte'
import './style.css'
import './RatioKit.scss'
import StarterApp from './lib/RatioKit/StarterApp.svelte'

const app = mount(StarterApp, {
  target: document.getElementById('app')!,
})

export default app

