import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/authContext';
import './App.css';
import AuthRoute from './util/AuthRoute';
import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import SinglePost from './Pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
