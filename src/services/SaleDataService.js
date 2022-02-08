import http from "../http-common";

class SaleDataService {
  getAll() {
    return http.get("/Sales");
  }

  get(id) {
    return http.get(`/Sales/${id}`);
  }

  create(data) {
    return http.post("/Sales", data);
  }

  update(id, data) {
    return http.put(`/Sales/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Sales/${id}`);
  }

  deleteAll() {
    return http.delete(`/Sales`);
  }

  findByProductName(productName) {
    return http.get(`/Sales?productName=${productName}`);
  }
}

export default new SaleDataService();
