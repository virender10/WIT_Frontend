import React from 'react';
import { render } from 'react-dom';
import { Formik, Field } from 'formik';

const CustomCheckBox = props => {
  const { onChange } = props;
  const singleSelect = (field, form) => {
    if (field.value === props.value) {
      form.setFieldValue(props.name, '');
      onChange("", props.name, );
    } else {
      form.setFieldValue(props.name, props.value);
      onChange(props.value, props.name);
    }
  };

  const multiSelect = (field, form) => {
    if (field.value.includes(props.value)) {
      const nextValue = field.value.filter(value => value !== props.value);
      form.setFieldValue(props.name, nextValue);
      onChange(nextValue, props.name);
    } else {
      const nextValue = field.value.concat(props.value);
      onChange(nextValue, props.name);
      form.setFieldValue(props.name, nextValue);
    }
  };
  return (
    <>
      <Field name={props.name}>
        {({ field, form }) => {
          return (
            <label>
              <input
                {...props}
                type="checkbox"
                checked={field.value.includes(props.value)}
                onChange={
                  props.issingle === 'true'
                    ? () => singleSelect(field, form)
                    : () => multiSelect(field, form)
                }
              />
              {props.label}
            </label>
          );
        }}
      </Field>
    </>
  );
};

export default CustomCheckBox;
