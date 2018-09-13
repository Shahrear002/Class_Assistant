import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ClassList from './ClassList';
import { getClassRooms } from '../../actions/classroomActions';

class ClassRooms extends Component {
  componentDidMount() {
    this.props.getClassRooms();
  }

  render() {
    const { auth } = this.props.auth;
    const { classrooms, loading } = this.props.classroom;
    let classList;

    if (classrooms == null || loading) {
      classList = <Spinner />;
    } else {
      if (classrooms.length > 0) {
        classList = classrooms.map(classroom => (
          <ClassList key={classroom._id} classroom={classroom} />
        ));
      } else {
        classList = <h4>No classes found...</h4>;
      }
    }

    return (
      <div className="class-rooms">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Class Rooms</h1>
              <p className="lead text-center">Stay Updated</p>
              <Link
                to="/create-classroom"
                className="btn btn-secondary float-right"
              >
                Create New ClassRoom
              </Link>{' '}
              <br /> <br /> <br />
              {/* {classList} */}
            </div>{' '}
            <div className="col-md-12">{classList}</div>
          </div>
        </div>
      </div>
    );
  }
}

ClassRooms.propTypes = {
  getClassRooms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  classroom: state.classroom,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getClassRooms }
)(ClassRooms);
