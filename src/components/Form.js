class Form {
  constructor(state) {
    this.appState = state;
    this.url =
      'https://partner-staging.getmulberry.com/api/get_personalized_warranty';
  }

  // eslint-disable-next-line class-methods-use-this
  errMsg(msg, error) {
    console.log(msg, error);
  }

  fetchData() {
    const data = {
      product: {
        id: 'SOFA-36',
        price: '300.99',
        title: 'Amazing Blue Sofa',
        mulberry_category: 'furniture'
      }
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 5NvkZva_L5MQ6NW8h3siiiR23z5'
      },
      body: JSON.stringify(data)
    };

    fetch(this.url, options)
      // eslint-disable-next-line consistent-return
      .then(
        response => {
          if (response) return response.json();
        },
        error =>
          this.errMsg('error form the server, check url or options', error)
      )
      .then(
        json => {
          const { status } = json;
          if (status >= 400 && status <= 499) {
            this.errMsg('error on sending message, its your fault', status);
            return;
          }
          if (status >= 500 && status <= 599) {
            this.errMsg('error getting message, its our fault', status);
          }
          console.log('success', json);
          this.processIncomingData(json);
        },
        error => this.errMsg('error from ', error)
      )
      .catch(err => console.log('it error in sending fetch req', err));
  }

  processIncomingData(data) {
    const state = this.appState.get();

    // this.appState.update();
  }

  createMarkup() {
    // get a list of all the observables
    // and then say render according to the current component
    const state = this.appState.get();
    const { formId } = state;

    return `<div  id=${formId}>
    <div>  Picture</div>
    <button type="button"> switch Component </button>
  </div>`;
  }

  render(id, app = 'app') {
    // if (!id) id = this.id;
    const state = this.appState.get();
    // console.log('formiD---->', id || this.id);
    this.appState.update({
      ...state,
      formId: id || this.id
    });
    const offerMarkup = this.createMarkup(this.appState.get(), this.id);

    // const parent = document.getElementById('app');
    // parent.innerHTML = markUp;
    if (id) {
      this.id = id;
      const appCon = document.getElementById(app);

      const range = document.createRange();
      range.selectNode(appCon);
      const frag = range.createContextualFragment(offerMarkup);
      appCon.appendChild(frag);
    } else {
      // replace it with a new html element
      const currentComp = document.getElementById(this.id);
      // console.log('replace this.id', this.id, 'currentComp', currentComp);
      const { parentNode } = currentComp;
      const range = document.createRange();
      range.selectNode(currentComp);
      const frag = range.createContextualFragment(offerMarkup);

      parentNode.replaceChild(frag, currentComp);
    }

    this.bind();
  }

  bind() {
    const state = this.appState.get();
    const { formId, compIdPrnCh } = state;
    let { currComponent } = state;

    const form = document.getElementById(formId);
    window.addEventListener('load', e => {
      e.preventDefault();
      console.log('loading done');
      this.fetchData();
    });
    // set listeners to change the current components
    const formNodes = document.getElementById(formId).childNodes;
    // console.log('form --pppp', form);
    let newCompIdPrnCh = {};
    formNodes[3].addEventListener('click', e => {
      e.preventDefault();
      // console.log('clicked on submision');
      if (currComponent === 'offerForm1') {
        const { parent, child } = compIdPrnCh.offerForm1;
        const parent1 = compIdPrnCh.coverageForm1.parent;
        const child1 = compIdPrnCh.coverageForm1.child;

        newCompIdPrnCh = {
          ...compIdPrnCh,
          coverageForm1: { isHid: false, parent: parent1, child: child1 },
          offerForm1: { isHid: true, parent, child }
        };
        currComponent = 'coverageForm1';
      } else if (currComponent === 'coverageForm1') {
        const { parent, child } = compIdPrnCh.offerForm1;
        const parent1 = compIdPrnCh.coverageForm1.parent;
        const child1 = compIdPrnCh.coverageForm1.child;
        console.log('clicked on coverageForm1');

        newCompIdPrnCh = {
          ...compIdPrnCh,
          coverageForm1: { isHid: true, parent: parent1, child: child1 },
          offerForm1: { isHid: false, parent, child }
        };
        currComponent = 'offerForm1';
      }
      this.appState.update({
        ...state,
        currComponent,
        compIdPrnCh: newCompIdPrnCh
      });
    });
  }
}

export default Form;
