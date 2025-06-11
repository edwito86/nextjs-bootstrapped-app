<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="fetchProducts">Refresh Products</v-btn>
        <v-data-table
          :headers="headers"
          :items="products"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Inventory</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">Add Product</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Add Product</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" v-model="valid">
                      <v-text-field v-model="newProduct.name" label="Name" required></v-text-field>
                      <v-text-field v-model="newProduct.description" label="Description"></v-text-field>
                      <v-text-field v-model.number="newProduct.stock" label="Stock" type="number" required></v-text-field>
                      <v-text-field v-model.number="newProduct.cost" label="Cost" type="number" required></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="addProduct" :disabled="!valid">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editProduct(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Stock', value: 'stock' },
        { text: 'Cost', value: 'cost' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dialog: false,
      valid: false,
      newProduct: {
        name: '',
        description: '',
        stock: 0,
        cost: 0,
      },
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/inventory/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async addProduct() {
      try {
        await axios.post('http://localhost:3000/api/inventory/products', this.newProduct);
        this.dialog = false;
        this.fetchProducts();
        this.newProduct = { name: '', description: '', stock: 0, cost: 0 };
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    editProduct(item) {
      // For simplicity, editing is not implemented yet
      alert('Edit functionality not implemented yet.');
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://localhost:3000/api/inventory/products/${id}`);
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
