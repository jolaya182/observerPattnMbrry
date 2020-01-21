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
   * @param {*} isHidden
   * @returns string
   * @memberof OfferForm
   */
  createMarkup(state, id, child, isHidden) {
    // id should be the id from server
    const hid = isHidden ? 'hidden' : '';
    const { coverageDetails } = state;
    let productPrice = 'Product Price';
    if (coverageDetails && coverageDetails[0].productPrice) {
      productPrice = coverageDetails[0].productPrice;
    }

    return `
    <div ${hid} id=${id} class='OfferForm'}> 
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
    const offerFormComponentId = id || this.id;
    const { componentIdParentChild } = state;
    const { isHidden, parent, child } = componentIdParentChild[
      offerFormComponentId
    ];

    const componentMarkup = this.createMarkup(
      state,
      offerFormComponentId,
      child,
      isHidden
    );

    this.addMarkUp(id, parent, componentMarkup);

    if (!isHidden) this.bind(state, child);
  }

  /**
   *
   * will bind the actions to the dom elements directly or through event delagation
   * @param {*} state
   * @param {*} child
   * @memberof OfferForm
   */
  bind(state, child) {
    const AddToCartButton = document.getElementById('offerFormBtnAddToCart');
    const offerFormComponent = document.getElementById(this.id);

    AddToCartButton.addEventListener('click', e => {
      e.preventDefault();
      // get the component that will be swapped
      const childComp = offerFormComponent.childNodes[9];
      // checks if the clicked element is the offer component
      if (childComp.id === child) {
        // these are the form elements
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
    offerFormComponent.addEventListener('click', e => {
      // go through all the target's nodes and find the checked radio
      const formElem = e.currentTarget;
      const { childNodes } = formElem;
      childNodes.forEach(node => {
        if (node.id === child) {
          // these are the form elements
          const { elements } = node;
          for (let indx = 0; indx < elements.length; indx += 1) {
            if (elements[indx].checked) {
              this.appState.update({
                ...this.appState.get(),
                selectedWarranty: elements[indx].id
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
