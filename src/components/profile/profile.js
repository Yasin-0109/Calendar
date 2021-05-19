import React from "react";

export class profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
<<<<<<< Updated upstream
        <div className="header">Change Password</div>
=======
        <div className="header">Login</div>
>>>>>>> Stashed changes
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="Password">Current password</label>
<<<<<<< Updated upstream
              <input type="password" name="currentPassword" placeholder="Current Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" name="newPassword" placeholder="New Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-type Your Password</label>
              <input type="password" name="newPassword_2" placeholder="Re-type New Password" />
=======
              <input type="password" name="currentPassword" placeholder="currentPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" name="newPassword" placeholder="newPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-type Your Password</label>
              <input type="password" name="newPassword_2" placeholder="newPassword_2" />
>>>>>>> Stashed changes
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