import { withStyles, TableCell, TableRow } from "@material-ui/core";

export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#E9E9E9",
    border: `0.1px solid #E0E0E0`,
    fontSize: "12px",
    fontWeight: "bold",
    padding: "8px",
    minWidth: "50px",
  },
  body: {
    border: `0.1px solid #E0E0E0`,
    fontSize: "12px",
    padding: "8px",
    "&:hover": {
      backgroundColor: "#AEAEAE",
    },
  },
  footer: {
    backgroundColor: "#E9E9E9",
    color: "black",
    border: `0.1px solid #E0E0E0`,
    fontSize: "12px",
    fontWeight: "bold",
    padding: "8px",
  },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#E9E9E9",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFF",
    },
  },
}))(TableRow);
