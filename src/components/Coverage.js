import Observer from '../lib/Observer';
import page from '../css/index.css';

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
      ? `<div class='productContainer' ${hid} id=${i}>${coverageDetails
          .map(prop => {
            return `<div class='rowOfferSpaceBtwn ' > 
            <div  class=' productName bold'>${prop.name}</div>  
            <div  class='vSymbol'>v</div> 
          </div>

        <div class='coverageDetalContainer column'>

          <div class='row'> 
            <label class='green bold'>Active </label> 
            <div class='column smallerText'> | Expires ${prop.Expiration} </div>
          </div>

          <div class='row'> 
            <div class='column'>Order ID</div>
            <div class='column justBold'>${prop.OrderID}</div>
          </div>

          <div class='row'> 
            <div class='column'>Date issued</div>
            <div class='column justBold'>${prop.DateIssued}</div>
          </div>
          
          <div class='row'> 
            <div class='column'>Expiration</div>
            <div class='column justBold'>${prop.Expiration}</div>
          </div>
          
          <div class='row'> 
            <div class='column'>Retailer</div>
            <div class='column justBold'>${prop.Retailer}</div>
          </div>
          
          <div class='row'> 
            <div class='column'>Plan Duration</div>
            <div class='column justBold'>${prop.PlanDuration}</div>
          </div>
          
          <div class='row'> 
            <div class='column'>Price</div>
            <div class='column justBold'>${prop.Price}</div>
          </div>
          
          <div class='row'> 
            <div class='column'>Claim</div> 
            <div class='column justBold'>${prop.Claim}</div>
          </div>
         
          <div class='row'> 
            <div class='column '><a href='coverageForm1'class='justUnderLine'>*Policy Details</a></div>
            <div class='column '><a href='coverageForm1' class='justUnderLine'>↓Policy Document</a></div>
          </div>
          
          <div class='row '> 
            <div class='column justBold  '>${prop.PolicyDetails}</div>
            <div class='column justBold  '>${prop.PolicyDocument}</div>
          </div>
          
        </div>
       `;
          })
          .join('\n')}</div>`
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
