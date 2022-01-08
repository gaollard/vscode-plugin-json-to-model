import * as vscode from "vscode";

import { findLastImportPosition, getSelectedText, tryEval } from "../utils";
import { jsonToModel } from "json-to-ts-model";

const name = "data-to-interface.fromSelectionToCurrent";

function getLineCount(code: any) {
  let count = 0;
  for (let key in code) {
    if (code[key] === "\n") {
      count++;
    }
  }
  return count;
}

export function fromSelectionToCurrent(context: vscode.ExtensionContext) {
  const { window, commands } = vscode;

  let disposable = commands.registerCommand(name, async () => {
    if (!window.activeTextEditor) return;

    const text = getSelectedText();
    if (!text) {
      window.showInformationMessage("please select content first");
      return;
    }

    const { start, end } = window.activeTextEditor.selection;
    const content = window.activeTextEditor.document.getText();

    const data = tryEval(text);
    const model = jsonToModel(data).trim();
    let lines = getLineCount(model);

    const index = findLastImportPosition(content);
    const prefix = content.substring(0, index);
    const suffix = content.substring(index);

    let newContent = '';
    if (!prefix) {
      newContent += model;
    } else {
      if (prefix.charAt(prefix.length - 1) === '\n') {
        newContent += `${prefix} ${model}`
      } else {
        newContent += `${prefix} \n${model}`
        lines += 1;
      }
    }

    if (suffix) {
      newContent += `${suffix}`
    }

    window
      .activeTextEditor!.edit((editBuilder) => {
        const end = new vscode.Position(
          window.activeTextEditor!.document.lineCount + 1,
          0
        );
        editBuilder.replace(
          new vscode.Range(new vscode.Position(0, 0), end),
          newContent
        );
      })
      .then((editor) => {
        // remove selection
        // const position = window.activeTextEditor!.selection.end;
        // window.activeTextEditor!.selection = new vscode.Selection(
        //   position,
        //   position
        // );

        // restore selection
        window.activeTextEditor!.selection = new vscode.Selection(
          new vscode.Position(start.line + lines, start.character),
          new vscode.Position(end.line + lines, end.character),
        );
      });
  });

  context.subscriptions.push(disposable);
}
