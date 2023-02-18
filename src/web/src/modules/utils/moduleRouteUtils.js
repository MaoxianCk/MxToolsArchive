import {fuzzyMatch} from '@/utils/stringUtils';


/**
 * 该方法将moduleList.json文件中描述的模块信息，转换为vue-router的路由模块列表
 * 目前仅支持两级路由导航，即 分类: 模块
 * 输入的json的文件的格式说明：
 * {
 *     // 一级为分类
 *     name: String. 分类名称
 *     code: String. 分类编码，编码必须为英文小写，不可有空格，若有间距应使用'-'. 如 'time'、'time-tools‘
 *     children: [
 *         {
 *             name: String. 名称
 *             code: String. 编码
 *             author: String. 该模块的作者昵称
 *             description: String. 模块的说明，简短并简洁的介绍
 *             keyword: [String...]. 用于搜索的关键字列表
 *         }
 *     ]
 * }
 * @param _moduleList 模块列表的描述文件，应为json
 * @param _routePathPrefix 该模块的根路由前缀
 * @returns 工具路由列表
 */

export const createModuleRoutes = (_moduleList, _routePathPrefix) => {
    const fileMap = new Map()
    // 筛出所有vue结尾的文件
    const files = import.meta.glob('@/modules/**/*.vue');
    // console.log(files)
    for (const fileName in files) {
        // 清理前缀和文件名后缀
        // '/src/modules/test/index.vue' -> 'test/index'
        // '/src/modules/test/components/index.vue' -> 'test/components/index'
        const path = fileName.replace(/^\/src\/modules\/|\.vue$/g, '');
        // 提取该模块的模块名，即第一个'/'之前的内容
        const code = path.replace(/\/.*|\.vue$/g, '')
        const targetFilename = path.replace(/^.*\//g, '')
        // 如果path包含'/'则在子文件夹内，那么判断目标文件名是否是index，即是否是该模块的首页
        // 否则即是单文件模块，path如果是index即模块首页
        if (path.includes('/') ? (targetFilename === 'index') : (path !== 'index')) {
            // console.log(path, code, targetFilename)
            fileMap.set(code, files[fileName])
        }
    }
    // console.log(fileMap)

    // console.log(_moduleList, _routePathPrefix)
    // 转换为路由
    return _moduleList.map(category => ({
            // 分类
            path: category.code,
            name: category.name,
            meta: {
                ...category,
                isLeaf: false,
            },
            children: category.children ? category.children.map(module => {
                // 模块
                let component = null
                if (module.modulePath) {
                    component = () => import(module.modulePath)
                } else if (fileMap.has(module.code)) {
                    component = fileMap.get(module.code)
                }
                return {
                    path: module.code,
                    name: module.name,
                    component: component,
                    meta: {
                        ...module,
                        routePath: `${_routePathPrefix}/${category.code}/${module.code}`,
                        isLeaf: true,
                        haveInstance: component !== null
                    }
                }
            }) : [],
        })
    )
}

/**
 * 模糊搜索，匹配模块是否符合pattern
 */
export const calIsShow = (module, pattern) => {
    if (!pattern) {
        return true
    }
    const patternStr = pattern.trim()
    if (patternStr === '') {
        return true
    }
    console.log('calIsShow', module, pattern)
    // 优先匹配短的内容
    if (module.path.includes(patternStr) || module.name.includes(patternStr)) {
        return true
    }
    // 匹配关键字
    if (module.meta.keyword && Array.isArray(module.meta.keyword)) {
        for (let keyword of module.meta.keyword) {
            if (keyword.includes(patternStr)) {
                return true
            }
        }
    }
    // 匹配作者
    if (module.meta.author && module.meta.author.includes(patternStr)) {
        return true
    }
    // 最后全文模糊匹配
    const content = [module.meta.name, module.meta.path, (module.meta.keyword && Array.isArray(module.meta.keyword) ? module.meta.keyword.join(',') : ''), module.meta.description].join(',')
    return fuzzyMatch(content, patternStr)
}
