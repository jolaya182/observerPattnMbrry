/* eslint-disable class-methods-use-this */

/**
 * title: CoverageForm.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this component handles the display and action bining for the
 * warranty coverage details
 */ import Observer from '../lib/Observer';

/**
 *
 *
 * @class CoverageForm
 * @extends {Observer}
 */
class CoverageForm extends Observer {
  constructor(state) {
    super();
    this.appState = state;
  }

  /**
   * creates the dom element that this component will render
   *
   * @param {*} state
   * @param {*} i
   * @param {*} child
   * @param {*} isHidden
   * @returns string
   * @memberof CoverageForm
   */
  createMarkup(state, i, child, isHidden) {
    const hid = isHidden ? 'hidden' : '';

    return `<div ${hid} id=${i}> 
    <div class='row'><label class='welcome bold'>Welcome Jason!</label></div>
    <div class='row'><label class='smallerText'>Hope you are having a great day</label></div>
    <div class='row darkPLtr'>Your Products</div>
    <div class='row' ${hid} id=${child}>
      
      </div>  
      <div class='rowOffer productContainer'><button class='rowOffer' id="coverageFormBtnFileAClaim" type="submit">FILE A CLAIM</button></div>
      <div class='rowOffer productContainer'><button class='rowOffer' id="coverageFormBtnCancelWarranty" type="submit">CANCEL WARRANTY</button></div>
  </div>`;
  }

  /**
   * will either append or update the a dom element
   *
   * @param {*} state
   * @param {*} id
   * @memberof CoverageForm
   */
  render(state, id) {
    const coverageFormComponentId = id || this.id;
    const { componentIdParentChild } = state;
    const { isHidden, parent, child } = componentIdParentChild[
      coverageFormComponentId
    ];

    const componentMarkup = this.createMarkup(
      state,
      coverageFormComponentId,
      child,
      isHidden
    );

    this.addMarkUp(id, parent, componentMarkup);
    if (!isHidden) this.bind(state);
  }

  /**
   * will bind the actions to the dom elements directly or through event delagation
   *
   * @param {*} state
   * @memberof CoverageForm
   */
  bind(state) {
    const claimBtn = document.getElementById('coverageFormBtnFileAClaim');
    const cancelBtn = document.getElementById('coverageFormBtnCancelWarranty');
    const coverageForm = document.getElementById(this.id);

    // trigger the claim button of the coverage form
    claimBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('send out the state', state);
      alert('Your Claim Has Been Submitted');
    });

    // trigger the cancel button of the coverage form
    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
      alert(' Claim Has Been canceled');
    });

    // add event listeners to track the components by using event delegation
    // to find the selected product or long policy details
    coverageForm.addEventListener('click', e => {
      const currTar = e.target;
      const { childNodes } = document.querySelector('.productContainer');
      let foundProduct = '';

      for (let ix = 0; ix < childNodes.length; ix += 1) {
        const ProductId = childNodes[ix].id;
        // on the coverage form, find the product clicked
        if (ProductId === `c${currTar.id}`) {
          foundProduct = ProductId;
          const { visibleProducts } = state;
          visibleProducts[foundProduct] = visibleProducts[foundProduct]
            ? !visibleProducts[foundProduct]
            : true;
          this.appState.update({
            ...state,
            visibleProducts
          });
          return;
        }
        const currProduct = currTar.parentNode.parentNode.parentNode;
        // if product was not clicked then find the long policy clicked
        if (ProductId === `${currProduct.id}`) {
          const foundPolicy = `co${currTar.id}`;
          const { visiblePolicyDetails } = state;
          visiblePolicyDetails[foundPolicy] = visiblePolicyDetails[foundPolicy]
            ? !visiblePolicyDetails[foundPolicy]
            : true;
          this.appState.update({
            ...state,
            visiblePolicyDetails
          });
          return;
        }
      }
    });
  }

  /**
   * will invoke this class's render method
   *
   * @param {*} state
   * @memberof CoverageForm
   */
  update(state) {
    this.render(state);
  }
}

export default CoverageForm;
