export interface Folder {
  name: string;
  id: string;
  parentFolderId: string;
  folders: Folder[];
  files: File[];
}

export interface File {
  name: string;
  id: string;
  url: string;
}
