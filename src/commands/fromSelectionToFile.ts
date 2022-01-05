import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import { getSelectedText, getViewColumn, tryEval } from "../utils";
import { jsonToModel } from 'json-to-ts-model';

const name = "data-to-interface.fromSelectionToFile";

export function fromSelectionToFile(context: vscode.ExtensionContext) {
  const { window, commands } = vscode;
  let disposable = commands.registerCommand(name, () => {
    const text = getSelectedText();
    if (!text) {
      window.showInformationMessage("please select content first");
      return;
    }

    const data = tryEval(text);
    const model = jsonToModel(data);

    const tmpFilePath = path.join(os.tmpdir(), "json-to-ts.ts");
    const tmpFileUri = vscode.Uri.file(tmpFilePath);

    fs.writeFileSync(tmpFilePath, model);
    commands.executeCommand("vscode.open", tmpFileUri, getViewColumn());

    window.showInformationMessage("generate success");
  });

  context.subscriptions.push(disposable);
}
