import { createWebHistory, createRouter } from "vue-router";

// layouts
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

// middleware
import runMiddleware from '@/middleware'

const routes = [
    {
        path: `/${process.env.VUE_APP_ADMIN_PREFIX}`,
        redirect: `/${process.env.VUE_APP_ADMIN_PREFIX}/dashboard`,
        component: Admin,
        meta: {
            middleware: ['auth', 'can:access_admin']
        },
        children: [
            {
                path: 'dashboard',
                name: 'admin.dashboard',
                component: Dashboard,
            },
            {
                path: 'settings',
                name: 'admin.settings',
                component: Settings,
                meta: {
                    middleware: ['can:access_settings']
                }
            },
            {
                path: 'tables',
                name: 'admin.tables',
                component: Tables,
                meta: {
                    middleware: ['can:access_tables']
                }
            },
            {
                path: 'maps',
                name: 'admin.maps',
                component: Maps,
            },
        ],
    },
    {
        path: "/auth",
        redirect: "/auth/login",
        component: Auth,
        children: [
            {
                path: "/auth/login",
                name: 'login',
                component: Login,
            },
            {
                path: "/auth/register",
                name: 'register',
                component: Register,
            },
        ],
    },
    {
        path: "/landing",
        component: Landing,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/",
        component: Index,
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        runMiddleware({from, to, next, router, middleware: to.meta.middleware})
    } else {
        next()
    }
})

export default router