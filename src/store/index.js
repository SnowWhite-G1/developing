import { observable, action } from "mobx";

class Index {
  @observable count = 1;
  @action setCount() {
    this.count = this.setCount + 1;
  }
}

const STORE = new Index();

export default STORE;
