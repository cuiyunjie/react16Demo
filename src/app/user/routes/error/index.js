import RBAuthRoute from 'rb-component/lib/rb-auth-route';
export default RBAuthRoute({
  path: 'error',
  chunkLoader(cb) {
    require(['./home'], cb);
  }
});