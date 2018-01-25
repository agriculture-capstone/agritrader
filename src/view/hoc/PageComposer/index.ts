import * as React from 'react';

import createPage from './Page';
import createSearchPage from './SearchPage/index';
import createFabPage, { FabType } from './FabPage/index';

export default class Composer<T> {

  private component: React.ComponentType<any>;

  public constructor(component: React.ComponentType<any>) {
    this.component = component;
  }

  public search(placeholder?: string) {
    return new Composer<T>(createSearchPage(this.component, placeholder));
  }

  public fab(type?: FabType) {
    return new Composer<T>(createFabPage(this.component, type));
  }

  public get finalize() {
    return createPage(this.component) as React.ComponentType<T>;
  }
}
