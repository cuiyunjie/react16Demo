import {isUrl} from 'components/utils';

const menuData = [
  {
    name: '返回片段类型',
    icon: 'smile-o',
    path: 'fragments'
  },
  {
    name: '错误边界',
    icon: 'smile-o',
    path: 'error'
  },
  {
    name: 'portals',
    icon: 'smile-o',
    path: 'portals'
  }
];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    };
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
