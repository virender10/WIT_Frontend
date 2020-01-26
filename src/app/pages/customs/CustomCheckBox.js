import React from 'react';
import { render } from 'react-dom';
import { Formik, Field } from 'formik';

const CustomCheckBox = props => {
  const { onChange } = props;
  const singleSelect = (field, form) => {
    if (props.selectedValue === props.value) {
      // form.setFieldValue(props.name, '');
      onChange("", props.name);
    } else {
      // form.setFieldValue(props.name, props.value);
      onChange(props.value, props.name);
    }
  };

  const multiSelect = (field) => {
    if (field.value.includes(props.value)) {
      const nextValue = field.value.filter(value => value !== props.value);
      // form.setFieldValue(props.name, nextValue);
      onChange(nextValue, props.name);
    } else {
      const nextValue = field.value.concat(props.value);
      // form.setFieldValue(nextValue, props.name);
      onChange(nextValue, props.name);
    }
  };
  return (
    <>
      {/* <Field name={props.name}>
        {({ field, form }) => { 
          console.log(field.value, "field.value");
          return ( */}
            <label>
              <input
                {...props}
                type="checkbox"
                checked={props.value && props.value.includes(props.selectedValue)}
                onChange={
                  props.issingle === 'true'
                    ? () => singleSelect()
                    : () => multiSelect()
                }
              />
              {props.label}
            </label>
          {/* );
        }}
      </Field> */}
    </>
  );
};

export default CustomCheckBox;
