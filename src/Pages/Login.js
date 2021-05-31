import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/authContext';

const Login = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(signInUser, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {//this will be triggered if the mutation is successfully executed
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function signInUser() {
    loginUser();
  }

  return <div className="form-container">
    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <h1>
        Login
      </h1>
      <Form.Input
        label="Username" 
        placeholder="John Doe" 
        name="username" 
        value={values.username}
        type="text"
        error={errors.username ? true: false}
        onChange={onChange} />
      <Form.Input
        label="Password" 
        type="password" 
        error={errors.password ? true: false}
        placeholder="Jhon1234" 
        name="password" 
        value={values.password}
        onChange={onChange} />

        <Button type="submit" primary>
          Login
        </Button>
    </Form>
    {Object.keys(errors).length > 0 && (<div className="ui error message">
      <ul className="list">
        {Object.values(errors).map(err => <li key={err}>{err}</li>)}
      </ul>
    </div>)}
  </div>;
}

const LOGIN_USER = gql`
  mutation login ($username: String! $password: String!) {
    login(username: $username password: $password) {
      id email token username createdAt
    }
  }
`;

export default Login;