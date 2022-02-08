<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by ProductName"
          v-model="productName"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>銷貨紀錄</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
          
        >
          銷貨編號{{ tutorial.id }}: {{ tutorial.productName }}
        </li>
      </ul>


      <button class="m-3 btn btn-sm btn-primary" @click="jump">
        銷貨
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentSale">
        <h4>銷貨</h4>
        <div>
          <label><strong>SalesId:</strong></label> {{ currentSale.id }}
        </div>
        <div>
          <label><strong>CustomerNames:</strong></label> {{ currentSale.customerName }}
        </div>
        <div>
          <label><strong>ProductName:</strong></label> {{ currentSale.productName }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentSale.price }}
        </div>
        <div>
          <label><strong>Quentity:</strong></label> {{ currentSale.quentity }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentSale.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/sales/' + currentSale.id" class="badge badge-warning">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SaleDataService from "../services/SaleDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentSale: null,
      currentIndex: -1,
      productName: "",
    };
  },
  methods: {
    jump(){
      this.$router.push("/addSale")
    }
    ,
    retrieveTutorials() {
      SaleDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentSale = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentSale = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
      SaleDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      SaleDataService.findByProductName(this.productName)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
