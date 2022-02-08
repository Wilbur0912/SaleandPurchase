<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="id">銷售ID</label><p></p>
        <input
            type="text"
            class="form-control"
            id="id"
            required
            v-model="sale.id"
            name="id"
          />
      </div>
      <div class="form-group">
        <label for="customerName">顧客名稱</label>
        <input
          type="text"
          class="form-control"
          id="customerName"
          required
          v-model="sale.customerName"
          name="customerName"
        />
      </div>

      <div class="form-group">
        <label for="productName">項目</label>
        <p></p>
        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="inventory" @change="selected()">  
            <option selected>Open this select menu</option>
            <option v-for="list in inventories" :value="list" :key="list.productName">{{list.productName}}-{{list.id}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="price">銷售價格</label>
        <input
          class="form-control"
          id="price"
          required
          v-model="sale.price"
          name="price"
        />
      </div>
      <div class="form-group">
        <label for="quentity">數量 {{remain}}</label>
        <input
          class="form-control"
          id="quentity"
          required
          v-model="sale.quentity"
          name="quentity"
        />
      </div>

      <button @click="savesale" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newsale">Add</button>
    </div>
  </div>
</template>

<script>
import saleDataService from "../services/SaleDataService";
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "add-sale",
  data() {
    return {
      sale: {
        id: "",
        customerName: "",
        productName: "",
        price: "",
        quentity: "",
        published: false
      },
      inventory: null,
      submitted: false,
      inventories: '',
      remain: '',
    };
  },
  created() {
    TutorialDataService.getAll()
      .then(response => {
        this.inventories = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    selected(){
      this.sale.price = this.inventory.price;
      this.sale.productName = this.inventory.productName;
      this.remain = "(剩餘數量: " + this.inventory.quentity + ")"
    },
    savesale() {
      var data = {
        id: this.sale.id,
        customerName: this.sale.customerName,
        productName: this.sale.productName,
        price: this.sale.price,
        quentity: this.sale.quentity,
      };
      this.inventory.quentity = parseFloat(this.inventory.quentity) - parseFloat(this.sale.quentity);
      console.log(this.inventory.quentity)
      TutorialDataService.update(this.inventory.id, this.inventory)
        .then(response => {
          console.log(response.data);
          this.message = 'The Sale was updated successfully!';
        })
        .catch(e => {
          console.log(e);
          console.log("errorrrr");
      });
      saleDataService.create(data)
        .then(response => {
          this.sale.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
          this.$router.push("/sales")
        })
        .catch(e => {
          console.log(e);
        });
      
    },
    newsale() {
      this.submitted = false;
      this.sale = {};
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
