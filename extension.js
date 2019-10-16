// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const forIn = require('lodash.forin');

// define the special characters map
const charMap = {
	'¡': { entity: '&iexcl;', hexadecimal: "\\A1" },
	'¢': { entity: '&cent;', hexadecimal: '\\A2' },
	'£': { entity: '&pound;', hexadecimal: '\\A3' },
	'¤': { entity: '&curren;', hexadecimal: '\\A4' },
	'¥': { entity: '&yen;', hexadecimal: '\\A5' },
	'¦': { entity: '&brvbar;', hexadecimal: '\\A6' },
	'§': { entity: '&sect;', hexadecimal: '\\A7' },
	'¨': { entity: '&uml;', hexadecimal: '\\A8' },
	'©': { entity: '&copy;', hexadecimal: '\\A9' },
	'ª': { entity: '&ordf;', hexadecimal: '\\AA' },
	'«': { entity: '&laquo;', hexadecimal: '\\AB' },
	'¬': { entity: '&not;', hexadecimal: '\\AC' },
	'®': { entity: '&reg;', hexadecimal: '\\AE' },
	'¯': { entity: '&macr;', hexadecimal: '\\AF' },
	'°': { entity: '&deg;', hexadecimal: '\\B0' },
	'±': { entity: '&plusmn;', hexadecimal: '\\B1' },
	'²': { entity: '&sup2;', hexadecimal: '\\B2' },
	'³': { entity: '&sup3;', hexadecimal: '\\B3' },
	'´': { entity: '&acute;', hexadecimal: '\\B4' },
	'µ': { entity: '&micro;', hexadecimal: '\\B5' },
	'¶': { entity: '&para;', hexadecimal: '\\B6' },
	'·': { entity: '&middot;', hexadecimal: '\\B7' },
	'¸': { entity: '&cedil;', hexadecimal: '\\B8' },
	'¹': { entity: '&sup1;', hexadecimal: '\\B9' },
	'º': { entity: '&ordm;', hexadecimal: '\\BA' },
	'»': { entity: '&raquo;', hexadecimal: '\\BB' },
	'¼': { entity: '&frac14;', hexadecimal: '\\BC' },
	'½': { entity: '&frac12;', hexadecimal: '\\BD' },
	'¾': { entity: '&frac34;', hexadecimal: '\\BE' },
	'¿': { entity: '&iquest;', hexadecimal: '\\BF' },
	'À': { entity: '&Agrave;', hexadecimal: '\\C0' },
	'Á': { entity: '&Aacute;', hexadecimal: '\\C1' },
	'Â': { entity: '&Acirc;', hexadecimal: '\\C2' },
	'Ã': { entity: '&Atilde;', hexadecimal: '\\C3' },
	'Ä': { entity: '&Auml;', hexadecimal: '\\C4' },
	'Å': { entity: '&Aring;', hexadecimal: '\\C5' },
	'Æ': { entity: '&AElig;', hexadecimal: '\\C6' },
	'Ç': { entity: '&Ccedil;', hexadecimal: '\\C7' },
	'È': { entity: '&Egrave;', hexadecimal: '\\C8' },
	'É': { entity: '&Eacute;', hexadecimal: '\\C9' },
	'Ê': { entity: '&Ecirc;', hexadecimal: '\\CA' },
	'Ë': { entity: '&Euml;', hexadecimal: '\\CB' },
	'Ì': { entity: '&Igrave;', hexadecimal: '\\CC' },
	'Í': { entity: '&Iacute;', hexadecimal: '\\CD' },
	'Î': { entity: '&Icirc;', hexadecimal: '\\CE' },
	'Ï': { entity: '&Iuml;', hexadecimal: '\\CF' },
	'Ð': { entity: '&ETH;', hexadecimal: '\\D0' },
	'Ñ': { entity: '&Ntilde;', hexadecimal: '\\D1' },
	'Ò': { entity: '&Ograve;', hexadecimal: '\\D2' },
	'Ó': { entity: '&Oacute;', hexadecimal: '\\D3' },
	'Ô': { entity: '&Ocirc;', hexadecimal: '\\D4' },
	'Õ': { entity: '&Otilde;', hexadecimal: '\\D5' },
	'Ö': { entity: '&Ouml;', hexadecimal: '\\D6' },
	'×': { entity: '&times;', hexadecimal: '\\D7' },
	'Ø': { entity: '&Oslash;', hexadecimal: '\\D8' },
	'Ù': { entity: '&Ugrave;', hexadecimal: '\\D9' },
	'Ú': { entity: '&Uacute;', hexadecimal: '\\DA' },
	'Û': { entity: '&Ucirc;', hexadecimal: '\\DB' },
	'Ü': { entity: '&Uuml;', hexadecimal: '\\DC' },
	'Ý': { entity: '&Yacute;', hexadecimal: '\\DD' },
	'Þ': { entity: '&THORN;', hexadecimal: '\\DE' },
	'ß': { entity: '&szlig;', hexadecimal: '\\DF' },
	'à': { entity: '&agrave;', hexadecimal: '\\E0' },
	'á': { entity: '&aacute;', hexadecimal: '\\E1' },
	'â': { entity: '&acirc;', hexadecimal: '\\E2' },
	'ã': { entity: '&atilde;', hexadecimal: '\\E3' },
	'ä': { entity: '&auml;', hexadecimal: '\\E4' },
	'å': { entity: '&aring;', hexadecimal: '\\E5' },
	'æ': { entity: '&aelig;', hexadecimal: '\\E6' },
	'ç': { entity: '&ccedil;', hexadecimal: '\\E7' },
	'è': { entity: '&egrave;', hexadecimal: '\\E8' },
	'é': { entity: '&eacute;', hexadecimal: '\\E9' },
	'ê': { entity: '&ecirc;', hexadecimal: '\\EA' },
	'ë': { entity: '&euml;', hexadecimal: '\\EB' },
	'ì': { entity: '&igrave;', hexadecimal: '\\EC' },
	'í': { entity: '&iacute;', hexadecimal: '\\ED' },
	'î': { entity: '&icirc;', hexadecimal: '\\EE' },
	'ï': { entity: '&iuml;', hexadecimal: '\\EF' },
	'ð': { entity: '&eth;', hexadecimal: '\\F0' },
	'ñ': { entity: '&ntilde;', hexadecimal: '\\F1' },
	'ò': { entity: '&ograve;', hexadecimal: '\\F2' },
	'ó': { entity: '&oacute;', hexadecimal: '\\F3' },
	'ô': { entity: '&ocirc;', hexadecimal: '\\F4' },
	'õ': { entity: '&otilde;', hexadecimal: '\\F5' },
	'ö': { entity: '&ouml;', hexadecimal: '\\F6' },
	'÷': { entity: '&divide;', hexadecimal: '\\F7' },
	'ø': { entity: '&oslash;', hexadecimal: '\\F8' },
	'ù': { entity: '&ugrave;', hexadecimal: '\\F9' },
	'ú': { entity: '&uacute;', hexadecimal: '\\FA' },
	'û': { entity: '&ucirc;', hexadecimal: '\\FB' },
	'ü': { entity: '&uuml;', hexadecimal: '\\FC' },
	'ý': { entity: '&yacute;', hexadecimal: '\\FD' },
	'þ': { entity: '&thorn;', hexadecimal: '\\FE' },
	'ÿ': { entity: '&yuml;', hexadecimal: '\\FF' },
	'€': { entity: '&euro;', hexadecimal: '\\20AC' }
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
