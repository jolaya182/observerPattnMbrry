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
      <div class='rowOffer productContainer'><button class='rowOffer' id="coverageFormBtnFileAClaim" type="submit">FILE A CLAIM</button></div>
      <div class='rowOffer productContainer'><button class='rowOffer' id="coverageFormBtnCancelWarranty" type="submit">CANCEL WARRANTY</button></div>
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
    if (!isHid) this.bind(state, child);
  }

  // eslint-disable-next-line class-methods-use-this
  bind(state, child) {
    const claimBtn = document.getElementById('coverageFormBtnFileAClaim');
    const cancelBtn = document.getElementById('coverageFormBtnCancelWarranty');
    const coverageForm = document.getElementById(this.id);
    claimBtn.addEventListener('click', e => {
      e.preventDefault();
      // // console.log('clicked claimBtn');
      console.log('send out the state', state);
    });

    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('clicked cancelBtn');
    });

    // event delegation added to find the selected product
    // add event listener to child then find productContainer
    coverageForm.addEventListener('click', e => {
      const formElem = e.currentTarget;
      const currTar = e.target;
      const { childNodes } = document.querySelector('.productContainer');
      // const policies = document.querySelector('.productContainer').childNodes;
      let foundProduct = '';
      console.log('policies', childNodes);
      console.log('currTar', currTar);
      for (let ix = 0; ix < childNodes.length; ix += 1) {
        console.log('childNodes', childNodes[ix].id);
        const ProductId = childNodes[ix].id;
        const currProduct = currTar.parentNode.parentNode.parentNode;
        console.log('currTar.parent', currProduct);

        if (ProductId === `c${currProduct.id}`) {
          console.log('foundPolicy', currProduct);
          const foundPolicy = `co${currTar.id}`;
          // console.log('found the input box', policies);
          // const { state } = this.appState.get();
          const { visiblePolicyDetails } = state;
          visiblePolicyDetails[foundPolicy] = visiblePolicyDetails[foundPolicy]
            ? !visiblePolicyDetails[foundPolicy]
            : true;
          // this.appState.update({
          //   ...state,
          //   visiblePolicyDetails
          // });
        }
      }

      console.log('childNodes', childNodes);
      for (let ix = 0; ix < childNodes.length; ix += 1) {
        console.log('childNodes', childNodes[ix]);
        if (childNodes[ix].id === `c${currTar.id}`) {
          console.log('found the node');
          foundProduct = childNodes[ix].id;
          const { visibleProducts } = state;
          visibleProducts[foundProduct] = visibleProducts[foundProduct]
            ? !visibleProducts[foundProduct]
            : true;
          this.appState.update({
            ...state,
            visibleProducts
          });
        }
      }
    });
  }

  update(state) {
    this.render(state);
  }
}

export default CoverageForm;

const policies = document.querySelectorAll('.policy');

// console.log('policy', policies);
// for (let ix = 0; ix < policies.length; ix = +1) {
//   if (policies[ix].id === `cov${currTar.id}`) {
//     const foundPolicy = policies[ix].id;
//     console.log('foundPolicy', foundPolicy);
//     // console.log('found the input box', policies);
//     // const { state } = this.appState.get();
//     const { visiblePolicyDetails } = state;
//     visiblePolicyDetails[foundPolicy] = visiblePolicyDetails[foundPolicy]
//       ? !visiblePolicyDetails[foundPolicy]
//       : true;

//     // this.appState.update({
//     //   ...state,
//     //   visiblePolicyDetails
//     // });
//   }
// }

// console.log('currTar', currTar.id);
// // console.log('formElem', formElem);
// const { childNodes } = formElem;
// // console.log('childNodes', childNodes);
// childNodes.forEach(node => {
//   console.log('node', node);
//   if (node.id === child) {
//     const elements = node.childNodes;
//     console.log('elements', elements);
//     for (let indx = 0; indx < elements.length; indx += 1) {
//       // console.log('input', elements[indx]);
//       console.log(
//         'elements[indx].id === currTar',
//         elements[indx].id,
//         currTar.id
//       );
//       if (elements[indx].id === `c${currTar.id}`) {
//         const foundProduct = elements[indx].id;
//         console.log('foundProduct', foundProduct);
//         // console.log('found the input box', elements[indx]);
//         // const { state } = this.appState.get();
//         const { visibleProducts } = state;
//         visibleProducts[foundProduct] = visibleProducts[foundProduct]
//           ? !visibleProducts[foundProduct]
//           : true;

//         this.appState.update({
//           ...state,
//           visibleProducts
//         });
//       }
//     }
//   }
// });
