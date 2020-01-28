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
   * @param {*} isHidden
   * @returns string
   * @memberof Offer
   */
  createMarkup(state, i, child, isHidden) {
    // id should be the id from server
    const hid = isHidden ? 'hidden' : '';
    const { warranties, selectedWarranty } = state;

    return (
      warranties &&
      `<form class='' ${hid} id=${i}>${warranties
        .map(war => {
          const isWarrantySelected = selectedWarranty === `war-input-${war.id}`;
          const isChecked = isWarrantySelected ? 'checked' : '';
          /* eslint-disable */
          return `
          <div class="rowOfferSpaceBtwn ${
            isWarrantySelected ? 'labelPrplBackground' : 'labelBackground'
          }">
            <div>
                <input id=${`war-input-${war.id}`} ${isChecked} type='radio' value=${`war-input-${war.id}`}  name=${`war-input`} />
                <label for=${`war-input-${war.id}`}>${
            war.years
          } Year Protection Plan </label>
            </div>
            <div>    
              <div class='bold' id=${`war-input-${war.id}`}> $${
            war.price
          } </div>
            </div>
          </div>`;
        })
        .join('\n')}</form>`
      /* eslint-enable */
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
    const offerComponentId = id || this.id;
    const { componentIdParentChild } = state;
    const { isHidden, parent, child } = componentIdParentChild[
      offerComponentId
    ];
    const componentMarkup = this.createMarkup(
      state,
      offerComponentId,
      child,
      isHidden
    );
    this.addMarkUp(id, id || parent, componentMarkup);
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
