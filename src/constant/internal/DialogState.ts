export type DialogState = {
  open: boolean;
  mode?: DialogMode;
};

export type DialogMode = "CREATE" | "VIEW" | "EDIT";
