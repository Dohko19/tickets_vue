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
                   <!-- @guest
                                  <li class="nav-item">
                                      <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                  </li>
                                  @if (Route::has('register'))
                                      <li class="nav-item">
                                          <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                      </li>
                                  @endif -->
                  <!-- @else -->
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
                  <!-- <li class="nav-item dropdown" if="isAuthenticated">
                    <router-link
                      id="navbarDropdown"
                      class="nav-link dropdown-toggle"
                      :href="down"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      v-pre
                    > -->
                    <!-- {{ Auth::user()->name }} -->

                      <!-- <span class="caret">
                        {{ currentUser.name }}
                      </span>
                    </router-link>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <router-link
                        class="dropdown-item"
                        :to="{name: 'category_admin'}"
                      >Gestionar Categorias</router-link>
                      <router-link
                        class="dropdown-item"
                        :to="{name: 'products_admin'}"
                      >Gestionar Productos
                    </router-link> -->
                       <!-- <a class="dropdown-item" href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                      </form> -->
                    <!-- </div>
                  </li> -->
                  <!-- @endguest -->
                </ul>
              </div>
            </div>
          </nav>

  </div>
</template>
<script>
export default {
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
