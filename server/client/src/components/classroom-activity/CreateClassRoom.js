import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createClassRoom } from '../../actions/classroomActions';

class CreateClassRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      section: '',
      room: '',
      description: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const classRoomData = {
      name: this.state.name,
      section: this.state.section,
      room: this.state.room,
      description: this.state.description
    };

    this.props.createClassRoom(classRoomData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="createclassroom">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create a new class</h1>
              {/* <p className="lead text-center">
                Sign in to your ClassAssistant account
              </p> */}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Class Name"
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Section No"
                  name="section"
                  type="section"
                  value={this.state.section}
                  onChange={this.onChange}
                  error={errors.section}
                />
                <TextFieldGroup
                  placeholder="Room No"
                  name="room"
                  type="room"
                  value={this.state.room}
                  onChange={this.onChange}
                  error={errors.room}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Write about the class!"
                />
                <input type="submit" className="btn btn-dark btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateClassRoom.propTypes = {
  createClassRoom: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classroom: state.classroom,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClassRoom }
)(withRouter(CreateClassRoom));
