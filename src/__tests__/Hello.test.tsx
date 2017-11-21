import { Text } from 'react-native';
import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';

import Hello from '../Hello';

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

const title = "myTestTitle";

describe('Hello.tsx', function () {
  describe('buttonHandler', function () {

    // it('brad - should increment the state.num', function () {
    //   const component = Object.freeze({
    //     state: {
    //       num: 0,
    //     },
    //     setState: sinon.mock()
    //   });

    //   (Hello as any).buttonHandler.apply(component);

    //   component.setState.calledWith({
    //     num: 1,
    //   });
    // })
  });
});

describe("Hello", function () {
  it('', function() {
    const hello = shallow(<Hello title="World" showButton={true}/>);
    expect(hello.find(Text).render().text()).toEqual("World!");
  });
})
it('renders correctly', () => {
  const tree = renderer.create(
    <Hello title={title} showButton={true} />,
  );
  expect(tree).toMatchSnapshot();
});
