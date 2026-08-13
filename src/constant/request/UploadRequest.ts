export type UploadContext = "room-types";

export type UpLoadRequest = {
  file: File;
  context?: UploadContext;
};
