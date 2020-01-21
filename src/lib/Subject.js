/* eslint-disable consistent-return */
/**
 * title: Subject.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this class handles the state of the entire application
 */
/**
 *
 *
 * @class Subject
 */
class Subject {
  constructor() {
    this.observers = [];
  }

  /**
   * adds objects to the state
   *
   * @param {*} obs
   * @memberof Subject
   */
  addObserver(obs) {
    this.observers.push(obs);
  }

  /**
   * delete objects to the state
   *
   * @param {*} obs
   * @memberof Subject
   */
  deleteObserver(obs) {
    const foundIndex = this.observers.findIndex(obsrvr => {
      return obsrvr === obs;
    });
    if (foundIndex !== -1) {
      this.observers = this.observers.splice(foundIndex, 1);
    }
  }

  /**
   * goes throug all observable and inovoke the update method on
   * each one of them
   *
   * @param {*} state
   * @memberof Subject
   */
  notify(state) {
    const { compIdPrnCh } = state;
    if (this.observers.length > 0) {
      // we must update exact the parent elem on the dom first
      // so it can exist and therefore render
      // the children of that dom element

      // eslint-disable-next-line array-callback-return
      const chldrn = this.observers.filter(obs => {
        obs.update(state);
        if (!compIdPrnCh[obs.id].child) {
          return obs;
        }
        obs.update(state);
      });
      chldrn.forEach(child => {
        child.update(state);
      });
    }
  }
}

export default Subject;
