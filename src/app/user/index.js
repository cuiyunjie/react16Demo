import "babel-polyfill";
import React from 'react';
import {render} from "react-dom";
import {createHistory} from 'history';
import {Router, useRouterHistory} from 'react-router';
import RBAuthRoute from 'rb-component/lib/rb-auth-route';

const browserHistory = useRouterHistory(createHistory)({
  basename: "/user"
});

const rootRoute = RBAuthRoute({
  path: '/',
  indexRoute: { onEnter: (nextState, replace) => replace('/fragments') },
  chunkLoader(cb) {
    cb(
      require('./home'),
      require('./routes/fragments'),
      require('./routes/error'),
      require('./routes/portals')
    );
  }
});

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('container')
);
