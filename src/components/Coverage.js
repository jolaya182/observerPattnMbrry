import Observer from '../lib/Observer';

class Coverage extends Observer {
  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, i, child, isHid) {
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    const { coverageDetails, visibleProducts, visiblePolicyDetails } = state;
    console.log('visiblePolicyDetails', visiblePolicyDetails);

    return !isHid
      ? `<form class='productContainer' ${hid} id=${i}>${coverageDetails
          .map((prop, indx) => {
            const currentId = `coverage1-${indx}`;
            const currentPolicyDetailId = `coverage-policy-details-${indx}`;
            console.log(
              '))) visiblePolicyDetails[currentPolicyDetailId] ',
              visiblePolicyDetails[currentPolicyDetailId]
            );
            return `<div  class='rowOfferSpaceBtwn ' > 
            <div id='overage1-${indx}' class=' productName bold'>${
              prop.name
            }</div>  
            <div  class='vSymbol darkPLtr'>v</div> 
          </div>

        <div id=${currentId} class='coverageDetalContainer column ${
              visibleProducts[currentId] ? 'visibl' : 'hddn'
            }' >

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
            <div class='column policy'><label id=${`verage-policy-details-${indx}`} class='justUnderLine '>*Policy Details</label></div>
            <div class='column '><a href='coverageForm1' class='justUnderLine'>↓Policy Document</a></div>
          </div>
          
          <div class='row  '> 
            <div id=${currentPolicyDetailId} class='column justBold  ${
              visiblePolicyDetails[currentPolicyDetailId] ? 'visibl' : 'hddn'
            }'>${prop.PolicyDetails}</div>
            
          </div>
          
        </div>
       `;
          })
          .join('\n')}</form>`
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
    this.render(state);
  }
}

export default Coverage;
