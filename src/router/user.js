/*
1. meta: {
    index: 用来标识每个路由
}

*/

module.exports = {
    name: 'user',
    path: '/user',
    component: () => import('@/views/user'),
    children: [
        {
            name: 'index',
            path: 'index',
            component: () => import('@/views/user/components/Index'),
            meta: {
                index: 0
            }
        },
        {
            name: 'driver',
            path: 'driver',
            component: () => import('@/views/user/components/Driver'),
            meta: {
                index: 1
            }
        },
        {
            name: 'guide',
            path: 'guide',
            component: () => import('@/views/user/components/Guide'),
            meta: {
                index: 2
            }
        },
        {
            name: 'permission',
            path: 'permission',
            component: () => import('@/views/user/components/Permission'),
            meta: {
                index: 3
            }
        },
        {
            name: 'icons',
            path: 'icons',
            component: () => import('@/views/user/components/Icons'),
            meta: {
                index: 4
            }
        },
        {
            name: 'components',
            path: 'components',
            redirect: 'components/button',
            component: () => import('@/views/user/components/Components'),
            children: [
                {
                    name: 'button',
                    path: 'button',
                    component: () => import('@/EncapComponents/Buttons'),
                    meta: {
                        index: 17
                    },
                },
                {
                    name: 'drag',
                    path: 'drag',
                    component: () => import('@/EncapComponents/Drags'),
                    meta: {
                        index: 18
                    }
                }
            ]
        },
        {
            name: 'charts',
            path: 'charts',
            redirect: '/user/charts/echarts3D',
            component: () => import('@/views/user/components/Charts'),
            children: [
                {
                    name: 'echarts3D',
                    path: 'echarts3D',
                    component: () => import('@/views/user/components/Charts/components/Echarts3D'),
                    meta: {
                        index: 6
                    },
                },
                {
                    name: 'echartsBar',
                    path: 'echartsBar',
                    component: () => import('@/views/user/components/Charts/components/EchartsBar'),
                    meta: {
                        index: 7
                    },
                }
            ]
        },
        {
            name: 'timeline',
            path: 'timeline',
            component: () => import('@/views/user/components/Timeline'),
            meta: {
                index: 8
            }
        },
        {
            name: 'table',
            path: 'table',
            redirect: '/user/table/dragTable',
            component: () => import('@/views/user/components/Table'),
            children: [
                {
                    name: 'dragTable',
                    path: 'dragTable',
                    component: () => import('@/views/user/components/Table/components/DragTable'),
                    meta: {
                        index: 19
                    }
                },
                {
                    name: 'complexTable',
                    path: 'complexTable',
                    component: () => import('@/views/user/components/Table/components/ComplexTable'),
                    meta: {
                        index: 20
                    }
                }
            ]
        },
        {
            name: 'example',
            path: 'example',
            component: () => import('@/views/user/components/Example'),
            meta: {
                index: 10
            }
        },
        {
            name: 'tab',
            path: 'tab',
            component: () => import('@/views/user/components/Tab'),
            meta: {
                index: 11
            }
        },
        {
            name: 'editor',
            path: 'editor',
            redirect: '/editor/richText',
            component: () => import('@/views/user/components/Editor'),
            children: [
                {
                    name: 'richText',
                    path: 'richText',
                    component: () => import('@/views/user/components/Editor/components/RichText'),
                    meta: {
                        index: 12
                    }
                },
                {
                    name: 'markdown',
                    path: 'markdown',
                    component: () => import('@/views/user/components/Editor/components/Markdown'),
                    meta: {
                        index: 26
                    }
                },
                {
                    name: 'jsonEditor',
                    path: 'jsonEditor',
                    component: () => import('@/views/user/components/Editor/components/JsonEditor'),
                    meta: {
                        index: 27
                    }
                },
            ]
        },
        {
            name: 'lazyLoad',
            path: 'lazyLoad',
            component: () => import('@/views/user/components/LazyLoad'),
            meta: {
                index: 13
            }
        },
        {
            name: 'exportZip',
            path: 'exportZip',
            component: () => import('@/views/user/components/ExportZip'),
            meta: {
                index: 14
            }
        },
        {
            name: 'changeTheme',
            path: 'changeTheme',
            component: () => import('@/views/user/components/ChangeTheme'),
            meta: {
                index: 15
            }
        },
        {
            name: 'clipboard',
            path: 'clipboard',
            component: () => import('@/views/user/components/ClipBoard'),
            meta: {
                index: 16
            }
        },
        {
            name: 'profile',
            path: 'profile',
            redirect: '/user/profile/mainPage',
            component: () => import('@/views/user/components/Profile'),
            children: [
                {
                    name: 'mainPage',
                    path: 'mainPage',
                    component: () => import('@/views/user/components/Profile/MainPage'),
                    meta: {
                        index: 21
                    }
                },
                {
                    name: 'imageWall',
                    path: 'imageWall',
                    component: () => import('@/views/user/components/Profile/ImageWall'),
                    meta: {
                        index: 22
                    }
                },
                {
                    name: 'setting',
                    path: 'setting',
                    component: () => import('@/views/user/components/Profile/Setting'),
                    meta: {
                        index: 23
                    }
                },
            ]
        },
        {
            name: 'particle',
            path: 'particle',
            redirect: '/particle/dragClick',
            component: () => import('@/views/user/components/Particle'),
            children: [
                {
                    name: 'dragClick',
                    path: 'dragClick',
                    component: () => import('@/views/user/components/Particle/components/DragClick'),
                    meta: {
                        index:24
                    },
                },
                {
                    name: 'rays',
                    path: 'rays',
                    component: () => import('@/views/user/components/Particle/components/Rays'),
                    meta: {
                        index: 25
                    }
                }
            ]
        },
    ]
}