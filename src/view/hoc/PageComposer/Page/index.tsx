import * as React from 'react';
import { Content } from 'native-base';

/**
 * Higher order component for pages
 *
 * Used to enforce global styles and behavior on all pages
 *
 * @param {React.ComponentType} [WrappedComponent] React component to wrap in HOC
 *
 * @example
 *
  class MyPage extends React.Component<Props, OwnState> {

    constructor(props: Props) {
      super(props);
    }

    public render(): JSX.Element {
      return (
        <View />
      );
    }
  }

  export default createPage(MyPage, 'back');
*
*/
export default function createPage<InjectedProps>(WrappedComponent: React.ComponentType<InjectedProps>) {

  /** Page wrapper */
  return class Page extends React.Component<InjectedProps, {}> {

    public constructor(props: InjectedProps) {
      super(props);
    }

    /************************* React Lifecycle *************************/

    /** React render method */
    public render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  };
}
