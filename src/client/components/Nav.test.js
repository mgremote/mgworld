import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import Nav from './Nav';

describe('components/Nav', () => {
  window.APP_USER = { name: 'John Doe', username: 'doej01' };

  let component; let
    collapse;
  function render() {
    component = TestUtils.renderIntoDocument(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
    );
    component = TestUtils.findRenderedComponentWithType(component, Nav);
    collapse = TestUtils.findRenderedComponentWithType(component, Collapse);
  }

  describe('render', () => {
    it('sets isOpen state to false', () => {
      render();
      expect(component.state.isOpen).toBe(false);
      expect(collapse.props.isOpen).toBe(false);
    });
  });

  describe('toggle', () => {
    beforeEach(() => {
      render();
    });
    it('toggles isOpen state', () => {
      component.toggle();
      expect(component.state.isOpen).toBe(true);
      expect(collapse.props.isOpen).toBe(true);
      component.toggle();
      expect(component.state.isOpen).toBe(false);
      expect(collapse.props.isOpen).toBe(false);
    });
  });
});
