/* eslint-disable no-class-assign */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable constructor-super */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './Register.css';
import {
  Form,
  Input,
  Button,
  Tooltip,
  Icon,
} from 'antd';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Register extends Component {
  constructor(props) {
    state = { confirmDirty: false };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const isSignup = { value: true, username: values.username };
        this.props.onAuth(values.email, values.password, isSignup);
      }
    });
  }

  componentDidMount() {}
  // eslint-disable-next-line class-methods-use-this
  handleConfirmBlur(event) {
    const { value } = event.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    let myForm = (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your Username!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <div className="button-layout">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <NavLink to="/user/login">
              Login
            </NavLink>
          </div>
        </Form.Item>
      </Form>
    );
    if (this.props.loading) {
      myForm = <Spinner />;
    }
    return (
      <div>
        {myForm}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    // onSe\tAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/user/login'))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Register = Form.create({ name: 'register' })(Register));
