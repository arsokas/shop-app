<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logoname.png')" class="my-3" contain height="80" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Pizza Menu</h1>

        <p class="subheading font-weight-regular">
          Choose a product and add it or
          <br />remove it from the shopping cart
        </p>
      </v-col>
    </v-row>
    <TutorialList
      v-bind:tutorials="tutorials"
      v-on:addToCart="addToCart"
      v-on:removeFromCart="removeFromCart"
    />
  </v-container>
</template>

<script>
import { deliveryTypes } from "../const/deliveryTypes";
import { deliveryTimes } from "../const/deliveryTimes";
import { paymentTypes } from "../const/paymentTypes";
import TutorialList from "../components/TutorialsList";
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "ProductsComponent",
  components: {
    TutorialList,
  },

  data: () => ({
    times: deliveryTimes,
    paymentType: paymentTypes,
    deliveryType: deliveryTypes,
    tutorials: [],
  }),

  computed: {
    cart() {
      return this.tutorials.filter((tutorial) => tutorial.quantity > 0);
    },
    totalQuantity() {
      return this.tutorials.reduce(
        (total, tutorial) => total + tutorial.quantity,
        0
      );
    },

    getTotal() {
      return this.cart.reduce((a, b) => a + b.price * b.quantity, 0);
    },
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addToCart(tutorial) {
      const tutorialToUpdate = this.tutorials.find(
        (p) => tutorial._id === p._id
      );
      tutorialToUpdate.quantity++;
    },
    removeFromCart(tutorial) {
      const tutorialToUpdate = this.tutorials.find(
        (p) => tutorial._id === p._id
      );
      if (tutorialToUpdate.quantity) {
        tutorialToUpdate.quantity--;
      }
    },
  },
  mounted() {
    this.retrieveTutorials();
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
