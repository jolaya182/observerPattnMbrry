import Observer from '../lib/Observer';
// import page from '../css/index.css';

class CoverageForm extends Observer {
  constructor(state) {
    super();
    this.appState = state;
  }

  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, i, child, isHid) {
    // console.log('state warranty1', state, 'Id', i);
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    const { coverageDetails } = state;

    return `<div ${hid} id=${i}> 
    <div class='row'><label class='welcome bold'>Welcome Jason!</label></div>
    <div class='row'><label class='smallerText'>Hope you are having a great day</label></div>
    <div class='row darkPLtr'>Your Products</div>
    <div class='row' ${hid} id=${child}>
      
      </div>  
      <div class='rowOffer productContainer'><button id="coverageFormBtnFileAClaim" type="submit">FILE A CLAIM</button></div>
      <div class='rowOffer productContainer'><button id="coverageFormBtnCancelWarranty" type="submit">CANCEL WARRANTY</button></div>
  </div>`;
  }

  render(state, id) {
    // console.log('state warranty2', state, this.id);

    const renderingId = id || this.id;
    let offerMarkup = '';
    const { compIdPrnCh } = state;
    const { isHid, parent, child } = compIdPrnCh[renderingId];
    // console.log('parent', parent);

    offerMarkup = this.createMarkup(state, renderingId, child, isHid);

    this.addMarkUp(id, parent, offerMarkup);
    // let offerMarkup = '';
    // const range = document.createRange();
    // let frag = '';
    // const appCont = document.getElementById(parent);
    // range.selectNode(appCont);
    // offerMarkup = this.createMarkup(state, id || this.id, child, isHid);
    // frag = range.createContextualFragment(offerMarkup);

    // if (id) {
    //   this.id = id;
    //   appCont.appendChild(frag);
    //   console.log('****OfferForm', frag);
    // } else {
    //   const currentComp = document.getElementById(this.id);
    //   console.log('***currentId', frag);
    //   appCont.replaceChild(frag, currentComp);
    // }
    if (!isHid) this.bind(state);
  }

  // eslint-disable-next-line class-methods-use-this
  bind(state) {
    const claimBtn = document.getElementById('coverageFormBtnFileAClaim');
    const cancelBtn = document.getElementById('coverageFormBtnCancelWarranty');

    claimBtn.addEventListener('click', e => {
      e.preventDefault();
      // // console.log('clicked claimBtn');
      console.log('send out the state', state);
    });

    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('clicked cancelBtn');
    });

    // add event listener to child then find productContainer, then find the a that I clicked
  }

  update(state) {
    this.render(state);
  }
}

export default CoverageForm;
