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
      <h4>存貨清單</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
          
        >
          商品編號{{ tutorial.id }}: {{ tutorial.productName }} 剩餘:{{ tutorial.quentity }}
        </li>
      </ul>


      <button class="m-3 btn btn-sm btn-primary" @click="jump">
        進貨
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>存貨</h4>
        <div>
          <label><strong>GoodId:</strong></label> {{ currentTutorial.id }}
        </div>
        <div>
          <label><strong>TradeNames:</strong></label> {{ currentTutorial.tradeNames }}
        </div>
        <div>
          <label><strong>ProductName:</strong></label> {{ currentTutorial.productName }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentTutorial.price }}
        </div>
        <div>
          <label><strong>Quentity:</strong></label> {{ currentTutorial.quentity }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      productName: "",
    };
  },
  methods: {
    jump(){
      this.$router.push("/add")
    }
    ,
    retrieveTutorials() {
      TutorialDataService.getAll()
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
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByProductName(this.productName)
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
