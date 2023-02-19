export const regexMatchToHtml = (inputStr, pattern, suffix) => {
    let htmlText = inputStr
    if (pattern === '' || inputStr === '') {
        htmlText = htmlText.replaceAll('\n', '<br />');
        return {
            hasError: false,
            htmlText,
            matchedArray: []
        }
    }
    try {
        const regex = new RegExp(pattern, suffix);
        if (pattern !== '' && regex.test(inputStr)) {
            htmlText = htmlText.replace(regex, word => word === '' ? '' : `<span class="regex-highlight">${word}</span>`);
        }
        htmlText = htmlText.replaceAll('\n', '<br />');

        return {
            hasError: false,
            htmlText,
            matchedArray: regex.exec(inputStr)
        }
    } catch (e) {
        console.log(e)
        return {
            hasError: true,
            htmlText: null,
            matchedArray: []
        }
    }
}
