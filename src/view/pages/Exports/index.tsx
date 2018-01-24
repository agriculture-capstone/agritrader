import * as React from 'react';
import Export from './tabs/Export';


const demoExportValues = [
  { date: 'Jan 18 17:31', plate:'BRI8932', vol: 10 }, 
  { date: 'Jan 18 14:02', plate:'TJI6782', vol: 20 },
  { date: 'Jan 17 16:36', plate:'BRI8932', vol: 15 }, 
  { date: 'Jan 17 15:32', plate:'TJI6782', vol: 28 },
];
/**
 * Container for Farmer
 */
export default class Farmer extends React.Component<{}, {}> {

  /**
   * Render method for Farmer
   */
  public render() {
    // TODO based on the active tab, we will decide which tab to render
    return (
      <Export
        allTimeTotal="6049L"
        currentWeekTotal="60L"
        currentMonthTotal="180L"
        exportValues={demoExportValues}
      />
    );
  }
}
