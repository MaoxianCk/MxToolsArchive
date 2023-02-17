export const regexMatchToHtml = (inputStr, pattern, suffix) => {
    try {
        const regex = new RegExp(pattern, suffix);
        let htmlText
        if (pattern !== '' && regex.test(inputStr)) {
            htmlText = inputStr.replace(regex, word => word === '' ? '' : `<span class="regex-highlight">${word}</span>`);
        }
        htmlText = htmlText.replaceAll('\n', '<br />');

        return {
            hasError: false,
            htmlText,
            matchedArray: regex.exec(inputStr)
        }
    } catch {
        return {
            hasError: true,
            htmlText: null,
            matchedArray: []
        }
    }
}
