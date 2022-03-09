const getters = {
  sidebar: state => state.app.sidebar,
  routers: state => state.permission.routers,
  token:state => state.user.token,
  roles: state => state.user.roles,
  name: state => state.user.name,
  addRouters:state =>state.permission.addRouters
}
export default getters
