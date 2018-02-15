// @flow
import * as React from 'react';

type Props = {
  name: string,
  value?: any,
  onChangeAttr?: string,
  component: React.Node<*>,
  onChange: (string, any) => void,
  valueExtractor?: (e: any) => string,
};

class Field extends React.Component<Props> {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }
  onChange = (...args) => {
    const value = this.props.valueExtractor(...args);
    this.props.onChange(this.props.name, value);
  };
  render() {
    console.log('render', this.props.name);
    const {
      component: Component,
      onChangeAttr,
      onChange,
      name,
      valueExtractor,
      ...props
    } = this.props;
    const attrs = { [onChangeAttr]: this.onChange };
    return (
      <Component
        name={name}
        {...props}
        {...attrs}
      />
    );
  }
}

Field.defaultProps = {
  value: '',
  onChangeAttr: 'onChange',
  valueExtractor: e => e.target.value,
};

export default Field;
