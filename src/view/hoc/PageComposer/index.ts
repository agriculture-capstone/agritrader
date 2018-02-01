import * as React from 'react';

import createPage from './Page';
import createSearchPage from './SearchPage/index';
import createFabPage, { FabType } from './FabPage/index';
import createComingSoonOverlay from './ComingSoon/index';

/**
 * Class to compose different Higher Order Components on a page
 *
 * @example
 *
  const WrappedPage = new Composer<NestedPropsType>(NestedComponent)
    .search('Search Farmers')
    .fab('add')
    .finalize;
 */
export default class Composer<T> {

  private component: React.ComponentType<any>;

  public constructor(component: React.ComponentType<any>) {
    this.component = component;
  }

  /**
   * Compose with a Coming Soon wrapper
   *
   * See createComingSoonOverlay for API
   */
  public comingSoon() {
    return new Composer<T>(createComingSoonOverlay(this.component));
  }

  /**
   * Compose with a search wrapper
   *
   * See createSearchPage for API
  */
  public search(placeholder?: string) {
    return new Composer<T>(createSearchPage(this.component, placeholder));
  }

  /**
   * Compose with fab wrapper
   *
   * See createFabPage for API
   */
  public fab(type?: FabType) {
    return new Composer<T>(createFabPage(this.component, type));
  }

  /**
   * The final page component
   */
  public get page() {
    return createPage(this.component) as React.ComponentType<T>;
  }
}
