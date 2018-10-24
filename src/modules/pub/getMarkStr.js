export default function getMarkStr(str, startKeep = 3, midKeep=5, endKeep = 3) {
	if (!str) {
		return ''
	}
	let strStart = str.substr(0, startKeep)
	let strEnd = str.substr(str.length - endKeep, str.length)
	let strMid = ''
	for (let i = midKeep; i > 0; i--) {
		strMid +='*'
	}
	return strStart + strMid + strEnd
}