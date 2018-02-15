
import HomePage from '../pages/Home';
import FarmerPage from '../pages/Farmer';
import ExportsPage from '../pages/Exports';
import LoginPage from '../pages/Login';
import FarmerSearch from '../pages/FarmerSearch';
import AddEntryPage from '../components/AddEntry';
import EditEntryPage from '../components/EditEntry';
import MilkEntryDetails from '../components/EntryDetails';
import AddFarmerPage from '../pages/Farmer/AddFarmer';
import EditFarmerPage from '../pages/Farmer/EditFarmer';
import ExportEntryDetails from '../pages/Exports/ExportEntryDetails';
import EditExportEntryPage from '../pages/Exports/EditExportEntry';

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
  EXPORTS = 'Exports',
  FARMER = 'Farmer',
  SEARCH_FARMER = 'SearchFarmers',
  ADD_MILK_ENTRY = 'AddMilkEntry',
  MILK_ENTRY_DETAILS = 'MilkEntryDetails',
  EDIT_MILK_ENTRY = 'EditMilkEntry',
  EDIT_FARMER = 'EditFarmer',
  ADD_FARMER = 'AddFarmer',
  EXPORT_ENTRY_DETAILS = 'ExportEntryDetails',
  EDIT_EXPORT_ENTRY = 'EditExportEntry',
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
    name: 'Exports',
    component: ExportsPage,
    type: 'menu',
    drawerInfo: {
      icon: 'person',
    },
  },
  {
    route: Route.ADD_MILK_ENTRY,
    name: 'Add Milk Entry',
    component: AddEntryPage,
    type: 'back',
  },
  {
    route: Route.EDIT_MILK_ENTRY,
    name: 'Edit Milk Entry',
    component: EditEntryPage,
    type: 'back',
  },
  {
    route: Route.MILK_ENTRY_DETAILS,
    name: 'Milk Entry Details',
    component: MilkEntryDetails,
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
