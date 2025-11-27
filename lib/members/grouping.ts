/**
 * 部員・スタッフの分類グルーピングと表示順序を管理するモジュール
 * 分類ごとにメンバーを振り分け、指定された順序で並び替える
 */
import type { Member } from "@/types";

const DEFAULT_CLASSIFICATION = "未分類";

/**
 * 分類ごとにグループ化する
 */
export const groupByClassification = (people: Member[]) =>
  people.reduce<Record<string, Member[]>>((acc, person) => {
    const key = person.classification?.trim() || DEFAULT_CLASSIFICATION;
    if (!acc[key]) acc[key] = [];
    acc[key].push(person);
    return acc;
  }, {});

/**
 * グループのキーを優先順位に従って並び替える
 */
export const orderKeys = (
  groups: Record<string, Member[]>,
  preferredOrder: string[]
) => [
  ...preferredOrder.filter((classification) => groups[classification]?.length),
  ...Object.keys(groups)
    .filter(
      (classification) =>
        !preferredOrder.includes(classification) &&
        groups[classification]?.length
    )
    .sort((a, b) => a.localeCompare(b, "ja")),
];

/// 部員の分類順序
export const memberClassificationOrder = ["マネージャー", "4回生", "3回生", "2回生", "1回生"];

/// スタッフの分類順序
export const staffClassificationOrder = ["部長", "総監督", "監督", "コーチ"];

/// 部員の分類表示名
export const memberClassificationDisplay: Record<string, string> = {
  マネージャー: "マネージャー",
  "4回生": "4回生",
  "3回生": "3回生",
  "2回生": "2回生",
  "1回生": "1回生",
};

/// スタッフの分類表示名
export const staffClassificationDisplay: Record<string, string> = {
  部長: "部長",
  総監督: "総監督",
  監督: "監督",
  コーチ: "コーチ",
};
