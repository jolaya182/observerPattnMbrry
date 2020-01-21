/**
 * title: State.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this component is called to update the
 * current state of the application
 */
import Subject from './Subject';

/**
 *
 *
 * @class State
 * @extends {Subject}
 */
class State extends Subject {
  constructor() {
    super();
    this.state = {
      warranties: [],
      coverageDetails: [],
      currComponent: 'coverageForm1',
      selectedWar: false,
      compIdPrnCh: {},
      visibleProducts: {},
      visiblePolicyDetails: {}
    };
  }

  /**
   * The function will update the old state with the incoming state
   * and trigger to update all other observers with this nee state
   *
   * @param {*} [data={}]
   * @memberof State
   */
  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  /**
   * returns the current state of the application
   *
   * @returns object
   * @memberof State
   */
  get() {
    return this.state;
  }
}
export default State;
