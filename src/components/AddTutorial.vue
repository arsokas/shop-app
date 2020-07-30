<template>
  <v-container>
    <v-form>
      <div v-if="!submitted">
        <v-text-field v-model="tutorial.name" label="Name" required id="name"></v-text-field>
        <v-text-field v-model="tutorial.description" label="Description" required id="description"></v-text-field>
        <v-text-field v-model="tutorial.price" label="Price (DKK)" type="number" id="price"></v-text-field>
        <v-text-field v-model="tutorial.img" label="Image Link" required id="img"></v-text-field>

        <v-btn color="success" class="mr-4" @click="saveTutorial">Submit</v-btn>
      </div>

      <div v-else>
        <h4>You submitted successfully!</h4>
        <v-btn color="success" class="mr-4" @click="newTutorial">Add</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        name: "",
        description: "",
        price: "",
        img: "",
        quantity: 0,
      },
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        name: this.tutorial.name,
        description: this.tutorial.description,
        price: this.tutorial.price,
        img: this.tutorial.img,
        quantity: this.tutorial.quantity,
      };

      TutorialDataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
