import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Home, mapStateToProps, mapDispatchToProps } from './Home';
import { create } from '../store';

describe('components/Home', () => {
  let findAll; let add; let
    remove;
  beforeEach(() => {
    findAll = jest.fn();
    add = jest.fn();
    remove = jest.fn();
  });

  let component; let
    node;
  function render(recordsById) {
    component = TestUtils.renderIntoDocument(
      <Home
        findAll={findAll}
        add={add}
        remove={remove}
        recordsById={recordsById}
      />,
    );
    node = ReactDOM.findDOMNode(component);
  }

  describe('render', () => {
    it('renders', () => {
      render({});
    });

    it('renders records', () => {
      const recordsById = {
        1: { id: 1, name: 'test1' },
        2: { id: 2, name: 'test1' },
      };
      render(recordsById);
      expect(/test1/);
      expect(/test2/);
    });
  });

  function addRecord(value) {
    const $name = node.querySelector('input[name=name]');
    $name.value = value;
    const $form = node.querySelector('form');
    TestUtils.Simulate.submit($form);
  }

  describe('handleAdd', () => {
    it('adds a new entry', () => {
      render({});
      addRecord('new record');
      expect(add.mock.calls).toEqual([[{ name: 'new record' }]]);
    });
  });

  describe('handleRemove', () => {
    beforeEach(() => {
      const recordsById = {
        1: { id: 1, name: 'test1' },
        2: { id: 2, name: 'test1' },
      };
      render(recordsById);
    });

    it('removes existing entry', () => {
      const $remove = node.querySelector('.action-remove');
      TestUtils.Simulate.click($remove);
      expect(remove.mock.calls).toEqual([[1]]);
    });
  });

  describe('mapStateToProps', () => {
    it('maps store state to props', () => {
      const state = create().getState();
      const props = mapStateToProps(state);
      expect(props.recordsById).toEqual(state.records.byId);
    });
  });

  describe('mapDispatchToProps', () => {
    it('maps dispatch to prosp', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);
      expect(props.add).toEqual(jasmine.any(Function));
      expect(props.remove).toEqual(jasmine.any(Function));
      expect(props.findAll).toEqual(jasmine.any(Function));
    });
  });
});
