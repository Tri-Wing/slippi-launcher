import { colors } from "@common/colors";
import { css } from "@emotion/react";
import FolderIcon from "@mui/icons-material/Folder";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

import { BasicFooter } from "@/components/Footer";
import { LabelledText } from "@/components/LabelledText";
import { useSpectateSlpPath } from "@/lib/hooks/useSettings";

export const Footer: React.FC = () => {
  const [spectateSlpFolder, setSpectateSlpFolder] = useSpectateSlpPath();
  const onClick = async () => {
    const result = await window.electron.common.showOpenDialog({
      properties: ["openDirectory"],
    });
    const res = result.filePaths;
    if (result.canceled || res.length === 0) {
      return;
    }
    await setSpectateSlpFolder(res[0]);
  };
  return (
    <BasicFooter>
      <Tooltip title="Reveal location">
        <IconButton
          size="small"
          onClick={() => window.electron.shell.openPath(spectateSlpFolder)}
          css={css`
            color: ${colors.bluegrayLight};
          `}
        >
          <FolderIcon />
        </IconButton>
      </Tooltip>
      <LabelledText
        css={css`
          margin-left: 10px;
          margin-right: 15px;
          padding-right: 20px;
          border-right: solid 1px ${colors.bluegray};
        `}
        label="Save spectated games to"
      >
        {spectateSlpFolder}
      </LabelledText>
      <Button
        size="small"
        css={css`
          color: ${colors.bluegrayLight};
          text-transform: initial;
        `}
        onClick={onClick}
      >
        Change Folder
      </Button>
    </BasicFooter>
  );
};
