import Vue from "vue";

import Router from "vue-router";

Vue.use(Router);

// export default new Router({
//     routes: [

//     ],
//     linkExactActiveClass: "active",
//     mode: "history",
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition;
//         } else {
//             return { x: 0, y: 0 };
//         }
//     }
// });

export const constantRoutes = [
    {
        path: '/redirect',
        component: require('./views/redirect/index').default,
        hidden: true,
        children: [
            {
            path: '/redirect/:path(.*)',
            component: require('./views/redirect/index').default
            }
        ]
    },
    {
        path: "/",
        name: "home",
        component: require("./views/Home").default,
        meta: { title: 'Inicio', affix: true
        },
    },
    {
        path: "/personas",
        name: "people",
        component: require("./views/Personas").default,
        meta: { title: 'Personas', affix: true, icon: 'lock'
        },
    },
    {
        path: "/admin/products",
        name: "products_admin",
        component: require("./views/Products").default,
        meta: {
            title: 'ProductosListado',
            affix: true,
            icon: 'dashboard'
        },
    },
    {
        path: "/admin/categorias",
        name: "category_admin",
        component: require("./views/Categories").default,
        meta: {
        title: 'Categorias',
        affix: true
        },
    },
    {
        path: "/category/:category(\\d+)",
        name: "category_show",
        component: require("./views/CategoryShow").default,
        meta: { noCache: true, title: 'Ver Categoria'
        },
        hidden: true,
    },
    {
        path: "/product/:product",
        name: "product_show",
        component: require("./views/ProductShow").default,
        meta:{
        }
    },
    {
        path: "/admin/products/:id/images",
        name: "images_show",
        component: require("./views/ImagesShow").default,
        meta: {

        }
    },
    {
        path: "/carrito/detalles",
        name: "cart_details",
        component: require("./views/CartDetails").default,
        meta: {
        }
    },
    // Siempre encima de esta ruta
    {
        path: "*",
        component: require("./views/404").default,
        meta: {
        }
    }
]

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0, x:0 }),
    routes: constantRoutes
  })

  const router = createRouter()

  // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
  export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }

  export default router
