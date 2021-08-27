import { createApp } from 'vue'
import Maska from 'maska'
import App from './App.vue'
import './css/app.css'
import GlobalMixin from './mixins/GlobalMixin'

const app = createApp(App)

app.use(Maska);

app.mixin(GlobalMixin)

app.mount('#app')