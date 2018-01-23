import * as React from 'react';

import createPage from './Page';
import createSearchPage, { InjectedSearchProps } from './SearchPage/index';
import createFabPage, { FabType, InjectedFabProps } from './FabPage/index';

export default class Composer<InjectedProps> {

  private component: React.ComponentType<InjectedProps>;

  public constructor(component: React.ComponentType<InjectedProps>) {
    this.component = component;
  }

  public apply<R>(fn: (component: React.ComponentType<InjectedProps>) => React.ComponentType<R>) {
    return new Composer(fn(this.component));
  }

  public get finalize() {
    return createPage(this.component);
  }

  public static search<T>(placeholder?: string) {
    return (el: React.ComponentType<T & InjectedSearchProps>) => createSearchPage(el, placeholder);
  }

  public static fab<T>(type?: FabType) {
    return (el: React.ComponentType<T & InjectedFabProps>) => createFabPage(el, type);
  }
}
