class Observer {
  //   update() {}
  //   constructor() {
  //     this.id = '';
  //   }

  id = '';

  addMarkUp(id, parent, offerMarkup) {
    const range = document.createRange();
    let frag = '';
    const appCont = document.getElementById(parent);
    // console.log('^^^^ appCont', appCont);
    range.selectNode(appCont);

    frag = range.createContextualFragment(offerMarkup);

    if (id) {
      this.id = id;
      // console.log('****OfferForm', frag);
      appCont.appendChild(frag);
    } else {
      // console.log('this.id', this.id, 'appCont', appCont);
      const currentComp = document.getElementById(this.id);
      // if the component does not exist on the Dom then we
      // cannot replace the child
      if (currentComp) {
        // console.log('***currentId', frag);
        // console.log('currentComp', currentComp);
        appCont.replaceChild(frag, currentComp);
      }
    }
  }
}
export default Observer;
