import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import About from './About';

describe('components/About', () => {
  function render() {
    return TestUtils.renderIntoDocument(<About />);
  }

  describe('render', () => {
    it('shows about message', () => {
      const component = render();
      const node = ReactDOM.findDOMNode(component);
      expect(node.textContent).toEqual('About');
    });
  });
});
