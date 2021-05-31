import React, { useContext } from 'react';
import { Icon, Button, Label, Card, Image } from 'semantic-ui-react';
import { Link }from 'react-router-dom';
import moment from 'moment';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PopUp from '../util/PopUp';
import { AuthContext} from '../context/authContext';

const PostCard = ({ info }) => {

  const { user } = useContext(AuthContext);
  const {
    id,
    username,
    body,
    createdAt,
    likeCount,
    commentCount,
    likes
  } = info;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likeCount, likes }} user={user} />
        <PopUp
          content="comment on post">
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </PopUp>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  )
}

export default PostCard;