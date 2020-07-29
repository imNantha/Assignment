import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Menu from './Menu';
import Footer from './Footer';
import Container from './Container'
import assignmentForm from '../Pages/assignmentSetup/assignmentForm';
import home from '../Pages/home';
import page1 from '../Pages/page1';
import page2 from '../Pages/page2';
import page3 from '../Pages/page3';

function Home() {
  return (
    <React.Fragment>
      <Sidebar />
      <div className="main-content">
        <Menu />
        <Container>
          <Switch>
            <React.Fragment>
              <Route exact path='/' component={home} />
              <Route path='/assignment' component={assignmentForm} />
              <Route path='/page1' component={page1} />
              <Route path='/page2' component={page2} />
              <Route path='/page3' component={page3} />
            </React.Fragment>
          </Switch>
        </Container>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Home;