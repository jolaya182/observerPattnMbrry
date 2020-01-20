class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(obs) {
    this.observers.push(obs);
  }

  deleteObserver(obs) {
    const foundIndex = this.observers.findIndex(obsrvr => {
      return obsrvr === obs;
    });
    if (foundIndex !== -1) {
      this.observers = this.observers.splice(foundIndex, 1);
    }
  }

  notify(state) {
    // console.log('notify state', state);
    const { compIdPrnCh } = state;
    if (this.observers.length > 0) {
      // we must update exact the parent elem on the dom first
      // so it can exist and therefore render
      // the children of that dom element
      const chldrn = this.observers.filter(obs => {
        obs.update(state);
        if (!compIdPrnCh[obs.id].child) {
          return obs;
        }
        obs.update(state);
      });
      // console.log('chldrn', chldrn);
      chldrn.forEach(child => {
        child.update(state);
      });
    }
  }
}

export default Subject;
