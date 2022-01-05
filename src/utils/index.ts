import { window , ViewColumn } from "vscode";

/**
 * @description 获取活动窗口选中内容
 * @returns 
 */
export function getSelectedText() {
  if (!window.activeTextEditor) return;
  const { selection, document } = window.activeTextEditor!;
  return document.getText(selection).trim();
}

/**
 * @description 序列化 Json 字符串
 * @param str 
 * @returns 
 */
export function tryEval(str: string) {
  try {
    return JSON.parse(str);
  } catch (ignored) {
    console.error(`"${str}" is not a valid json data`)
  }

  try {
    return eval(`const data = ${str}; data`);
  } catch (err) {
    console.error(`"${str}" is not a valid json data`)
    return {}
  }
}

/**
 * @description 获取布局列
 * @returns 
 */
export function getViewColumn(): ViewColumn {
  const activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return ViewColumn.One;
  }

  switch (activeEditor.viewColumn) {
    case ViewColumn.One:
      return ViewColumn.Two;
    case ViewColumn.Two:
      return ViewColumn.Three;
  }

  return activeEditor.viewColumn as any;
}

/**
 * @description 获取最后一个 import 语句的位置
 * @param code {string} 代码段
 * @returns {number}
 */
export function findLastImportPosition(code: string) {
  var reg = /(import ('[^\s]*')+?[\s;])|(import ([\s\S]+?) from ('[^\s]*')+?)[\s;]/g;
  let res = null;
  let index = 0;
  while(res = reg.exec(code)) {
    if (res) {
      index = res.index + res[0].length
    }
  }
  return index;
}