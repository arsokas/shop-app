<template>
  <!-- <div class="list row"> -->
  <!-- <div class="col-md-8">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
            </div>
          </div>
  </div>-->
  <!-- <div class="col-md-6">
      <h4>Product/Pizza List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >{{ tutorial.name }} - {{tutorial.description}}</li>
      </ul>

      
  </div>-->
  <v-container>
    <v-flex d-flex>
      <v-layout wrap>
        <v-flex md3 v-for="tutorial in tutorials" :key="tutorial._id">
          <v-card class="mb-4 mx-auto" max-width="300">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="tutorial.img"
              alt="tutorial.name"
            ></v-img>

            <v-card-subtitle class="pb-0">{{ tutorial.name }} - {{tutorial.price}} DKK</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ tutorial.description }}</div>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn @click="removeFromCart(tutorial)" class="mx-3" dark small color="green">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <div>{{ tutorial ? tutorial.quantity: 0}}</div>
              <v-btn @click="addToCart(tutorial)" class="mx-3" dark color="green">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- <v-btn color="success" class="mr-4" @click="removeAllTutorials">Remove All</v-btn> -->
  </v-container>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  props: ["tutorials"],
  data() {
    return {
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    // retrieveTutorials() {
    //   TutorialDataService.getAll()
    //     .then((response) => {
    //       this.tutorials = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    addToCart(tutorial) {
      this.$emit("addToCart", tutorial);
    },
    removeFromCart(tutorial) {
      this.$emit("removeFromCart", tutorial);
    },

    refreshList() {
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // searchTitle() {
    //   TutorialDataService.findByTitle(this.title)
    //     .then((response) => {
    //       this.tutorials = response.data;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>