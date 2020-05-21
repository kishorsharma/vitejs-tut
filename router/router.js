import {createRouter, createWebHistory} from 'vue-router';

import Home from '../page/Home.vue';
import Profile from '../page/Profile.vue';
import Login from '../page/Login.vue';
import auth from '../middleware/auth';
import updatejwt from '../middleware/updatejwt';

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/sso-login',
        name: 'SSO-Login',
        component: Home,
        meta: {
            middleware: updatejwt
        }
    }, {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            middleware: auth
        }
    }]
});

router.beforeEach((to, from, next) => {
    console.log('to: ', to);
    console.log('from: ', from);
    if (!to.meta.middleware) {
        return next()
    }
    to.meta.middleware({
        next,
        router,
        to, 
        from,
    })
})

export default router;