import React from 'react';
import Form from '../lib/components/Form';
import Field from '../lib/components/Field';

const user = { name: 'Rolando', age: 27 };

const inputTextValueExtractor = e => e.target.value;

class App extends React.Component {
  onChange = values => console.log('onChange', values);
  onSubmit = values => console.log('onSubmit', values);

  renderForm = (values, onChange, onSubmit) => (
    <div>
      <Field
        component="input"
        name="name"
        value={values.name}
        onChangeAttr="onChange"
        onChange={onChange}
        valueExtractor={inputTextValueExtractor}
      />
      <Field
        component="input"
        name="age"
        value={values.age}
        onChangeAttr="onChange"
        onChange={onChange}
        valueExtractor={inputTextValueExtractor}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );

  render() {
    return (
      <div>
        <Form
          values={user}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}

export default App;
