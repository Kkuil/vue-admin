const actions = {
    // 查找
    findBreadcrumb(store, breadcrumb) {
        const { index, route } = breadcrumb
        const { breads } = store.state
        const isExist = breads.every(bread => bread.route != route)
        !isExist ? store.commit('MODIFYBC', route) : store.commit('ADDBC', { index, route })
    },
    // 删除
    delBreadcrumb(store, { route, router }) {
        const { breads } = store.state
        breads.forEach((bread, i) => {
            if (bread.route == route) {
                store.commit('DELBC', { index: i, isActive: bread.isActive, router })
            }
        })
    }
}

const mutations = {
    // 增加
    ADDBC(state, breadcrumb) {
        const { breads } = state
        breads.forEach(bread => bread.isActive = false)
        breads.push({
            ...breadcrumb,
            isActive: true
        })
    },
    // 修改
    MODIFYBC(state, route) {
        const { breads } = state
        breads.forEach(bread => {
            if (bread.route == route) bread.isActive = true
            else bread.isActive = false
        })
    },
    // 删除
    DELBC(state, { index, isActive, router }) {
        const { breads } = state
        breads.splice(index, 1)
        if (isActive) {
            router.push({
                name: breads[breads.length - 1].route
            })
            setTimeout(() => {
                breads[breads.length - 1].isActive = true
            })
        }
    },
    // 刷新
    REFRESH(state, router) {
        const { breads } = state
        breads.forEach(bread => {
            if (bread.isActive) {
                router.push({
                    name: bread.route
                })
            }
        })
    },
    // 删除所有
    DELALL(state) {
        const { breads } = state
        breads.splice(1)
        console.log(breads)
    },
    // 删除其他的路由
    CLOSEOTHERS(state, index) {
        if (!index) return
        const { breads } = state
        let tempRoute = {}
        let curIndex = 0
        breads.forEach((bread, i) => {
            if (bread.index == index) {
                tempRoute = bread
                curIndex = i
            }
        })
        breads.splice(1, curIndex - 1)
        breads.splice(2)
    },
}

const state = {
    breads: [
        {
            index: 0,
            route: 'index',
            isActive: true
        }
    ]
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}