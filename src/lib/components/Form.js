// @flow
import * as React from 'react';

function setImmutable(obj: Object, attr: string, value: any) {
  const attrArr = attr.split('.');
  const [tattr, nattr] = attrArr;
  return Object.assign({}, obj, {
    [tattr]: !!nattr
      ? setImmutable(obj[tattr] || {}, attrArr.slice(1).join('.'), value)
      : value,
  });
}

type MapType = { [string]: any };

type Props = {
  values: MapType,
  onChange: MapType => void,
  onSubmit: MapType => void,
  render: any => React.Node<*>,
};

type State = {
  values: MapType,
};

class Form extends React.Component<Props, State> {
  state = { values: this.props.values };
  componentDidUpdate() {
    this.props.onChange && this.props.onChange(this.state.values);
  }
  onChange = (name: string, value: any) => {
    this.setState(state => ({
      ...state,
      values: setImmutable(state.values, name, value),
    }));
  };
  onSubmit = () =>
    this.props.onSubmit && this.props.onSubmit(this.state.values);
  render() {
    const { values } = this.state;
    return this.props.render(values, this.onChange, this.onSubmit);
  }
}

export default Form;
