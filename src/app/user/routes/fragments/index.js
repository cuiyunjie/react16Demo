import RBAuthRoute from 'rb-component/lib/rb-auth-route';
export default RBAuthRoute({
  path: 'fragments',
  chunkLoader(cb) {
    require(['./home'], cb);
  }
});