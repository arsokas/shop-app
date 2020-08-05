<template>
  <v-app>
    <v-main>
      <NavBar v-on:totalQuantity="totalQuantity()" />
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
import NavBar from "./components/NavBarComponent";

export default {
  name: "App",
  data: () => ({}),

  components: {
    ProductsComponent,
    FooterComponent,
    AddTutorial,
    TutorialList,
    NavBar,
  },
};
</script>
