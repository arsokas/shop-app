<template>
  <v-container>
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://i.imgur.com/mc0waJE.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              Shopping Cart
              <v-icon>fas fa-shopping-cart</v-icon>
            </v-btn>
            <span class="total-quantity">{{ totalQuantity }}</span>
          </template>
          <v-list width="300px" style="position:relative;">
            <v-list-item v-if="totalQuantity == 0"
              >Your cart is empty</v-list-item
            >
            <v-list-item v-for="(product, index) in cart" :key="product.id">
              <v-list-item-title>
                <div class="font-weight-black">
                  {{ index + 1 }}. {{ product.name }} ({{ product.quantity }}x)
                </div>
                <div class="text-end">
                  Price:
                  {{ product.price * product.quantity }} DKK
                </div>
                <v-divider></v-divider>
              </v-list-item-title>
            </v-list-item>
            <div
              v-if="totalQuantity"
              class="text-center font-weight-black mt-1"
            >
              Total: <span>{{ getTotal }} DKK</span>
            </div>

            <v-row justify="center" v-if="totalQuantity !== 0">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="green mx-4 mt-4 mb-1"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Pay and Order
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline"
                      >Order Information at Arvis Pizza</span
                    >
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="First name*"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="Last name*"
                            persistent-hint
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="Phone Number*"
                            type="text"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Adress(Street Name, House and Flat Number)*"
                            type="text"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="deliveryType"
                            label="Order Type*"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-autocomplete
                            :items="times"
                            label="Order/Delivery Time*"
                            required
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Comment for restaurant or delivery"
                            type="text"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="paymentType"
                            label="Payment Type*"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <div>
                            <p class="text-center">
                              <span class="priceLabel"
                                >Total Payment: {{ getTotal }} DKK </span
                              >({{ totalQuantity }}x pizza)
                            </p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" dark @click="dialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn color="green" dark @click="dialog = false"
                      >Proceed to Payment</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logoname.png')"
          class="my-3"
          contain
          height="80"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Pizza Menu
        </h1>

        <p class="subheading font-weight-regular">
          Choose a product and add it or
          <br />remove it from the shopping cart
        </p>
      </v-col>
    </v-row>

    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md3 v-for="product in products" :key="product.id">
          <v-card class="mb-4 mx-auto" max-width="300">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="product.img"
              alt="product.name"
            >
            </v-img>

            <v-card-subtitle class="pb-0">{{ product.name }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.description }}</div>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                @click="updateCart(product, 'subtract')"
                class="mx-3"
                dark
                small
                color="green"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <div>{{ product.quantity }}</div>
              <v-btn
                @click="updateCart(product, 'add')"
                class="mx-3"
                dark
                color="green"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "ProductsComponent",

  data: () => ({
    products: [
      {
        id: 1,
        name: "Margherita",
        description:
          "Italian sausage, pesto, feta cheese, bell peppers, tomato sauce",
        price: 10,
        img: "https://i.imgur.com/7uVYUlY.jpg",
        quantity: 0,
      },
      {
        id: 2,
        name: "Salami",
        description:
          "Ground beef, tomato sauce, mozzarella cheese, green pepper",
        price: 8,
        img: "https://i.imgur.com/EJq2okb.jpg",
        quantity: 0,
      },
      {
        id: 3,
        name: "Vegetarian",
        description:
          "Ricotta cheese, tomato sauce, fresh basil pesto, fresh olives",
        price: 17,
        img: "https://i.imgur.com/Z84g4Sb.jpg",
        quantity: 0,
      },
      {
        id: 4,
        name: "House Special",
        description: "Cherry tomatoes, bread flour, mozzarella, olive oil",
        price: 17,
        img: "https://i.imgur.com/27uOWcU.jpg",
        quantity: 0,
      },
    ],
    times: [
      "As soon as possible",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
    ],
    paymentType: ["Credit Card", "Mobile Pay"],
    deliveryType: [
      "Deliver home",
      "Pick up at restaurant",
      "Scheduled delivery home",
      "Scheduled pick up time in restaurant",
    ],
    dialog: false,
  }),
  computed: {
    cart() {
      return this.products.filter((product) => product.quantity > 0);
    },
    totalQuantity() {
      return this.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },

    getTotal() {
      return this.products.reduce((a, b) => a + b.price * b.quantity, 0);
    },
  },
  methods: {
    updateCart(product, updateType) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id) {
          if (updateType === "subtract") {
            if (this.products[i].quantity !== 0) {
              this.products[i].quantity--;
            }
          } else {
            this.products[i].quantity++;
          }

          break;
        }
      }
    },
  },
};
</script>

<style>
.total-quantity {
  -webkit-box-align: center;
  align-items: center;
  background: lightblue;
  border-radius: 50%;
  display: flex;
  font-weight: bold;
  height: 20px;
  justify-content: center;
  padding: 0.5rem;
  position: absolute;
  right: 20px;
  top: 13px;
  width: 20px;
  font-size: 14px;
}

.priceLabel {
  font-size: 18px;
  color: green;
  font-weight: bold;
}
</style>
