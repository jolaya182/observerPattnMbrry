import State from './lib/State';
import Form from './components/Form';
import CoverageForm from './components/CoverageForm';
import Coverage from './components/Coverage';
import OfferForm from './components/OfferForm';
import Offer from './components/Offer';

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
  warranties: [
    { id: 42, name: 'warrantiesName2' },
    { id: 43, name: 'warrantiesName3' },
    { id: 44, name: 'warrantiesName4' },
    { id: 45, name: 'warrantiesName5' },
    { id: 46, name: 'warrantiesName6' }
  ],
  coverageDetails: [
    {
      id: 42,
      name: 'home shop silky sleep matress',
      Active: 'Active',
      OrderID: 'Order ID',
      DateIssued: 'Date issued',
      Expiration: 'Expiration',
      Retailer: 'Retailer',
      PlanDuration: 'Plan Duration',
      Price: 'Price',
      Claim: 'Claim',
      PolicyDetails: 'Policy Details',
      PolicyDocument: 'Policy Document'
    }
  ]
});

appForm.render('WarForm', 'app');
offerForm.render(appState.get(), 'offerForm1', 'WarForm', 'offer1', true);
offer.render(appState.get(), 'offer1');
coverageForm.render(appState.get(), 'coverageForm1');
coverage.render(appState.get(), 'coverage1');

appState.addObserver(offer);
appState.addObserver(coverage);
appState.addObserver(coverageForm);
appState.addObserver(offerForm);

// appForm.render();
// appState.update({ warranties: [{ id: 1, name: 'Jane' }] });
