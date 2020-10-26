<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card text-center">
                        <div class="card-header">Carrito de Compras</div>
                        <div class="card-body">
                        <h5 class="card-title">Detalles</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover table-dark">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Categoria </th>
                                                <th>Comentarios/Detalles</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="cart in currentUser.cart.details" :key="cart.id">
                                                <td >
                                                    <img :src="cart.product.featured_image_url" width="50px" height="50px" alt="">
                                                </td>
                                                <td v-text="cart.product.name"></td>
                                                <td >${{cart.product.price}}</td>
                                                <td v-text="cart.quantity"></td>
                                                <td v-text="cart.product.category_name"></td>
                                                <td  v-text="cart.comment"></td>
                                                <td >
                                                    <router-link :to="{name: 'product_show',  params:{product: cart.product.id}}" class="btn btn-info btn-sm btn-circle"><i class="fa fa-eye"></i></router-link>
                                                    <button class="btn btn-danger btn-sm btn-circle"
                                                    rel="tooltip"
                                                    title="Eliminar"
                                                    @click="deleteItem(cart.id)"><i class="fas fa-times"></i></button>
                                                    <button @click="updateItem(cart)" class="btn btn-warning btn-sm btn-circle" title="Agregar mas Productos al Carrito"><i class="fas fa-cart-plus"></i></button>
                                                </td>
                                            </tr>
                                            <tr v-if="currentUser.cart.details==0">
                                                <td colspan="7">No hay productos</td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        deleteItem(id){
            axios.delete('/cart/'+id)
            .then(res => {
                toastr["info"]("Producto eliminado de tu carrito de compras", "Ok!");

            })
            .catch(err => {
                console.log(err)
            })
        },
        updateItem(cart)
        {
            console.log(cart);
        }
    }
}
</script>
<style>

.btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}

.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
}

</style>
