const  escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
export default function (str) {
	return str.replace(escapeRegexRegex, "\\$1");
}