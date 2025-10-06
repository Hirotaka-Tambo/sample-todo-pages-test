export const TAG_OPTIONS = ["仕事", "学習", "家事", "趣味", "買い物", "その他"] as const;
export const PRIORITY_OPTIONS = ["高", "中", "低"] as const;

export const PRIORITY_WEIGHT = {
    "高": 3,
    "中": 2,
    "低": 1
} as const;

export const DEFAULT_PRIORITY = "中";
export const DEFAULT_TAG = "仕事";