/* eslint-disable import/no-default-export */

import { ipc_downloadISOPatch } from "./ipc";
import type { ModService } from "./types";

const modApi: ModService = {
  async downloadISOPatch(url: string, isoPath: string, destinationPath: string) {
    await ipc_downloadISOPatch.renderer!.trigger({
      downloadUrl: url,
      isoPath: isoPath,
      destinationPath: destinationPath,
    });
  },
};

export default modApi;
