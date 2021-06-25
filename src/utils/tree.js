function terrFn(data) {
  const menu = []
  const map = {}
  data.forEach(m => {
    m.children = []
    map[m.id] = m // {1:菜单,2:菜单}
    if (m.pid === '') {
      menu.push(m) // 如果是根 就直接push到menu中
    } else {
      map[m.pid] && map[m.pid].children.push(m)
    }
  })
  return menu
}

export default terrFn

