import * as vscode from "vscode";

import { findLastImportPosition, getSelectedText, tryEval } from "../utils";
import { jsonToModel } from 'json-to-ts-model';

const name = "data-to-interface.fromSelectionToCurrent";

export function fromSelectionToCurrent(context: vscode.ExtensionContext) {
  const { window, commands } = vscode;

  let disposable = commands.registerCommand(name, async () => {
    if (!window.activeTextEditor) return;

    var content = window.activeTextEditor.document.getText()

    const text = getSelectedText();
    if (!text) {
      window.showInformationMessage("please select content first");
      return;
    }
 
    const data = tryEval(text);
    const model = jsonToModel(data);

    const index = findLastImportPosition(content);
    const prefix = content.substring(0, index);
    const suffix = content.substring(index);

    let newContent = '';
    if (!prefix) {
      newContent += model.trim();
    } else {
      if (prefix.charAt(prefix.length - 1) === '\n') {
        newContent += `${prefix} ${model.trim()}`
      } else {
        newContent += `${prefix} \n${model.trim()}`
      }
    }

    if (suffix) {
      newContent += `${suffix}`
    }

    window.activeTextEditor!.edit(editBuilder => {
      const end = new vscode.Position(window.activeTextEditor!.document.lineCount + 1, 0);
      editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), newContent);
    });
  });

  context.subscriptions.push(disposable);
}