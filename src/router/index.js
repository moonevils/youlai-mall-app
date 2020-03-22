import Vue from 'vue'
import Router from 'vue-router'


// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes: [{
        path: '/',
        redirect: '/dashboard',
        meta: {
            //是否缓存数据
            keepAlive: true
        }
    }, {
        // 主框架页面
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        children: [{
            path: '/dashboard',
            redirect: '/dashboard/home',
            meta: {
                keepAlive: true
            }
        }, {
            path: 'home',
            name: 'home',
            component: () => import("@/views/home"),
            meta: {
                keepAlive: true
            }
        }, {
            path: 'category',
            name: 'category',
            component: () => import("@/views/category"),
            meta: {
                keepAlive: true
            }
        }, {
            path: 'cart',
            name: 'cart',
            component: () => import("@/views/cart"),
            meta: {
                keepAlive: true
            }
        }, {
            path: 'user',
            name: 'user',
            component: () => import("@/views/user"),
            children: [{
                path: 'order',
                name: 'userOrder',
                component: () => import("@/views/user/order")
            }]
        }, {
            // 商品详情页
            path: 'goodsDetail',
            name: 'goodsDetail',
            component: () => import("@/components/goodsDetail")
        }]
    },
        {
            // 订单
            path: '/order',
            name: 'order',
            component: () => import("@/views/order"),
            children: [{
                path: 'address',
                name: 'addressIndex',
                component: () => import("@/views/order/address"),

                children: [{
                    path: 'add',
                    name: 'addAddress',
                    component: () => import("@/views/order/address/add")
                }, {
                    path: 'edit',
                    name: 'editAddress',
                    component: () => import("@/views/order/address/edit")
                }]
            }, {
                path: 'payment',
                name: 'orderPayment',
                component: () => import("@/views/order/payment"),
                children: [{
                    path: 'result',
                    name: 'paymentResult',
                    component: () => import("@/views/order/payment/result")
                }]
            }]
        },
        {
            // 登录
            path: '/login',
            name: 'login',
            component: () => import("@/views/login")
        }
    ]

})


export default router