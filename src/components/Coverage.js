/* eslint-disable class-methods-use-this */
/**
 * title: Coverage.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this component handles the list of coverage details that will be displayed or hidden
 */
import Observer from '../lib/Observer';

/**
 *
 *
 * @class Coverage
 * @extends {Observer}
 */
class Coverage extends Observer {
  /**
   * creates the dom element that this component will render
   *
   * @param {*} state
   * @param {*} i
   * @param {*} child
   * @param {*} isHidden
   * @returns string
   * @memberof Coverage
   */
  createMarkup(state, i, child, isHidden) {
    const hid = isHidden ? 'hidden' : '';
    const { coverageDetails, visibleProducts, visiblePolicyDetails } = state;

    return !isHidden
      ? `<form class='productContainer' ${hid} id=${i}>${coverageDetails
          .map((prop, indx) => {
            const currentId = `coverage1-${indx}`;
            const currentPolicyDetailId = `coverage-policy-details-${indx}`;
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
         
          <div class='row' id=${`erage-policy-details-${indx}`}> 
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

  /**
   * will either append or update the a dom element
   *
   * @param {*} state
   * @param {*} id
   * @memberof Coverage
   */
  render(state, id) {
    const coeverageComponentId = id || this.id;
    const { componentIdParentChild } = state;
    const { isHidden, parent, child } = componentIdParentChild[
      coeverageComponentId
    ];
    const componentMarkup = this.createMarkup(
      state,
      coeverageComponentId,
      child,
      isHidden
    );
    this.addMarkUp(id, id || parent, componentMarkup);
  }

  /**
   *  will either append or update the a dom element
   *
   * @param {*} state
   * @memberof Coverage
   */
  update(state) {
    this.render(state);
  }
}

export default Coverage;
