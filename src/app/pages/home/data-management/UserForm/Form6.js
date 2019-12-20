import React from 'react';
import { render } from "react-dom";
import { Formik, Field } from "formik";

function Checkbox(props) {
    return (
      <Field name={props.name}>
        {({ field, form }) => (
          <label>
            <input
              {...field}
              type="checkbox"
              checked={field.value.includes(props.value)}
              onChange={() => {
                const set = new Set(field.value);
                if (set.has(props.value)) {
                    debugger
                  set.delete(props.value);
                } else {
                    debugger
                  set.add(props.value);
                }
                field.onChange(field.name)(Array.from(set));
                form.setFieldTouched(field.name, true);
              }}
            />
            {props.value}
          </label>
        )}
      </Field>
    );
  }


const EntryForm6 = () => {
    return (
        <Formik
          initialValues={{ roles: [] }}
          onSubmit={values => alert(JSON.stringify(values, null, 2))}
        >
          {formik => (
            <div>
              Clicking checks affects `VALUES` and `ERRORS` but never `TOUCHED`...
              <div>
                <Checkbox name="roles" value="Admin" />
                <Checkbox name="roles" value="Customer" />
              </div>
              <br />
              VALUES:
              <pre>{JSON.stringify(formik.values, null, 2)}</pre>
              ERRORS:
              <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
              TOUCHED:
              <pre>{JSON.stringify(formik.touched, null, 2)}</pre>
            </div>
          )}
        </Formik>
      );
}

export default EntryForm6;