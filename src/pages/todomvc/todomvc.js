import Vue from 'vue'
import store from './store'
import App from './components/App'
import './todomvc.css'

new Vue({
    el:'#app',
    store,
    render:h=>h(App)
})