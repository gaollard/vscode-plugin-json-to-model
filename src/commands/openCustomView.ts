import * as vscode from "vscode";
import { document as html } from "../config";

const name = "data-to-interface.openCustomView";

export function openCustomView(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(name, () => {
    const panel = vscode.window.createWebviewPanel(
      "Webview", // viewType
      "类型生成器", // 视图标题
      vscode.ViewColumn.Two, // 显示在编辑器的哪个部位
      {
        enableScripts: true, // 启用JS，默认禁用
        retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
      }
    );
    panel.webview.html = html;
  });

  context.subscriptions.push(disposable);
}
