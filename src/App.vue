<template>
  <v-app>
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

      <v-btn text>
        <span class="mr-2">Shopping cart</span>
        <v-icon>fas fa-shopping-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <ProductsComponent />
      <AddTutorial />
      <TutorialList />
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import ProductsComponent from "./components/ProductsComponent";
import FooterComponent from "./components/FooterComponent";
import AddTutorial from "./components/AddTutorial";
import TutorialList from "./components/TutorialsList";

export default {
  name: "App",

  components: {
    ProductsComponent,
    FooterComponent,
    AddTutorial,
    TutorialList,
  },

  data: () => ({
    //
  }),
};
</script>
