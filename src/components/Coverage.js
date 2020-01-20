import Observer from '../lib/Observer';

class Coverage extends Observer {
  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, i, child, isHid) {
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    const { coverageDetails } = state;
    // const warranties = true
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
    return !isHid
      ? `${coverageDetails
          .map(prop => {
            return `<div ${hid} id=${i}>
          <div class="col" > ${prop.name} <label>v</label></div>            
          <div >
            <div class="col">Active | Expires </div>
            <div class="col">" "</div>
            <div class="col">Order ID</div>
            <div class="col">${prop.OrderID}</div>
            <div class="col">Date issued</div>
            <div class="col">${prop.DateIssued}</div>
            <div class="col">Expiration</div>
            <div class="col">${prop.Expiration}</div>
            <div class="col">Retailer</div>
            <div class="col">${prop.Retailer}</div>
            <div class="col">Plan Duration</div>
            <div class="col">${prop.PlanDuration}</div>
            <div class="col">Price</div>
            <div class="col">${prop.Price}</div>
            <div class="col">Claim</div>
            <div class="col">${prop.Claim}</div>
            <div class="col">Policy Details</div>
            <div class="col">${prop.PolicyDetails}</div>
            <div class="col">Policy Document</div>
            <div class="col">${prop.PolicyDocument}</div>
          </div>
        </div> `;
          })
          .join('\n')}`
      : ``;
  }

  render(state, id) {
    const renderingId = id || this.id;
    // console.log('renderingId', renderingId);
    let offerMarkup = '';
    const { compIdPrnCh } = state;
    const { isHid, parent, child } = compIdPrnCh[renderingId];
    offerMarkup = this.createMarkup(state, renderingId, child, isHid);
    this.addMarkUp(id, id || parent, offerMarkup);
  }

  update(state) {
    // console.log('state warranty3', state);

    this.render(state);
  }
}

export default Coverage;
