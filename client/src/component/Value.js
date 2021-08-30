import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchIndex, fetchValues, fetchValue } from "./actions/index";
import { useHistory } from "react-router-dom";

const validateForm = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required!";
  }
  if (!values.description) {
    errors.description = "Required!";
  }
  return errors;
};
const RenderInput = ({
  // props passed to render input
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div className={`field ${touched && error ? "error" : ""}`}>
      <label>{label}</label>
      <input placeholder={label} type={type} {...input} autoComplete="off" />
      {touched &&
        ((error && (
          <div className="ui error message">
            <div className="header">{error}</div>
          </div>
        )) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

const ValueForm = ({ pristine, submitting, handleSubmit }) => {
  console.log(submitting);
  const dispatch = useDispatch();
  const index = useSelector((state) => state.fib.seenIndex);
  const values = useSelector((state) => state.fib.values);
  console.log(values);
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchValues());
    dispatch(fetchIndex());
  }, [dispatch, values.working]);

  const renderSeenIndexes = () => {
    console.log(index);
    if (index) return index.map(({ number }) => number).join(", ");
  };

  const onSubmit = ({ index }) => {
    if (values[index]) {
      return;
    }
    dispatch(fetchValue(index));

    history.push("/");
  };
  const renderValues = () => {
    let entries = [];
    if (values) {
      for (let key in values) {
        entries.push(
          <div key={key}>
            For index {key} I calculated {values[key]}
          </div>
        );
      }
    }
    return entries;
  };

  return (
    <div className="ui container">
      <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
        <Field
          name="index"
          component={RenderInput}
          label="Enter your index: "
          type="text"
        />
        <button
          type="submit"
          disabled={pristine || submitting}
          className="ui primary button"
        >
          Submit
        </button>
      </form>
      <h3>Indices I have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default reduxForm({ form: "ValueForm", validateForm })(ValueForm);
