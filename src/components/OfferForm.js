/* eslint-disable class-methods-use-this */
import Observer from '../lib/Observer';
import mbBedPic from '../images/mbBedPic.png';

class OfferForm extends Observer {
  constructor(state) {
    super();
    this.appState = state;
  }

  createMarkup(state, id, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    const { coverageDetails } = state;
    let productPrice = 'Product Price';
    if (coverageDetails && coverageDetails[0].productPrice) {
      productPrice = coverageDetails[0].productPrice;
    }
    // console.log('-->>isHid', isHid);
    return `<div ${hid} id=${id}> 
        <div class="rowOfferLeft"><div class='productPrice'> $${productPrice} <label class='line-through'> $2000</label></div></div>
        <div class="rowOffer"><div class='bold'> <img src=${mbBedPic}> </div></div>    
        <div class="rowOfferLeft"><div class='bold'> Add Extended Protection</div></div>
        <div class="rowOfferLeft"><div class='smallerText'> Powered by <label class="darkPLtr">Mulberry</label> <a href="https://getmulberry.com/customers"class='underLine'> Learn More</a></div></div>
        <div  ${hid} id=${child}>    
         
        </div> 
        <div class="rowOffer"><button class="rowOffer" id="offerFormBtnAddToCart" type='button'>Add to Cart </button></div>
    </div>`;
  }

  render(state, id) {
    const renderingId = id || this.id;
    let offerMarkup = '';
    const { compIdPrnCh } = state;
    const { isHid, parent, child } = compIdPrnCh[id || this.id];
    // console.log('isHid', isHid);

    offerMarkup = this.createMarkup(state, id || this.id, child, isHid);

    this.addMarkUp(id, parent, offerMarkup);

    if (!isHid) this.bind(state, child);
  }

  bind(state, child) {
    const btn = document.getElementById('offerFormBtnAddToCart');

    // console.log('btn', btn);
    btn.addEventListener('click', e => {
      e.preventDefault();
      // console.log('clicked offer the add to cart');
      const offerF = document.getElementById(this.id);
      const childComp = offerF.childNodes[9]; // get the component that will be swapped
      // console.log('childComp', childComp);
      if (childComp.id === child) {
        // if the child component exists then get the selected radio info
        const { elements } = childComp;
        // console.log('$$ elements', elements);
        for (let i = 0; i < elements.length; i += 1) {
          if (elements[i].type === 'radio' && elements[i].checked) {
            // console.log(elements[i].id);
            console.log(
              'elements[i].id',
              elements[i].id,
              'send out state',
              state
            );
          }
        }
      }
    });
  }

  update(state) {
    this.render(state);
  }
}

export default OfferForm;
