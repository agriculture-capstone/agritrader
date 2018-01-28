//import { DairyState, Dairy } from './types';
import { DairyState } from './types';

let tempData = [
  {
    datetime: '2018-01-27T22:03:01Z',
    toUUID: 'tempTo113',
    fromUUID: 'tempFrom345',
    volume: '40',
    quality: 'good',
    costPerUnit: '10',
    lastModified: '2018-01-25 09:30:26.123+07',
    local: 'true',
    uuid: 'tempUU983',
  },
  {
    datetime: '2018-01-27T22:03:01Z',
    toUUID: 'tempTo113',
    fromUUID: 'tempFrom345',
    volume: '90',
    quality: 'good',
    costPerUnit: '10',
    lastModified: '2018-01-27 09:30:26.123+07',
    local: 'true',
    uuid: 'tempUU983',
  },
  {
    datetime: '2018-01-24T22:03:01Z',
    toUUID: 'tempTo113',
    fromUUID: 'tempFrom345',
    volume: '50',
    quality: 'good',
    costPerUnit: '10',
    lastModified: '2018-01-28 09:30:26.123+07',
    local: 'true',
    uuid: 'tempUU982',
  },
  {
    datetime: '2018-01-19T22:03:01Z',
    toUUID: 'tempTo113',
    fromUUID: 'tempFrom345',
    volume: '65',
    quality: 'good',
    costPerUnit: '10',
    lastModified: '2018-01-25 09:30:26.123+07',
    local: 'true',
    uuid: 'tempUU983',
  }];

const initialState: DairyState = {
  containsLocal: false,
  //dairyList: [] as Dairy[],
  dairyList: tempData,
  lastModified: '1451635200000',
};

export default initialState;
