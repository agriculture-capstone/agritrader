
import HomePage from '../pages/Home';
import FarmerPage from '../pages/Farmer';
import ExportsPage from '../pages/Exports';
import LoginPage from '../pages/Login';
import FarmerSearch from '../pages/FarmerSearch';
import AddMilkEntryPage from '../components/AddMilkEntry';
import EditMilkEntryPage from '../components/EditMilkEntry';
import MilkEntryDetailsPage from '../components/MilkEntryDetails';
import AddLoanEntryPage from '../components/AddLoanEntry';
import EditLoanEntryPage from '../components/EditLoanEntry';
import LoanEntryDetailsPage from '../components/LoanEntryDetails';
import AddPaymentEntryPage from '../components/AddPaymentEntry';
import EditPaymentEntryPage from '../components/EditPaymentEntry';
import PaymentEntryDetailsPage from '../components/PaymentEntryDetails';
import AddFarmerPage from '../pages/Farmer/AddFarmer';
import EditFarmerPage from '../pages/Farmer/EditFarmer';
import AddExportEntryPage from '../pages/Exports/AddExport';
import ExportEntryDetails from '../pages/Exports/ExportEntryDetails';
import EditExportEntryPage from '../pages/Exports/EditExportEntry';
import TransactionLogPage from '../pages/TransactionLog';
import WarehousePage from '../pages/Warehouse';


/** Different types of pages */
export type PageType = 'menu' | 'back' | 'empty';

/** Information for route containing drawer entry */
export interface DrawerRouteInfo extends RouteInfo {
  readonly drawerInfo: DrawerInfo;
}

/** Information for route with search bar */
export interface SearchRouteInfo extends RouteInfo {
  readonly searchInfo: SearchInfo;
}

interface DrawerInfo {
  icon: string;
}

interface SearchInfo {
  placeholder: string;
}

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  EXPORTS = 'Deliveries',
  FARMER = 'Farmer',
  TRANSACTION_LOGS = 'Transaction Log',
  WAREHOUSE = 'Warehouse',
  SEARCH_FARMER = 'Search Farmers',
  ADD_MILK_ENTRY = 'Add Milk Entry',
  MILK_ENTRY_DETAILS = 'Milk Entry Details',
  EDIT_MILK_ENTRY = 'Edit Milk Entry',
  ADD_LOAN_ENTRY = 'Add Loan Entry',
  LOAN_ENTRY_DETAILS = 'Loan Entry Details',
  EDIT_LOAN_ENTRY = 'Edit Loan Entry',
  ADD_PAYMENT_ENTRY = 'Add Payment Entry',
  EDIT_PAYMENT_ENTRY = 'Edit Payment Entry',
  PAYMENT_ENTRY_DETAILS = 'Payment Entry Details',
  EDIT_FARMER = 'Edit Farmer',
  ADD_FARMER = 'Add Farmer',
  ADD_EXPORT_ENTRY = 'Add Delivery Entry',
  EXPORT_ENTRY_DETAILS = 'Delivery Entry Details',
  EDIT_EXPORT_ENTRY = 'Edit Delivery Entry',
}

/** App route information */
export const routesInfo: RouteInfo[] = [
  {
    route: Route.LOGIN,
    name: 'Login',
    component: LoginPage,
    type: 'empty',
  },
  {
    route: Route.HOME,
    name: 'Home',
    component: HomePage,
    type: 'menu',
    drawerInfo: {
      icon: 'home',
    },
  },
  {
    route: Route.FARMER,
    name: 'Farmer',
    component: FarmerPage,
    type: 'menu',
  },
  {
    route: Route.SEARCH_FARMER,
    name: 'Farmers',
    component: FarmerSearch,
    type: 'back',
    drawerInfo: {
      icon: 'people',
    },
    searchInfo: {
      placeholder: 'Search Farmers',
    },
  },
  {
    route: Route.EXPORTS,
    name: 'Deliveries',
    component: ExportsPage,
    type: 'menu',
    drawerInfo: {
      icon: 'car',
    },
  },
  {
    route: Route.WAREHOUSE,
    name: 'Warehouse',
    component: WarehousePage,
    type: 'menu',
    drawerInfo: {
      icon: 'cart',
    },
  },
  {
    route: Route.TRANSACTION_LOGS,
    name: 'Transaction Logs',
    component: TransactionLogPage,
    type: 'menu',
    drawerInfo: {
      icon: 'stats',
    },
  },
  {
    route: Route.ADD_MILK_ENTRY,
    name: 'Add Milk Entry',
    component: AddMilkEntryPage,
    type: 'back',
  },
  {
    route: Route.EDIT_MILK_ENTRY,
    name: 'Edit Milk Entry',
    component: EditMilkEntryPage,
    type: 'back',
  },
  {
    route: Route.MILK_ENTRY_DETAILS,
    name: 'Milk Entry Details',
    component: MilkEntryDetailsPage
    ,
    type: 'back',
  },
  {
    route: Route.ADD_LOAN_ENTRY,
    name: 'Add Loan Entry',
    component: AddLoanEntryPage,
    type: 'back',
  },
  {
    route: Route.EDIT_LOAN_ENTRY,
    name: 'Edit Loan Entry',
    component: EditLoanEntryPage,
    type: 'back',
  },
  {
    route: Route.LOAN_ENTRY_DETAILS,
    name: 'Loan Entry Details',
    component: LoanEntryDetailsPage,
    type: 'back',
  },
  {
    route: Route.ADD_PAYMENT_ENTRY,
    name: 'Add Payment Entry',
    component: AddPaymentEntryPage,
    type: 'back',
  },
  {
    route: Route.LOAN_ENTRY_DETAILS,
    name: 'Edit Payment Entry',
    component: EditPaymentEntryPage,
    type: 'back',
  },
  {
    route: Route.PAYMENT_ENTRY_DETAILS,
    name: 'Payment Entry Details',
    component: PaymentEntryDetailsPage,
    type: 'back',
  },
  {
    route: Route.ADD_FARMER,
    name: 'Add a Farmer',
    component: AddFarmerPage,
    type: 'back',
  },
  {
    route: Route.EDIT_FARMER,
    name: 'Edit a Farmer',
    component: EditFarmerPage,
    type: 'back',
  },
  {
    route: Route.ADD_EXPORT_ENTRY,
    name: 'Add Export Entry',
    component: AddExportEntryPage,
    type: 'back',
  },
  {
    route: Route.EXPORT_ENTRY_DETAILS,
    name: 'Export Entry Details',
    component: ExportEntryDetails,
    type: 'back',
  },
  {
    route: Route.EDIT_EXPORT_ENTRY,
    name: 'Edit export entry',
    component: EditExportEntryPage,
    type: 'back',
  },
];

/** Information for each route in app */
export interface RouteInfo {
  /** Route for the navigator */
  readonly route: Route;
  /** The exposed name for the route */
  readonly name: string;
  /** The component that should be rendered */
  readonly component: React.ComponentClass | React.StatelessComponent;
  /** Specify whether the header/drawer are shown */
  readonly type: PageType;
  /** Info provided if page should have search bar */
  readonly searchInfo?: SearchInfo;
  /** Information provided if route should appear in drawer */
  readonly drawerInfo?: DrawerInfo;
}
