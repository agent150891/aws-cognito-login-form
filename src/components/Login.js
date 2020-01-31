import React, { useState, useRef } from 'react';
import { Auth } from 'aws-amplify';
import { useFormik } from 'formik';
import { Growl } from 'primereact/growl';
import { ProgressSpinner } from 'primereact/progressspinner';
import { validateSchema } from './../validation/validationSchema';

function Login(props) {

  const { isSignUp, setSignUp, setLogged } = props;

  const [isPending, setIsPending] = useState(false);
  const inputUser = useRef(null);
  const inputPwd = useRef(null);
  const growl = useRef(null);

  function showSuccess(text) {
    growl.current.show({ severity: 'success', summary: 'Success', detail: text });
  }

  function showError(text) {
    growl.current.show({ severity: 'error', summary: 'Error', detail: text });
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validateSchema,
    onSubmit: values => {
      inputUser.current.blur();
      inputPwd.current.blur();
      isSignUp ? userSignup(values) : userLogin(values);
    },
  });

  function userSignup(data) {
    setIsPending(true);

    Auth.signUp({
      username: data.username,
      password: data.password
    })
      .then(() => {
        showSuccess('Successfully signed up');
        showSuccess('Sign in to do something');
        setSignUp(false);
      })
      .catch(err => {
        showError(err.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  }

  function userLogin(data) {
    setIsPending(true);

    Auth.signIn(data.username, data.password)
      .then(() => {
        setIsPending(false)
        setLogged(true);

      })
      .catch(err => {
        setIsPending(false)
        if (err.code === 'NotAuthorizedException') {
          showError(err.message);

        } else if (err.code === 'UserNotFoundException') {
          showError(err.message);

        } else {
          showError(err.message);

        }
      });
  }

  return (
    <div className="page-container">
      <Growl ref={growl} position="bottomright" />
      <form className='form-wrapper' onSubmit={formik.handleSubmit}>
        <h1>
          {isSignUp ? "Sign up" : "Sign in"}
        </h1>
        <div className="input-wrapper">
          <input
            className={`input-field ${formik.touched.username && formik.errors.username ? 'error' : ''}`}
            type="text"
            name="username"
            ref={inputUser}
            value={formik.values.username}
            onChange={formik.handleChange}
            onFocus={formik.setErrors}
          />
          <span className="placeholder">
            {'Username'}
            <span className="required"> *</span>
          </span>
          {formik.touched.username && formik.errors.username ? (
            <span className="error-span">{formik.errors.username}</span>
          ) : null}
        </div>
        <div className="input-wrapper">
          <input
            className={`input-field ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
            type="password"
            name="password"
            ref={inputPwd}
            value={formik.values.password}
            onChange={formik.handleChange}
            onFocus={formik.setErrors}
          />
          <span className="placeholder">
            {'Password'}
            <span className="required"> *</span>
          </span>
          {formik.touched.password && formik.errors.password ? (
            <span className="error-span">{formik.errors.password}</span>
          ) : null}
        </div>
        <button
          type="submit"
          className='regular-button form-button'
        >
          {
            isSignUp ? 'Sign up' : 'Sign in'
          }
        </button>
      </form>
      {
        isPending && (
          <div className='spinner-wrapper open'>
            <ProgressSpinner />
          </div>
        )
      }
    </div>
  );
}

export default Login;