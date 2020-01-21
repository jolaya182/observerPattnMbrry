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
   * @param {*} isHid
   * @returns string
   * @memberof CoverageForm
   */
  createMarkup(state, i, child, isHid) {
    const hid = isHid ? 'hidden' : '';

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
    const renderingId = id || this.id;
    let offerMarkup = '';
    const { compIdPrnCh } = state;
    const { isHid, parent, child } = compIdPrnCh[renderingId];

    offerMarkup = this.createMarkup(state, renderingId, child, isHid);

    this.addMarkUp(id, parent, offerMarkup);
    if (!isHid) this.bind(state);
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
    claimBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('send out the state', state);
      alert('Your Claim Has Been Submitted');
    });

    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
    });

    // event delegation added to find the selected product
    // add event listener to child then find productContainer
    coverageForm.addEventListener('click', e => {
      const currTar = e.target;
      const { childNodes } = document.querySelector('.productContainer');
      // const policies = document.querySelector('.productContainer').childNodes;
      let foundProduct = '';
      for (let ix = 0; ix < childNodes.length; ix += 1) {
        const ProductId = childNodes[ix].id;
        const currProduct = currTar.parentNode.parentNode.parentNode;

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
        }
      }

      for (let ix = 0; ix < childNodes.length; ix += 1) {
        if (childNodes[ix].id === `c${currTar.id}`) {
          foundProduct = childNodes[ix].id;
          const { visibleProducts } = state;
          visibleProducts[foundProduct] = visibleProducts[foundProduct]
            ? !visibleProducts[foundProduct]
            : true;
          this.appState.update({
            ...state,
            visibleProducts
          });
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
