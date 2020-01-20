import Observer from '../lib/Observer';

class Offer extends Observer {
  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, i, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    const yearPlan = 3;
    const warCost = 35;
    const { warranties } = state;
    // const warranties = true
    //   ? [
    //       { id: 42, name: 'warrantiesName2' },
    //       { id: 43, name: 'warrantiesName3' },
    //       { id: 44, name: 'warrantiesName4' },
    //       { id: 45, name: 'warrantiesName5' },
    //       { id: 46, name: 'warrantiesName6' }
    //     ]
    //   : [];

    return (
      warranties &&
      `<form ${hid} id=${i}>${warranties
        .map(war => {
          return `<div >
                  <input id=${`war-input-${war.id}`} type='radio' value=${`war-input-${war.id}`}  name=${`war-input`} />
                      <label for=${`war-input-${war.id}`}> ${yearPlan} Year Protection Plan </label>
                      <label for=${`war-input-${war.id}`}> $${warCost} </label>
                      </div>`;
        })
        .join('\n')}</form>`
    );
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

export default Offer;
