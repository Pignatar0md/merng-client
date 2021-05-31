import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/authContext';
import { useForm } from '../util/hooks';

const Register = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {//this will be triggered if the mutation is successfully executed
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return <div className="form-container">
    <Form
      onSubmit={onSubmit}
      noValidate
      className={loading ? "loading" : ""}>
      <h1>
        Register
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
        label="E-mail" 
        type="email"
        error={errors.email ? true: false}
        placeholder="johndoe@pipmail.com" 
        name="email"
        value={values.email}
        onChange={onChange} />
      <Form.Input
        label="Password" 
        type="password" 
        error={errors.password ? true: false}
        placeholder="Jhon1234" 
        name="password" 
        value={values.password}
        onChange={onChange} />
      <Form.Input
        label="Confirm Password" 
        type="password" 
        error={errors.confirmPassword ? true: false}
        placeholder="Jhon1234" 
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange} />

        <Button type="submit" primary>
          Register
        </Button>
    </Form>
    {Object.keys(errors).length > 0 && (<div className="ui error message">
      <ul className="list">
        {Object.values(errors).map(err => <li key={err}>{err}</li>)}
      </ul>
    </div>)}
  </div>;
}

const REGISTER_USER = gql`
  mutation register (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username createdAt token
    }
  }
`;

export default Register;