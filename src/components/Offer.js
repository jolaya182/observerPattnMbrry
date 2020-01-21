import Observer from '../lib/Observer';

class Offer extends Observer {
  // eslint-disable-next-line class-methods-use-this
  createMarkup(state, i, child, isHid) {
    // id should be the id from server
    const hid = isHid ? 'hidden' : '';
    // console.log('-->>isHid', isHid);
    const { warranties, selectedWar } = state;
    // console.log('selectedWar', selectedWar);

    return (
      warranties &&
      `<form ${hid} id=${i}>${warranties
        .map(war => {
          const isSelected = selectedWar === `war-input-${war.id}`;
          const isChecked = isSelected ? 'checked' : '';
          return `<div class="rowOfferSpaceBtwn ${
            isSelected ? 'labelPrplBackground' : 'labelBackground'
          }" >
                  <div>
                      <input id=${`war-input-${war.id}`} ${isChecked} type='radio' value=${`war-input-${war.id}`}  name=${`war-input`} />
                      <label for=${`war-input-${war.id}`}>${
            war.years
          } Year Protection Plan </label>
                  </div>
                  <div>    
                      <div class='bold' id=${`war-input-${war.id}`}>$${
            war.price
          } </div>
                      </div>
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
