<template>
  <div v-if="currentSale" class="edit-form">
    <h4>存貨清單</h4>
    <form>
      <div class="form-group">
        <label for="customerName">顧客名稱</label>
        <input type="text" class="form-control" id="customerName"
          v-model="currentSale.customerName"
        />
      </div>
      <div class="form-group">
        <label for="productName">項目</label>
        <input type="text" class="form-control" id="productName"
          v-model="currentSale.productName"
        />
      </div>
      <div class="form-group">
        <label for="price">價格</label>
        <input type="text" class="form-control" id="price"
          v-model="currentSale.price"
        />
      </div>
      <div class="form-group">
        <label for="quentity">數量</label>
        <input type="text" class="form-control" id="quentity"
          v-model="currentSale.quentity"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentSale.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentSale.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteSale"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateSale"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Sale...</p>
  </div>
</template>

<script>
import SaleDataService from "../services/SaleDataService";

export default {
  name: "Sale",
  data() {
    return {
      currentSale: null,
      message: ''
    };
  },
  methods: {
    getSale(id) {
      SaleDataService.get(id)
        .then(response => {
          this.currentSale = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentSale.id,
        customerName: this.currentSale.tradeNames,
        productName: this.currentSale.productName,
        price: this.currentSale.price,
        quentity: this.currentSale.quentity,
        published: status
      };

      SaleDataService.update(this.currentSale.id, data)
        .then(response => {
          console.log(response.data);
          this.currentSale.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSale() {
      SaleDataService.update(this.currentSale.id, this.currentSale)
        .then(response => {
          console.log(response.data);
          this.message = 'The Sale was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteSale() {
      SaleDataService.delete(this.currentSale.id)
        .then(response => {
          console.log(response.data);
          this.$router.push("/sales")
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getSale(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
