import Subject from './Subject';

class State extends Subject {
  constructor() {
    super();
    this.state = {
      warranties: [],
      currComponent: 'coverageForm1',
      selectedWar: {},
      compIdPrnCh: {}
    };
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    // console.log('data this1.state', this.state);

    this.notify(this.state);
  }

  get() {
    return this.state;
  }
}
export default State;
