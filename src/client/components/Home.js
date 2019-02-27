import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { map } from 'lodash'
import {
  Button,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem
} from 'reactstrap'
import * as RecordActions from '../actions/RecordActions'

export class Record extends React.PureComponent {
  handleRemove = () => {
    const { onRemove, value } = this.props
    onRemove(value.id)
  }

  render () {
    const { value } = this.props
    return (
      <ListGroupItem
        className='d-flex align-items-center justify-content-between'
      >
        {value.name}
        <i
          className='action-remove fa fa-times text-danger'
          onClick={this.handleRemove}
        />
      </ListGroupItem>
    )
  }
}

export class Home extends React.PureComponent {
  static propTypes = {
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    findAll: PropTypes.func.isRequired,
    recordsById: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired
  }

  handleAdd = (event) => {
    event.preventDefault()
    const { add } = this.props
    const { $name } = this.refs
    const name = $name.value
    add({ name })
    $name.value = ''
    $name.focus()
  }

  componentDidMount = () => {
    const { findAll } = this.props
    findAll()
  }

  render () {
    const { recordsById, remove } = this.props

    return (
      <div className='col-lg-6 ml-auto mr-auto'>
        <ListGroup className='mb-2'>
          {map(recordsById, (value) =>
            <Record value={value} key={value.id} onRemove={remove} />)}
        </ListGroup>
        <Form inline onSubmit={this.handleAdd}>
          <FormGroup>
            <input
              className='form-control mr-1'
              type='text'
              name='name'
              placeholder='Add Record...'
              ref='$name'
            />
            {' '}
            <Button>
              <i className='fa fa-plus' />
              {' '}
              Add
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export function mapStateToProps (state) {
  return {
    recordsById: state.records.byId
  }
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(RecordActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
