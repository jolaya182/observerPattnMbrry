/* eslint-disable class-methods-use-this */
/**
 * title: Offer.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this component handles the list of warranties that will be displayed or hidden
 */
import Observer from '../lib/Observer';

/**
 *
 *
 * @class Offer
 * @extends {Observer}
 */
class Offer extends Observer {
  /**
   * creates the dom element that this component will render
   *
   * @param {*} state
   * @param {*} i
   * @param {*} child
   * @param {*} isHid
   * @returns string
   * @memberof Offer
   */
  createMarkup(state, i, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    const { warranties, selectedWar } = state;

    return (
      warranties &&
      `<form ${hid} id=${i}>${warranties
        .map(war => {
          const isSelected = selectedWar === `war-input-${war.id}`;
          const isChecked = isSelected ? 'checked' : '';
          return `<div class="rowOfferSpaceBtwn ${
            isSelected ? 'labelPrplBackground' : 'labelBackground'
          }" >
                  <div>
                      <input id=${`war-input-${war.id}`} ${isChecked} type='radio' value=${`war-input-${war.id}`}  name=${`war-input`} />
                      <label for=${`war-input-${war.id}`}>${
            war.years
          } Year Protection Plan </label>
                  </div>
                  <div>    
                      <div class='bold' id=${`war-input-${war.id}`}>$${
            war.price
          } </div>
                      </div>
                  </div>`;
        })
        .join('\n')}</form>`
    );
  }

  /**
   * will either append or update the a dom element
   *
   * @param {*} state
   * @param {*} id
   * @memberof Offer
   */
  render(state, id) {
    const renderingId = id || this.id;
    let offerMarkup = '';
    const { compIdPrnCh } = state;
    const { isHid, parent, child } = compIdPrnCh[renderingId];
    offerMarkup = this.createMarkup(state, renderingId, child, isHid);
    this.addMarkUp(id, id || parent, offerMarkup);
  }

  /**
   * will bind the actions to the dom elements directly or through event delagation
   *
   * @param {*} state
   * @memberof Offer
   */
  update(state) {
    this.render(state);
  }
}

export default Offer;
