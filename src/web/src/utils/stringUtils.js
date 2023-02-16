/**
 * 模糊匹配字符串，可匹配空格分隔的多个单词，无视顺序
 * @param target 被搜索的字符串
 * @param pattern 用于搜索的模式串，模式串可用空格区分多个单词
 */
export const fuzzyMatch = (target, pattern) => {
    if (target && pattern) {
        const targetStr = target.toString().trim()
        const patternStr = pattern.toString().trim()
        if (targetStr === '' || patternStr === '') {
            return true
        }
        const regex = new RegExp(patternStr.replace(/\s+/g, '|'))
        // console.log('fuzzyMatched! ', targetStr, patternStr, regex)
        return regex.test(targetStr)
    }
    console.error('target or pattern is not existed')
    return false
}
