/* eslint-disable class-methods-use-this */
/**
 * title: OfferForm.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this component handles the displays of
 * the differents warranties offered
 */
import Observer from '../lib/Observer';
import mbBedPic from '../images/mbBedPic.png';

/**
 *
 *
 * @class OfferForm
 * @extends {Observer}
 */
class OfferForm extends Observer {
  constructor(state) {
    super();
    this.appState = state;
  }

  /**
   * creates the dom element that this component will render
   *
   * @param {*} state
   * @param {*} id
   * @param {*} child
   * @param {*} isHid
   * @returns string
   * @memberof OfferForm
   */
  createMarkup(state, id, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    const { coverageDetails } = state;
    let productPrice = 'Product Price';
    if (coverageDetails && coverageDetails[0].productPrice) {
      productPrice = coverageDetails[0].productPrice;
    }
    return `<div ${hid} id=${id} class='OfferForm'}> 
        <div class="rowOfferLeft"><div class='productPrice'> $${productPrice} <label class='line-through'> $2000</label></div></div>
        <div class="rowOffer"><div class='bold'> <img src=${mbBedPic}> </div></div>    
        <div class="rowOfferLeft"><div class='bold'> Add Extended Protection</div></div>
        <div class="rowOfferLeft"><div class='smallerText'> Powered by <label class="darkPLtr">Mulberry</label> <a href="https://getmulberry.com/customers"class='underLine'> Learn More</a></div></div>
        <div  class="rowOfferSpaceBtwn" ${hid} id=${child}>    
         
        </div> 
        <div class="rowOffer"><button class="rowOffer" id="offerFormBtnAddToCart" type='button'>Add to Cart </button></div>
    </div>`;
  }

  /**
   * will either append or update the a dom element
   *
   * @param {*} state
   * @param {*} id
   * @memberof OfferForm
   */
  render(state, id) {
    const renderingId = id || this.id;
    let offerMarkup = '';
    const { compIdPrnCh } = state;
    const { isHid, parent, child } = compIdPrnCh[renderingId];

    offerMarkup = this.createMarkup(state, renderingId, child, isHid);

    this.addMarkUp(id, parent, offerMarkup);

    if (!isHid) this.bind(state, child);
  }

  /**
   *
   * will bind the actions to the dom elements directly or through event delagation
   * @param {*} state
   * @param {*} child
   * @memberof OfferForm
   */
  bind(state, child) {
    const btn = document.getElementById('offerFormBtnAddToCart');
    const offerFor = document.getElementById(this.id);

    btn.addEventListener('click', e => {
      e.preventDefault();
      const offerF = document.getElementById(this.id);
      const childComp = offerF.childNodes[9]; // get the component that will be swapped
      if (childComp.id === child) {
        // if the child component exists then get the selected radio info
        const { elements } = childComp;
        for (let i = 0; i < elements.length; i += 1) {
          if (elements[i].type === 'radio' && elements[i].checked) {
            console.log(
              'elements[i].id',
              elements[i].id,
              'send out state',
              state
            );
            alert('Warranty Added To The Cart');
          }
        }
      }
    });

    // event delegation added to find the selected warranty
    offerFor.addEventListener('click', e => {
      const formElem = e.currentTarget;
      const { childNodes } = formElem;
      childNodes.forEach(node => {
        if (node.id === child) {
          const { elements } = node;
          for (let indx = 0; indx < elements.length; indx += 1) {
            if (elements[indx].checked) {
              this.appState.update({
                ...this.appState.get(),
                selectedWar: elements[indx].id
              });
            }
          }
        }
      });
    });
  }

  /**
   *
   *
   * @param {*} state
   * @memberof OfferForm
   */
  update(state) {
    this.render(state);
  }
}

export default OfferForm;
