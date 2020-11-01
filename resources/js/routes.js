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
    // {
    //     path: '/redirect',
    //     component: Layout,
    //     hidden: true,
    //     children: [
    //         {
    //         path: '/redirect/:path(.*)',
    //         component: require('./views/redirect/index').default
    //         }
    //     ]
    // },
    {
        path: "/",
        name: "home",
        component: require("./views/Home").default,
        meta: { title: 'Inicio', noCache:true, affix: true },
        progress: {
            func: [
                {
                    call: "color",
                    modifier: "temp",
                    argument: "#ffb000"
                },
                { call: "fail", modifier: "temp", argument: "#6e0000" },
                { call: "location", modifier: "temp", argument: "top" },
                {
                    call: "transition",
                    modifier: "temp",
                    argument: {
                        speed: "1.5s",
                        opacity: "0.6s",
                        termination: 400
                    }
                }
            ]
        }
    },
    {
        path: "/personas",
        name: "people",
        component: require("./views/Personas").default,
        meta: { title: 'Personas', noCache: true, affix: true, icon: 'lock' },
        progress: {
            func: [
                {
                    call: "color",
                    modifier: "temp",
                    argument: "#ffb000"
                },
                { call: "fail", modifier: "temp", argument: "#6e0000" },
                { call: "location", modifier: "temp", argument: "top" },
                {
                    call: "transition",
                    modifier: "temp",
                    argument: {
                        speed: "1.5s",
                        opacity: "0.6s",
                        termination: 400
                    }
                }
            ]
        }
    },
    {
        path: "/admin/products",
        name: "products_admin",
        component: require("./views/Products").default,
        meta: {
            title: 'ProductosListado',
            noCache: true,
            affix: true,
            icon: 'dashboard',
            progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    },
    {
        path: "/admin/categorias",
        name: "category_admin",
        component: require("./views/Categories").default,
        meta: {
        title: 'Categorias',
        noCache: true,
        affix: true,
            progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    },
    {
        path: "/category/:category",
        name: "category_show",
        component: require("./views/CategoryShow").default,
        meta: {
            noCache: false,
            affix: false,
                progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    },
    {
        path: "/product/:product",
        name: "product_show",
        component: require("./views/ProductShow").default,
        meta: {
            progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    },
    {
        path: "/admin/products/:id/images",
        name: "images_show",
        component: require("./views/ImagesShow").default,
        meta: {
            noCache: false,
            affix: false,
            progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    },
    {
        path: "/carrito/detalles",
        name: "cart_details",
        title: 'DetallesCarrito',
        noCache: true,
        affix: true,
        component: require("./views/CartDetails").default,
        meta: {
            progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "#ffb000"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    },
    // Siempre encima de esta ruta
    {
        path: "*",
        component: require("./views/404").default,
        meta: {
            noCache: false,
            affix: false,
            progress: {
                func: [
                    {
                        call: "color",
                        modifier: "temp",
                        argument: "red"
                    },
                    { call: "fail", modifier: "temp", argument: "#6e0000" },
                    { call: "location", modifier: "temp", argument: "top" },
                    {
                        call: "transition",
                        modifier: "temp",
                        argument: {
                            speed: "1.5s",
                            opacity: "0.6s",
                            termination: 400
                        }
                    }
                ]
            }
        }
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  
  const router = createRouter()
  
  // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
  export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
  
  export default router
