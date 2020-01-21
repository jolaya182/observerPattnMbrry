/**
 * title: Observer.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this class is used to update and display a component's data
 */
/**
 *
 *
 * @class Observer
 */
class Observer {
  // method only serves as reference since it will be overriden
  // update() {}
  // }

  id = '';

  /**
   * It will determine if the document fragment needs to be appended or
   * replaced
   *
   * @param {*} id
   * @param {*} parent
   * @param {*} offerMarkup
   * @memberof Observer
   */
  addMarkUp(id, parent, offerMarkup) {
    const range = document.createRange();
    let frag = '';
    const appCont = document.getElementById(parent);
    range.selectNode(appCont);

    frag = range.createContextualFragment(offerMarkup);

    if (id) {
      this.id = id;
      appCont.appendChild(frag);
    } else {
      const currentComp = document.getElementById(this.id);
      // if the component does not exist on the Dom then we
      // cannot replace the child
      if (currentComp) {
        appCont.replaceChild(frag, currentComp);
      }
    }
  }
}
export default Observer;
