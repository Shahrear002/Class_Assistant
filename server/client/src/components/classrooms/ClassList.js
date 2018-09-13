import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ClassList extends Component {
  render() {
    const { classroom } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={classroom.user.avatar}
              alt=""
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{classroom.user.name}</h3>
            <p>
              {classroom.user.role}{' '}
              {isEmpty(classroom.section) ? null : (
                <span>at {classroom.section}</span>
              )}
            </p>
            <p>
              {isEmpty(classroom.description) ? null : (
                <span>{classroom.description}</span>
              )}
            </p>
            <Link
              to={`/classrooms/${classroom._id}`}
              className="btn btn-secondary"
            >
              View ClassRoom
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ClassList.propTypes = {
  classroom: PropTypes.object.isRequired
};

export default ClassList;
