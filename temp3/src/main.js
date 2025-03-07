import Vue from 'vue';
import "amfe-flexible";
import App from './App.vue';
import router from './router';

import {
  Toast,
  Field,
  Button,
  Form,
  Popup,
  Icon,
  Checkbox, 
  CheckboxGroup,
  Progress,
  Tab,
  Tabs,
  List,
  Loading,
  CountDown,
  Overlay,
  Circle,
  Dialog,
} from "vant";

Vue.use(Toast)
  .use(Field)
  .use(Button)
  .use(Form)
  .use(Popup)
  .use(Icon)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Progress)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Loading)
  .use(CountDown)
  .use(Overlay)
  .use(Circle)
  .use(Dialog)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  created() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
