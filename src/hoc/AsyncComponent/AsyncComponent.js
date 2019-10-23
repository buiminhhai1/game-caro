/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const AsyncComponent = (importComponent) => (
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      importComponent()
        .then((cmp) => {
          this.setState({ component: cmp.default });
        });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
);

export default AsyncComponent;
