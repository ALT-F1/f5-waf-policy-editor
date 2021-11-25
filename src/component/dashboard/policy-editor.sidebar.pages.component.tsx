import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { PolicyEditorMenuPagesModel } from "../policy-editor/model/policy-editor.menu.pages.model";
import { useStyles } from "../../utils/styles.hook";
import { createStyles, withStyles } from "@mui/styles";
import {
  usePolicyEditorDispatch,
  usePolicyEditorState,
} from "../../store/policy-editor/policy-editor.hooks";
import { policyEditorPageSet } from "../../store/policy-editor/policy-editor.actions";

const ListItemMenu = withStyles((theme) =>
  createStyles({
    root: {
      paddingTop: "4px",
      paddingBottom: "4px",
      "&:hover": {
        backgroundColor: "#E1E4F2",
        borderRight: "none",
      },
    },
    selected: {
      borderRight: "4px solid #4152B4",
      backgroundColor: "#E1E4F2",
    },
  })
)(ListItem);

const ListItemMenuText = withStyles((theme) =>
  createStyles({
    root: {
      fontSize: "12px",
      lineHeight: "18px",
      margin: "0px",
      paddingLeft: "17px",
    },
  })
)(ListItemText);

const ListMenu = withStyles((theme) =>
  createStyles({
    root: {
      padding: "0px",
    },
  })
)(List);

export const PolicyEditorSidebarPagesComponent: React.VoidFunctionComponent =
  () => {
    const tabsTree = PolicyEditorMenuPagesModel;
    const styles = useStyles();

    const { currentPage } = usePolicyEditorState();
    const dispatch = usePolicyEditorDispatch();

    const menu = tabsTree.map((t, index) => (
      <React.Fragment key={index}>
        <div
          style={{
            display: "flex",
            margin: "4px",
            alignItems: "center",
            paddingLeft: "17px",
          }}
        >
          {t.icon}
          <span className={styles.menuGroup}>{t.label}</span>
        </div>
        <ListMenu>
          {t.pages.map((p, pageIndex) => (
            <ListItemMenu
              button
              key={pageIndex}
              selected={currentPage === p.id}
              onClick={() => dispatch(policyEditorPageSet(0, p.id))}
            >
              <ListItemMenuText disableTypography>{p.label}</ListItemMenuText>
            </ListItemMenu>
          ))}
        </ListMenu>
      </React.Fragment>
    ));

    return <React.Fragment>{menu}</React.Fragment>;
  };
