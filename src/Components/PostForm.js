import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { useForm } from '../util/hooks';

const PostForm = () => {
  const {
    values,
    onChange,
    onSubmit
  } = useForm(createPostCallBack, { body: '' });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data =  proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });//Al crearse un nuevo post, debemos traer nuevamente todos los post desde el server, actualizar la cache con el nuevo resultado 
      //y luego mostrarlo desde cache al usuario
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = ''; 
    },
  });

  function createPostCallBack() {
    createPost(); 
  }

  return <>
    <Form onSubmit={onSubmit}>
      <h2>Create a Post</h2>
      <Form.Field>
        <Form.Input
          placeholde="Hi world!"
          name="body"
          onChange={onChange}
          error={error ? true : false}
          value={values.body} />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
    {error && (<div className="ui error message">
      <ul className="list">
        <li>{error.graphQLErrors[0].message}</li>
      </ul>
    </div>)}
  </>
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id body createdAt username
      likes {
        id username createdAt
      }
      likeCount
      comments {
        id body username createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;