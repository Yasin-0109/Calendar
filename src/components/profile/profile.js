import React from "react";

export class profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Change Password</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="Password">Current password</label>
              <input type="password" name="currentPassword" placeholder="Current Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" name="newPassword" placeholder="New Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-type Your Password</label>
              <input type="password" name="newPassword_2" placeholder="Re-type New Password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Change Password
          </button>
        </div>
      </div>
    );
  }
}