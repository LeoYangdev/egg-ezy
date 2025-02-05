// 普通管理员权限菜单
const adminmodel = [
  {
    'id': 1,
    'name': '志愿活动',
    'image': '',
    'icon': {'name':'dashboard-1','color':'cornflowerblue'},
    'url': './volunteer/index'
  },
  {
    'id': 2,
    'name': '勤工俭学',
    'image': '',
    'icon': {'name':'work','color':'cornflowerblue'},
    'url': 'work/workstudy'
  },
  {
    'id': 3,
    'name': '用户管理',
    'image': '',
    'icon': {'name':'user','color':'cornflowerblue'},
    'url': 'usermanage/index'
  },
  {
    'id': 4,
    'name': '部门管理',
    'image': '',
    'icon': {'name':'usergroup','color':'cornflowerblue'},
    'url': './department/depart'
  },
  {
    'id': 5,
    'name': '内容管理',
    'image': '',
    'icon': {'name':'article','color':'cornflowerblue'},
    'url': './article/index'
  },
  {
    'id': 6,
    'name': '通知管理',
    'image': '',
    'icon': {'name':'notification','color':'cornflowerblue'},
    'url': './message/index'
  },
  {
    'id': 7,
    'name': '学分转换',
    'image': '',
    'icon': {'name':'arrow-left-right-1','color':'cornflowerblue'},
    'url': './convert/convert'
  },
  {
    'id': 8,
    'name': '反馈管理',
    'image': '',
    'icon': {'name':'service','color':'cornflowerblue'},
    'url': './feedback/index'
  }
]
// 超级管理员权限菜单
const supermodel = [
   {
    'id': 1,
    'name': '志愿活动',
    'image': '',
    'icon': {'name':'dashboard-1','color':'cornflowerblue'},
    'url': './volunteer/index'
  },
  {
    'id': 2,
    'name': '勤工俭学',
    'image': '',
    'icon': {'name':'work','color':'cornflowerblue'},
    'url': 'work/workstudy'
  },
  {
    'id': 3,
    'name': '用户管理',
    'image': '',
    'icon': {'name':'user','color':'cornflowerblue'},
    'url': 'usermanage/index'
  },
  {
    'id': 4,
    'name': '部门管理',
    'image': '',
    'icon': {'name':'usergroup','color':'cornflowerblue'},
    'url': './department/depart'
  },
  {
    'id': 5,
    'name': '权限管理',
    'image': '',
    'icon': {'name':'lock-on','color':'cornflowerblue'},
    'url': './access/index'
  },
  {
    'id': 6,
    'name': '内容管理',
    'image': '',
    'icon': {'name':'article','color':'cornflowerblue'},
    'url': './article/index'
  },
  {
    'id': 7,
    'name': '通知管理',
    'image': '',
    'icon': {'name':'notification','color':'cornflowerblue'},
    'url': './message/index'
  },
  {
    'id': 8,
    'name': '日志管理',
    'image': '',
    'icon': {'name':'chart-analytics','color':'cornflowerblue'},
    'url': 'log/loginfo'
  },
  {
    'id': 9,
    'name': '学分转换',
    'image': '',
    'icon': {'name':'arrow-left-right-1','color':'cornflowerblue'},
    'url': './convert/convert'
  },
  {
    'id': 10,
    'name': '反馈管理',
    'image': '',
    'icon': {'name':'service','color':'cornflowerblue'},
    'url': './feedback/index'
  }
]

var config={
  adminmodel,
  supermodel
}
module.exports=config//输出配置