export const createModuleRoutes = (_moduleList, _routePathPrefix) => {
  const results = []
  const s = new Set()
  const files = import.meta.globEager('@/modules/*.vue');
  Object.keys(files).forEach((fileName) => {
    const name = fileName.replace(/\/.*\/|\.vue/g, '');
    s.add(name)
  });
  const addToRoutes = (module, routes, pathPrefix) => {
    const isLeaf = !module.children || module.type == 'module'
    let item = {
      path: module.code,
      name: module.name,
      children: isLeaf ? null : [],
      meta: {
        info: module,
        isLeaf: isLeaf,
        routePath: `${pathPrefix}/${module.code}`
      }
    }
    if (isLeaf) {
      if (s.has(module.code)) {
        item.component = () => import(`@/modules/${module.code}.vue`)
      }
    }
    routes.push(item)
    return item
  }
  const travelEach = (list, resList, routePathPrefix) => {
    if (!list) { return }
    list.map(item => {
      let route = addToRoutes(item, resList, routePathPrefix)
      travelEach(item.children, route.children, route.meta.routePath)
    })
  }
  travelEach(_moduleList, results, _routePathPrefix)
  console.log(results)

  return results
}

export const calIsShow = (module, pattern) => {
  return module.path.indexOf(pattern) !== -1
}