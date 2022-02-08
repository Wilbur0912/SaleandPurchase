<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="id">ID</label>
        <input
          type="text"
          class="form-control"
          id="id"
          required
          v-model="tutorial.id"
          name="id"
        />
      </div>
      <div class="form-group">
        <label for="tradeNames">廠商名稱</label>
        <input
          type="text"
          class="form-control"
          id="tradeNames"
          required
          v-model="tutorial.tradeNames"
          name="tradeNames"
        />
      </div>

      <div class="form-group">
        <label for="productName">項目</label>
        <input
          class="form-control"
          id="productName"
          required
          v-model="tutorial.productName"
          name="productName"
        />
      </div>
      <div class="form-group">
        <label for="price">價格</label>
        <input
          class="form-control"
          id="price"
          required
          v-model="tutorial.price"
          name="price"
        />
      </div>
      <div class="form-group">
        <label for="quentity">數量</label>
        <input
          class="form-control"
          id="quentity"
          required
          v-model="tutorial.quentity"
          name="quentity"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: "",
        tradeNames: "",
        productName: "",
        price: "",
        quentity: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        id: this.tutorial.id,
        tradeNames: this.tutorial.tradeNames,
        productName: this.tutorial.productName,
        price: this.tutorial.price,
        quentity: this.tutorial.quentity,
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push("/tutorials")
        })
        .catch(e => {
          console.log(e);
      });
      
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
