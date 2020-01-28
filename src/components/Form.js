/* eslint-disable class-methods-use-this */
/**
 * title: Form.js
 *
 * date: 1/20/2020
 *
 * author: javier olaya
 *
 * description: this component handles the fetching/data processing aspect of the application and
 * change of view(switch components)
 */
/**
 *
 *
 * @class Form
 */
class Form {
  constructor(state) {
    this.appState = state;
    this.url =
      'https://partner-staging.getmulberry.com/api/get_personalized_warranty';
  }

  errMsg(msg, error) {
    console.log(msg, error);
  }

  /**
   * will send the data on a post method and invoke a
   * callback func to process the data into the state application
   *
   * @memberof Form
   */
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
      .then(
        // eslint-disable-next-line consistent-return
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
          this.processIncomingData(json);
        },
        error => this.errMsg('error from ', error)
      )
      .catch(err => console.log('error in sending fetch req', err));
  }

  /**
   * will gather necessary data from the fetch call to and update the state of the application
   *
   * @param {*} data
   * @memberof Form
   */
  processIncomingData(data) {
    const coverageDetails = [];
    const warranties = [];
    data.forEach(war => {
      const coverageDetail = {
        id: war.id,
        name: war.product.name,
        Active: 'Active',
        OrderID: war.id,
        DateIssued: this.getDateIssued(war.created_date),
        Expiration: this.calculateExpirationDate(
          war.created_date,
          war.duration_months
        ),
        Retailer: war.product.retailer.company_name || 'Home Shop',
        PlanDuration: war.duration_months,
        Price: war.customer_cost,
        Claim: 0,
        PolicyDetails: war.coverage_details[0].long,
        PolicyDocument: 'Policy Document',
        productPrice: war.product.price
      };

      const warranty = {
        id: war.id,
        years: this.getYears(war.duration_months),
        price: war.customer_cost
      };

      coverageDetails.push(coverageDetail);
      warranties.push(warranty);
    });

    this.appState.update({
      ...this.appState.get(),
      coverageDetails,
      warranties
    });
  }

  /**
   *
   *
   * @param {*} DateIssued
   * @returns string
   * @memberof Form
   */
  getDateIssued(DateIssued) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const da = new Date(DateIssued);
    return da.toLocaleDateString('en-Us', options);
  }

  /**
   * returns the expiration data based on the numbers of months it has a warranty and the date issued
   *
   * @param {*} DateIssued
   * @param {*} months
   * @returns string
   * @memberof Form
   */
  calculateExpirationDate(DateIssued, months) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const da = new Date(DateIssued);
    da.setMonth(da.getMonth() + months);
    return da.toLocaleDateString('en-Us', options);
  }

  /**
   * calculates the number of years the warranty covers based on the
   * number of months
   *
   * @param {*} months
   * @returns number
   * @memberof Form
   */
  getYears(months) {
    return months / 12 < 1 ? Math.ceil(months / 12) : Math.floor(months / 12);
  }

  /**
   * creates the dom element that this component will render
   *
   * @returns string
   * @memberof Form
   */
  createMarkup() {
    // get a list of all the observables
    // and then say render according to the current component
    const state = this.appState.get();
    const { formId } = state;

    return `<div  id=${formId} class='column'>
    <div>  </div>
    <div class=' row section'>
      <button class='rowOffer ' id="switchComponent" type="button"> Switch Component </button>
    </div> 
    </div>`;
  }

  /**
   * will either append or update the a dom element
   *
   * @param {*} id
   * @param {string} [app='app']
   * @memberof Form
   */
  render(id, app = 'app') {
    // if (!id) id = this.id;
    const state = this.appState.get();
    this.appState.update({
      ...state,
      formId: id || this.id
    });
    const componentMarkup = this.createMarkup(this.appState.get(), this.id);

    if (id) {
      this.id = id;
      const appCon = document.getElementById(app);

      const range = document.createRange();
      range.selectNode(appCon);
      const frag = range.createContextualFragment(componentMarkup);
      appCon.appendChild(frag);
    } else {
      // replace it with a new html element
      const currentComp = document.getElementById(this.id);
      const { parentNode } = currentComp;
      const range = document.createRange();
      range.selectNode(currentComp);
      const frag = range.createContextualFragment(componentMarkup);

      parentNode.replaceChild(frag, currentComp);
    }

    this.bind();
  }

  /**
   * will bind the actions to the dom elements directly or through event delagation
   *
   * @memberof Form
   */
  bind() {
    const state = this.appState.get();
    const { formId, componentIdParentChild } = state;
    let { currComponent } = state;

    window.addEventListener('load', e => {
      e.preventDefault();
      this.fetchData();
    });
    // set listeners to change the current components
    const formNodes = document.getElementById(formId).childNodes[3];
    let newcomponentIdParentChild = {};
    const switchComponentButton = formNodes.childNodes[1];
    switchComponentButton.addEventListener('click', e => {
      e.preventDefault();
      if (currComponent === 'offerForm1') {
        const { parent, child } = componentIdParentChild.offerForm1;
        const parent1 = componentIdParentChild.coverageForm1.parent;
        const child1 = componentIdParentChild.coverageForm1.child;

        newcomponentIdParentChild = {
          ...componentIdParentChild,
          coverageForm1: { isHidden: false, parent: parent1, child: child1 },
          offerForm1: { isHidden: true, parent, child }
        };
        currComponent = 'coverageForm1';
      } else if (currComponent === 'coverageForm1') {
        const { parent, child } = componentIdParentChild.offerForm1;
        const parent1 = componentIdParentChild.coverageForm1.parent;
        const child1 = componentIdParentChild.coverageForm1.child;

        newcomponentIdParentChild = {
          ...componentIdParentChild,
          coverageForm1: { isHidden: true, parent: parent1, child: child1 },
          offerForm1: { isHidden: false, parent, child }
        };
        currComponent = 'offerForm1';
      }
      this.appState.update({
        ...state,
        currComponent,
        componentIdParentChild: newcomponentIdParentChild
      });
    });
  }
}

export default Form;
