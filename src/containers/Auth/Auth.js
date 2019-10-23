import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Auth.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  componentDidMount() {
    if (this.props.authRedirectPath !== '/game') {
      this.props.onSetAuthRedirectPath('/game');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const isSignup = { value: false,};
        this.props.onAuth(values.email, values.password, isSignup);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let form = (
      
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'Nhập vào không phải là Email',
            },{ required: true, message: 'Email không được để trống!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email" type="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Nhập đúng mật khẩu của bạn!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <NavLink className="login-form-forgot" to='/user/reset'>
            Forgot password
          </NavLink>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <NavLink to="/user/register">register now!</NavLink>
        </Form.Item>
      </Form>
    );
    if(this.props.loading){
      form = <Spinner />
    }
    let authRedirect = null;
    if(this.props.isAuthenticated){
        authRedirect = <Redirect to={this.props.authRedirectPath} />
    }
    return <div>
      {authRedirect}
      {form}
    </div>;
  }
}
 
const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
      onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/game'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Auth = Form.create({ name: 'auth' })(Auth));
