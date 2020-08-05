<template>
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
          <v-list-item v-if="totalQuantity == 0">Your cart is empty</v-list-item>
          <v-list-item v-for="(tutorial, index) in cart" :key="tutorial._id">
            <v-list-item-title>
              <div
                class="font-weight-black"
              >{{ index + 1 }}. {{ tutorial.name }} ({{ tutorial.quantity }}x)</div>
              <div class="text-end">
                Price:
                {{ tutorial.price * tutorial.quantity }} DKK
              </div>
              <v-divider></v-divider>
            </v-list-item-title>
          </v-list-item>
          <div v-if="totalQuantity" class="text-center font-weight-black mt-1">
            Total:
            <span>{{ getTotal }} DKK</span>
          </div>

          <v-row justify="center" v-if="totalQuantity !== 0">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green mx-4 mt-4 mb-1" dark v-bind="attrs" v-on="on">Pay and Order</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Order Information at Arvis Pizza</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field label="First name*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Last name*" persistent-hint required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Email*" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Phone Number*" type="text" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Adress(Street Name, House and Flat Number)*"
                          type="text"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select :items="deliveryType" label="Order Type*" required></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete :items="times" label="Order/Delivery Time*" required></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="Comment for restaurant or delivery" type="text"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-select :items="paymentType" label="Payment Type*" required></v-select>
                      </v-col>
                      <v-col cols="12">
                        <div>
                          <p class="text-center">
                            <span class="priceLabel">Total Payment: {{ getTotal }} DKK</span>
                            ({{ totalQuantity }}x pizza)
                          </p>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" dark @click="dialog = false">Cancel</v-btn>
                  <v-btn color="green" dark @click="dialog = false">Proceed to Payment</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: "NavBarComponent",
  data: () => ({
    dialog: false,
  }),
};
</script>
