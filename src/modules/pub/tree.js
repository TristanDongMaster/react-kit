// 获取选择的id数组
export function getIdArray(arr, id) {
  let idArr = []
  arr.map((item) => {
    let children = item.children || []
    if (item.id == id) {
      idArr.push(item.id)
    } else if (children && children.length) {
      idArr.push(item.id)
      let c = getIdArray(children, id)
      if (c && c.length) {
        c.map((item) => {
          idArr.push(item)
        })
      } else {
        idArr.pop()
      }
    }
  })
  return idArr;
}

// 插入子节点
export function insertChildren(arr = [], items = [], parentId) {
  let flag = false
  let newArr = arr.map((item) => {
    let children = item.children || []
    if (children.length && !flag) {
      item.children = insertChildren(item.children, items, parentId)
    } else if (item.id == parentId && !flag) {
      item.children = items
      flag = true
    }
    return item
  })
  return newArr
}

// 获取选中的标题
export function getTitleById(arr, id) {
  let result = {
    id: '',
    title: []
  }
  arr.map((item) => {
    let children = item.children || []
    if (item.id == id) {
      result.id = item.id
      result.title.push(item.title)
    } else if (children && children.length) {
      result.title.push(item.title)
      let c = getDepById(children, id)
      if (c.id) {
        result.id += c.id
        c.title.map((item) => {
          result.title.push(item)
        })
      } else {
        result.title.pop()
      }
    }
  })
  return result;
}

// 插入部门子节点
export function insertNode(arr = [], items = [], id = '') {
  let flag = false
  let newArr = arr.map((item) => {
    let children = item.children || []
    if (children.length && !flag) {
      item.children = insertNode(item.children, items, id)
    } else if (item.id == id && !flag) {
      item.children = items
      flag = true
    }
    return item
  })
  return newArr
}

// 获取部门信息
export function getDepById(arr, id) {
  let result = {
    id: '',
    title: []
  }
  arr.map((item) => {
    let children = item.children || []
    if (item.id == id) {
      result.id = item.id
      result.title.push(item.title)
    } else if (children && children.length) {
      result.title.push(item.title)
      let c = getDepById(children, id)
      if (c.id) {
        result.id += c.id
        c.title.map((item) => {
          result.title.push(item)
        })
      } else {
        result.title.pop()
      }
    }
  })
  return result;
}


// 获取选择部门所有信息
export function getAllNode(node = []) {
  let items = []
  node.map((item) => {
    if (item.node) {
      let subNode = item.node
      items.push({
        id: subNode.props.id,
        title: subNode.props.title
      })
    }
  })
  return items
}