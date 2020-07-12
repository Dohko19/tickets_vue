import Vue from "vue";

import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: require("./views/Home").default,
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
            path: "/personas",
            name: "people",
            component: require("./views/Personas").default,
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
            path: "/admin/products",
            name: "products_admin",
            component: require("./views/Products").default,
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
            path: "/admin/categorias",
            name: "category_admin",
            component: require("./views/Categories").default,
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
            path: "/category/:category",
            name: "category_show",
            component: require("./views/CategoryShow").default,
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
        }
    ],
    linkExactActiveClass: "active",
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
