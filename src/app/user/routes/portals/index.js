import RBAuthRoute from 'rb-component/lib/rb-auth-route';
export default RBAuthRoute({
  path: 'portals',
  chunkLoader(cb) {
    require(['./home'], cb);
  }
});