import * as React from 'react';

/**
 * Higher order component for pages
 *
 * Used to enforce global styles and behavior on all pages
 *
 * @param {React.ComponentType} [WrappedComponent] React component to wrap in HOC
 *
 * @example
 *
  class MyPage extends React.Component<PropsType, OwnState> {

    constructor(props: PropsType) {
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
      return <WrappedComponent {...this.props} />;
    }
  };
}
