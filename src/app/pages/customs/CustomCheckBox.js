import React from "react";
import { render } from "react-dom";
import { Formik, Field } from "formik";

const CustomCheckBox = (props) => {
    return (
        <>
      <Field name={props.name}>
        {({ field, form }) => (
          <label>
            <input
              type="checkbox"
              {...props}
              checked={field.value.includes(props.value)}
              onChange={() => {
                  debugger
                if (field.value.includes(props.value)) {
                  const nextValue = field.value.filter(
                    value => value !== props.value
                  );
                  form.setFieldValue(props.name, nextValue);
                } else {
                  const nextValue = field.value.concat(props.value);
                  form.setFieldValue(props.name, nextValue);
                }
              }}
            />
            {props.label}
          </label>
        )}
      </Field>
      </>
    );
  }

export default CustomCheckBox;