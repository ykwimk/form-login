import { observable, action } from 'mobx';

export default class UserStore {
  @observable token = '';

  @action
  setAuth = (data) => {
    this.token = data;
  };
}
