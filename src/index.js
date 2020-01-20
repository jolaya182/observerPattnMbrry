import State from './lib/State';
import Form from './components/Form';
import CoverageForm from './components/CoverageForm';
import Coverage from './components/Coverage';
import OfferForm from './components/OfferForm';
import Offer from './components/Offer';
import page from './css/index.css';

const appState = new State();
const appForm = new Form(appState);
const coverageForm = new CoverageForm(appState);
const offerForm = new OfferForm(appState);
const offer = new Offer();
const coverage = new Coverage();

// map out parent and child associations
appState.update({
  ...appState.get(),
  compIdPrnCh: {
    WarForm: { isHid: false, parent: 'app', child: 'offerForm1' },
    offerForm1: { isHid: true, parent: 'WarForm', child: 'offer1' },
    coverageForm1: { isHid: false, parent: 'WarForm', child: 'coverage1' },
    offer1: { isHid: false, parent: 'offerForm1', child: null },
    coverage1: { isHid: false, parent: 'coverageForm1', child: null }
  },
  warranties: [{ id: 'defaultId', name: 'defaultName', year: 'defaultYears' }],
  coverageDetails: [
    {
      id: 'defaultId',
      name: 'defaultName',
      Active: 'defaultActive',
      OrderID: 'defaultOrderId',
      DateIssued: 'defaultDateIssued',
      Expiration: 'defaultExpiration',
      Retailer: 'defaultIdRetailer',
      PlanDuration: 'defaultIdPlanDuration',
      Price: 'defaultPrice',
      Claim: 'defaultClaim',
      PolicyDetails: 'defaultPolicy Details',
      PolicyDocument: 'defaultPolicyDocument'
    }
  ]
});

appForm.render('WarForm', 'app');
offerForm.render(appState.get(), 'offerForm1');
offer.render(appState.get(), 'offer1');
coverageForm.render(appState.get(), 'coverageForm1');
coverage.render(appState.get(), 'coverage1');

appState.addObserver(offer);
appState.addObserver(coverage);
appState.addObserver(coverageForm);
appState.addObserver(offerForm);

// appForm.render();
// appState.update({ warranties: [{ id: 1, name: 'Jane' }] });
