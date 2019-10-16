// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const forIn = require('lodash.forin');

// define the special characters map
const charMap = {
	'¡': { entity: '&iexcl;', hexadecimal: "\\xA1" },
	'¢': { entity: '&cent;', hexadecimal: '\\xA2' },
	'£': { entity: '&pound;', hexadecimal: '\\xA3' },
	'¤': { entity: '&curren;', hexadecimal: '\\xA4' },
	'¥': { entity: '&yen;', hexadecimal: '\\xA5' },
	'¦': { entity: '&brvbar;', hexadecimal: '\\xA6' },
	'§': { entity: '&sect;', hexadecimal: '\\xA7' },
	'¨': { entity: '&uml;', hexadecimal: '\\xA8' },
	'©': { entity: '&copy;', hexadecimal: '\\xA9' },
	'ª': { entity: '&ordf;', hexadecimal: '\\xAA' },
	'«': { entity: '&laquo;', hexadecimal: '\\xAB' },
	'¬': { entity: '&not;', hexadecimal: '\\xAC' },
	'®': { entity: '&reg;', hexadecimal: '\\xAE' },
	'¯': { entity: '&macr;', hexadecimal: '\\xAF' },
	'°': { entity: '&deg;', hexadecimal: '\\xB0' },
	'±': { entity: '&plusmn;', hexadecimal: '\\xB1' },
	'²': { entity: '&sup2;', hexadecimal: '\\xB2' },
	'³': { entity: '&sup3;', hexadecimal: '\\xB3' },
	'´': { entity: '&acute;', hexadecimal: '\\xB4' },
	'µ': { entity: '&micro;', hexadecimal: '\\xB5' },
	'¶': { entity: '&para;', hexadecimal: '\\xB6' },
	'·': { entity: '&middot;', hexadecimal: '\\xB7' },
	'¸': { entity: '&cedil;', hexadecimal: '\\xB8' },
	'¹': { entity: '&sup1;', hexadecimal: '\\xB9' },
	'º': { entity: '&ordm;', hexadecimal: '\\xBA' },
	'»': { entity: '&raquo;', hexadecimal: '\\xBB' },
	'¼': { entity: '&frac14;', hexadecimal: '\\xBC' },
	'½': { entity: '&frac12;', hexadecimal: '\\xBD' },
	'¾': { entity: '&frac34;', hexadecimal: '\\xBE' },
	'¿': { entity: '&iquest;', hexadecimal: '\\xBF' },
	'À': { entity: '&Agrave;', hexadecimal: '\\xC0' },
	'Á': { entity: '&Aacute;', hexadecimal: '\\xC1' },
	'Â': { entity: '&Acirc;', hexadecimal: '\\xC2' },
	'Ã': { entity: '&Atilde;', hexadecimal: '\\xC3' },
	'Ä': { entity: '&Auml;', hexadecimal: '\\xC4' },
	'Å': { entity: '&Aring;', hexadecimal: '\\xC5' },
	'Æ': { entity: '&AElig;', hexadecimal: '\\xC6' },
	'Ç': { entity: '&Ccedil;', hexadecimal: '\\xC7' },
	'È': { entity: '&Egrave;', hexadecimal: '\\xC8' },
	'É': { entity: '&Eacute;', hexadecimal: '\\xC9' },
	'Ê': { entity: '&Ecirc;', hexadecimal: '\\xCA' },
	'Ë': { entity: '&Euml;', hexadecimal: '\\xCB' },
	'Ì': { entity: '&Igrave;', hexadecimal: '\\xCC' },
	'Í': { entity: '&Iacute;', hexadecimal: '\\xCD' },
	'Î': { entity: '&Icirc;', hexadecimal: '\\xCE' },
	'Ï': { entity: '&Iuml;', hexadecimal: '\\xCF' },
	'Ð': { entity: '&ETH;', hexadecimal: '\\xD0' },
	'Ñ': { entity: '&Ntilde;', hexadecimal: '\\xD1' },
	'Ò': { entity: '&Ograve;', hexadecimal: '\\xD2' },
	'Ó': { entity: '&Oacute;', hexadecimal: '\\xD3' },
	'Ô': { entity: '&Ocirc;', hexadecimal: '\\xD4' },
	'Õ': { entity: '&Otilde;', hexadecimal: '\\xD5' },
	'Ö': { entity: '&Ouml;', hexadecimal: '\\xD6' },
	'×': { entity: '&times;', hexadecimal: '\\xD7' },
	'Ø': { entity: '&Oslash;', hexadecimal: '\\xD8' },
	'Ù': { entity: '&Ugrave;', hexadecimal: '\\xD9' },
	'Ú': { entity: '&Uacute;', hexadecimal: '\\xDA' },
	'Û': { entity: '&Ucirc;', hexadecimal: '\\xDB' },
	'Ü': { entity: '&Uuml;', hexadecimal: '\\xDC' },
	'Ý': { entity: '&Yacute;', hexadecimal: '\\xDD' },
	'Þ': { entity: '&THORN;', hexadecimal: '\\xDE' },
	'ß': { entity: '&szlig;', hexadecimal: '\\xDF' },
	'à': { entity: '&agrave;', hexadecimal: '\\xE0' },
	'á': { entity: '&aacute;', hexadecimal: '\\xE1' },
	'â': { entity: '&acirc;', hexadecimal: '\\xE2' },
	'ã': { entity: '&atilde;', hexadecimal: '\\xE3' },
	'ä': { entity: '&auml;', hexadecimal: '\\xE4' },
	'å': { entity: '&aring;', hexadecimal: '\\xE5' },
	'æ': { entity: '&aelig;', hexadecimal: '\\xE6' },
	'ç': { entity: '&ccedil;', hexadecimal: '\\xE7' },
	'è': { entity: '&egrave;', hexadecimal: '\\xE8' },
	'é': { entity: '&eacute;', hexadecimal: '\\xE9' },
	'ê': { entity: '&ecirc;', hexadecimal: '\\xEA' },
	'ë': { entity: '&euml;', hexadecimal: '\\xEB' },
	'ì': { entity: '&igrave;', hexadecimal: '\\xEC' },
	'í': { entity: '&iacute;', hexadecimal: '\\xED' },
	'î': { entity: '&icirc;', hexadecimal: '\\xEE' },
	'ï': { entity: '&iuml;', hexadecimal: '\\xEF' },
	'ð': { entity: '&eth;', hexadecimal: '\\xF0' },
	'ñ': { entity: '&ntilde;', hexadecimal: '\\xF1' },
	'ò': { entity: '&ograve;', hexadecimal: '\\xF2' },
	'ó': { entity: '&oacute;', hexadecimal: '\\xF3' },
	'ô': { entity: '&ocirc;', hexadecimal: '\\xF4' },
	'õ': { entity: '&otilde;', hexadecimal: '\\xF5' },
	'ö': { entity: '&ouml;', hexadecimal: '\\xF6' },
	'÷': { entity: '&divide;', hexadecimal: '\\xF7' },
	'ø': { entity: '&oslash;', hexadecimal: '\\xF8' },
	'ù': { entity: '&ugrave;', hexadecimal: '\\xF9' },
	'ú': { entity: '&uacute;', hexadecimal: '\\xFA' },
	'û': { entity: '&ucirc;', hexadecimal: '\\xFB' },
	'ü': { entity: '&uuml;', hexadecimal: '\\xFC' },
	'ý': { entity: '&yacute;', hexadecimal: '\\xFD' },
	'þ': { entity: '&thorn;', hexadecimal: '\\xFE' },
	'ÿ': { entity: '&yuml;', hexadecimal: '\\xFF' },
	'€': { entity: '&euro;', hexadecimal: '\\u20AC' }
}

// build match regex for charmap keys
let regex = '[';
Object.keys(charMap).map(key => regex += key)
regex += "]";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// implementations of extension command
	let disposable1 = vscode.commands.registerCommand('extension.convertSpecialCharsToEntities', function () {
		let editor = vscode.window.activeTextEditor;
		if (!editor) return;
		replaceEntities(editor, 'entity');
	});

	let disposable2 = vscode.commands.registerCommand('extension.convertSpecialCharsToHexadecimal', function () {
		let editor = vscode.window.activeTextEditor;
		if (!editor) return;
		replaceEntities(editor, 'hexadecimal');
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

function regexIndexOf(value, regex, startpos) {
	var indexOf = value.substring(startpos || 0).search(regex);
	return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

async function replaceEntities(editor, type) {

	let selectionStart = editor.selection.start;
	let selectionEnd = editor.selection.end;
	let runOnSelected = false;

	// verify if none selected
	if (selectionStart.line != selectionEnd.line || selectionStart.character != selectionEnd.character) {
		// run for selected range
		runOnSelected = true;
	}

	// define start and end line
	let lineStart = runOnSelected ? selectionStart.line : 0;
	let lineEnd = runOnSelected ? (selectionEnd.line + 1) : editor.document.lineCount;
	let characterStart = selectionStart.character;
	let characterEnd = selectionEnd.character;

	// iterate for all lines
	for (let line = lineStart; line < lineEnd; line++) {
		let found = true;
		let lastFoundIndex = -1;
		// iterate for all characters
		while (found) {
			let lineContents = editor.document.lineAt(line).text;
			let charStart = 0;
			let charEnd = lineContents.length;
			if (runOnSelected) {
				if (line == selectionStart.line) {
					charStart = characterStart;
				}
				if (line == selectionEnd.line) {
					charEnd = characterEnd;
				}
			}
			lastFoundIndex = regexIndexOf(lineContents, regex, lastFoundIndex + 1); // search for the next special character
			if (lastFoundIndex >= 0) {
				if (lastFoundIndex >= charStart && lastFoundIndex < charEnd) {
					let replaceWith = charMap[lineContents[lastFoundIndex]][type]; // add converted character length to iteration
					characterEnd += (replaceWith.length - 1);
					await editor.edit((edit) => {
						edit.delete(new vscode.Range(new vscode.Position(line, lastFoundIndex), new vscode.Position(line, lastFoundIndex + 1)));
						edit.insert(new vscode.Position(line, lastFoundIndex), replaceWith);
					});
				}
				found = true;
			} else {
				found = false;
			}
		}
	}
}


module.exports = {
	activate,
	deactivate
}
