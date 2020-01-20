import Observer from '../lib/Observer';

class Offer extends Observer {
  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, i, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    const { warranties } = state;

    return (
      warranties &&
      `<form ${hid} id=${i}>${warranties
        .map(war => {
          return `<div >
                  <input id=${`war-input-${war.id}`} type='radio' value=${`war-input-${war.id}`}  name=${`war-input`} />
                      <label for=${`war-input-${war.id}`}> ${
            war.years
          } Year Protection Plan </label>
                      <label for=${`war-input-${war.id}`}> $${
            war.price
          } </label>
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
