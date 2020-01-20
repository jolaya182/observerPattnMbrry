import Observer from '../lib/Observer';

class OfferForm extends Observer {
  constructor(state) {
    super();
    this.appState = state;
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, id, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    return `<div ${hid} id=${id}> 
        <div>  product price</div>
        <div> picture </div>    
        <div> add extended protection</div>
        <div> powered by mulberry <div>learn more</div></div>
        <div  ${hid} id=${child}>    
         
        </div> 
        <button id="offerFormBtnAddToCart" type='button'>Add to Cart </button>
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

  // eslint-disable-next-line class-methods-use-this
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
