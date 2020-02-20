import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/main";
import { db } from "@/main";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      children: [
        {
          path: 'for_her',
          name: 'for_her',
          component: () => import('@/views/ForHer')
        },
        {
          path: 'good/:id',
          name: 'show_good',
          component: () => import('@/views/ShowGood'),
          props: true,
          beforeEnter(routeTo, routeFrom, next) {
            db.collection('sneackers')
              .doc(routeTo.params.id)
              .get()
              .then(sneacker => {
                routeTo.params.sneacker = sneacker
                next()
              })
          }
        },
        {
          path: 'for_him',
          name: 'for_him',
          component: () => import('@/views/ForHim')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Login')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Register')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Profile'),
          meta: { isAuth: true }
        },
        {
          path: 'filters',
          name: 'filters_mimn',
          component: () => import('@/components/filter_min/FiltersMin'),
          children: [
            {
              path: 'choice',
              name: 'choice',
              component: () => import('@/components/filter_min/Choice')
            },
            {
              path: 'designers',
              name: 'designers',
              component: () => import('@/components/filter_min/Designers')
            },
            {
              path: 'sizes',
              name: 'sizes',
              component: () => import('@/components/filter_min/Sizes')
            }
          ]
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/Admin'),
      children: [
        {
          path: 'login',
          name: 'admin_login',
          component: () => import('@/components/admin/Login'),
        },
        {
          path: 'add_admin',
          name: 'add_admin',
          component: () => import('@/components/admin/AddAdmin'),
          meta: { isAuth: true, isAdmin: true }
        },
        {
          path: 'add_goods',
          name: 'add_goods',
          component: () => import('@/views/admin/AddGoods'),
          meta: { isAuth: true, isAdmin: true },
          children: [
            {

              path: 'edit/:id',
              name: 'edit_good',
              component: () => import('@/components/admin/addGoods/Edit'),
              meta: { isAuth: true, isAdmin: true },
              props: true,
              beforeEnter(routeTo, routeFrom, next) {
                db.collection('sneackers')
                  .doc(routeTo.params.id)
                  .get()
                  .then(sneacker => {
                    routeTo.params.sneacker = sneacker
                    next()
                  })
              }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(user => {
    if (to.matched.some(record => record.meta.isAuth) && !user) next("/")
    else next()

    if (to.matched.some(record => record.meta.isAdmin) && user) {
      user.getIdTokenResult().then(idTokenResult => {
        if (idTokenResult.claims.admin) next()
        else next("/")
      })
    }
  })
})

export default router
