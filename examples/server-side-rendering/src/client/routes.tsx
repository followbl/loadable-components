import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import styled, { ThemeProvider } from 'styled-components';
import loadable from '@loadable/component';
import createBrowserHistory from 'history/createBrowserHistory';
/////////////********* SSR + Plain  *********/////////////
/////////////********* Works  *********/////////////
// import Home from './home'
// import About from './about'

/////////////********* SSR + Loadable *********/////////////
/////////////********* Does Not  *********/////////////
const Home = loadable(() => import(/* webpackChunkName: "Home" */ './home'), {
  fallback: <div>loading...</div>,
});
const About = loadable(() => import(/* webpackChunkName: "About" */ './about'), {
  fallback: <div>loading...</div>,
});

const Body = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
`;



class Routes extends React.Component<any> {
  public render() {
    return (
      // @ts-ignore
      <ThemeProvider theme={{
          primary: 'rgb(83, 109, 254)',
          secondaryTextColor: '#70737d',
          gray90: '#323A3B',
          gray50: '#828A8B',
          gray30: '#B4B9B9',
          gray20: '#CFD2D3',
          gray10: '#EBECEC',
          gray5: '#F5F6F6',
        }}>
        <Body>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Body>
      </ThemeProvider>
    );
  }
}

export default Routes;
