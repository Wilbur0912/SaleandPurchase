import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/Inventories");
  }

  get(id) {
    return http.get(`/Inventories/${id}`);
  }

  create(data) {
    return http.post("/Inventories", data);
  }

  update(id, data) {
    return http.put(`/Inventories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Inventories/${id}`);
  }

  deleteAll() {
    return http.delete(`/Inventories`);
  }

  findByProductName(productName) {
    return http.get(`/Inventories?productName=${productName}`);
  }
}

export default new TutorialDataService();
