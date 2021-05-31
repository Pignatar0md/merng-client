import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { AuthContext } from '../context/authContext';
import PostCard from '../Components/PostCard';
import PostForm from '../Components/PostForm';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <Grid.Column>
          <h1>Recent Posts</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {
          user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )
        }
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <Transition.Group>
            {data && data.getPosts.map(post => (
            <Grid.Column key={post.id}>
              <PostCard info={post} />
            </Grid.Column>))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
}

export default Home;