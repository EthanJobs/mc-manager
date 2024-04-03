export const basicRoutes = [
  {
    path: '/welcome',
    component: () => import('@/views/welcome/index.vue'),
    meta: {
      title: '',
      layout: 'welcome',
    },
    children: [
      {
        name: 'WelcomeHome',
        path: 'home',
        component: () => import('@/views/welcome/home.vue'),
        meta: {
          title: '首页',
        },
      }, {
        name: 'WelcomeHometownOfSurvivors',
        path: 'hometownOfSurvivors',
        component: () => import('@/views/welcome/hometownOfSurvivors.vue'),
        meta: {
          title: '生存者之乡',
        },
      }, {
        name: 'WelcomeSurvivorTechnology',
        path: 'survivorTechnology',
        component: () => import('@/views/welcome/survivorTechnology.vue'),
        meta: {
          title: '生存者科技',
        },
      }, {
        name: 'WelcomeSurvivalIsland',
        path: 'survivalIsland',
        component: () => import('@/views/welcome/survivalIsland.vue'),
        meta: {
          title: '生存者空岛',
        },
      }, {
        name: 'WelcomeCommunity',
        path: 'community',
        component: () => import('@/views/welcome/community.vue'),
        meta: {
          title: '社区',
        },
      }, {
        name: 'WelcomeDonate',
        path: 'donate',
        component: () => import('@/views/welcome/donate.vue'),
        meta: {
          title: '捐赠',
        },
      }, {
        name: 'WelcomeAboutUs',
        path: 'aboutUs',
        component: () => import('@/views/welcome/aboutUs.vue'),
        meta: {
          title: '关于我们',
        },
      },
    ]
  },

  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      layout: '',
    },
  },

  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '页面飞走了',
      layout: 'empty',
    },
  },

  {
    name: '403',
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      title: '没有权限',
      layout: 'empty',
    },
  },
]
