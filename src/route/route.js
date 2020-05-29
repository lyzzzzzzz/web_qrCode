import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Index from '../pages/Index.vue';
const routes = [
  
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Index },
]

export default routes