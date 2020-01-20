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
    // const coverageDetails = true
    //   ? [
    //       {
    //         id: 42,
    //         name: 'home shop silky sleep matress',
    //         Active: 'Active',
    //         OrderID: 'Order ID',
    //         DateIssued: 'Date issued',
    //         Expiration: 'Expiration',
    //         Retailer: 'Retailer',
    //         PlanDuration: 'Plan Duration',
    //         Price: 'Price',
    //         Claim: 'Claim',
    //         PolicyDetails: 'Policy Details',
    //         PolicyDocument: 'Policy Document'
    //       }
    //     ]
    //   : [];
    return `<div class="" ${hid} id=${i}> 
      <div class="column">
        <div class="row">welcome Jason</div>
        <div class="row">Hope you are having a great day</div>
        <div class="row">Your products</div>
        <div class="row" ${hid} id=${child}>
          
          </div>  
          <div class="row"><button id="coverageFormBtnFileAClaim" type="submit">FILE A CLAIM</button></div>
          <div class="row"><button id="coverageFormBtnCancelWarranty" type="submit">CANCEL WARRANTY</button></div>
      </div>      
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
  }

  update(state) {
    this.render(state);
  }
}

export default CoverageForm;
