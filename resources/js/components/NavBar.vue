<template>
  <div>
      <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
              <router-link class="navbar-brand" :to="{name: 'home'}">Laravel</router-link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Barra de Navegacion"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'people'}">Personas</router-link>
                  </li>
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                <li :class="dropdownCart" class="nav-item" v-if="isAuthenticated">
                    <a @click="isDropdownOpenCart = ! isDropdownOpenCart"
                    class="nav-link dropdown-toggle"
                    :href="dropdown">
                    <span class="badge badge-light"><i style="font-size: 16px" class="fas fa-shopping-cart"></i></span>
                    <span class="badge badge-primary">{{ currentUser.cart.details.length }}</span>
                    </a>
                    <ul :class="isMenuCart" class="dropdown-menu-right" v-if="currentUser.admin == true ">
                        <router-link
                            class="dropdown-item"
                            :to="{name: 'cart_details'}"
                            @click.native="isDropdownOpenCart = ! isDropdownOpenCart"
                            >
                            Ver mas...
                        </router-link>
                    </ul>
                </li>
                <li :class="dropdownClasses" class="nav-item" v-if="isAuthenticated">
                    <a @click="isDropdownOpen = ! isDropdownOpen"
                    class="nav-link dropdown-toggle"
                    :href="dropdown">
                    <span class="glyphicons glyphicons-bell">{{ currentUser.name }}</span>
                    <span class="badge badge-light"></span>
                    </a>
                    <ul :class="isMenu" class="dropdown-menu-right" v-if="currentUser.admin == true ">
                        <router-link
                            class="dropdown-item"
                            :to="{name: 'category_admin'}"
                            @click.native="isDropdownOpen = ! isDropdownOpen"
                            >
                            Gestionar Categorias
                        </router-link>
                        <router-link
                            class="dropdown-item"
                            :to="{name: 'products_admin'}"
                            @click.native="isDropdownOpen = ! isDropdownOpen"
                        >
                            Gestionar Productos
                        </router-link>

                    </ul>
                    <ul :class="isMenu" class="dropdown-menu-right" v-else>
                        <router-link class="dropdown-item"
                            :to="{name: 'home'}"
                            @click.native="isDropdownOpen = ! isDropdownOpen">
                            Inicio
                        </router-link>
                    </ul>
                </li>
                <li v-else>
                    <a href="/login">Necesitas Iniciar sesion</a>
                </li>
                </ul>
              </div>
            </div>
          </nav>
<!--      <transition name="fade-transform" mode="out-in">-->
<!--          <keep-alive :include="cachedViews">-->
<!--              <router-view :key="key" />-->
<!--          </keep-alive>-->
<!--      </transition>-->
      <tags-view></tags-view>
      <breadcum></breadcum>
  </div>
</template>
<script>
import TagsView from './TagsView'

export default {
    components: {
        TagsView
    },
    data(){
        return{
            isDropdownOpen: false,
            isDropdownOpenCart: false,
        }
    },
    computed: {
           dropdownClasses(){
                return ['dropdown', this.isDropdownOpen ? 'show' : '']
            },
           dropdownCart(){
                return ['dropdown', this.isDropdownOpenCart ? 'show' : '']
            },
            isMenu(){
                return ['dropdown-menu', this.isDropdownOpen ? 'show' : '']
            },
            isMenuCart(){
                return ['dropdown-menu', this.isDropdownOpenCart ? 'show' : '']
            },
            dropdown(){
                return '#'
            }
        },
    mounted(){
        console.log('mounted');
    }
}
</script>
