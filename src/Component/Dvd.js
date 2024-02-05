// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CreateDvd, GetAllDvd, GetDvdById, RemoveDvd, UpdateDvd, OpenPopup } from "../Redux/actions/DvdAction";

// Dvd Component
const Dvd = (props) => {
  // State variables
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [actorName, setActorName] = useState("");
  const [open, setOpen] = useState(false);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Create Dvd");
  const [removeTrigger, setRemoveTrigger] = useState(false);

  // Redux hooks and variables
  const dispatch = useDispatch();
  const editObj = useSelector((state) => state.dvd.companyObj);

  // Column definition for table
  const columns = [
    { id: "dvdId", name: "No. Dvd" },
    { id: "title", name: "Title" },
    { id: "actorName", name: "Actor Name" },
    { id: "action", name: "Action" },
  ];

  // Effect for loading company data
  useEffect(() => {
    props.loadCompany();
  }, [removeTrigger]);

  // Effect for handling edit object changes
  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setId(editObj.dvdId);
      setTitle(editObj.title);
      setActorName(editObj.actorName);
    } else {
      clearState();
    }
  }, [editObj]);

  // Handler functions
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  const openDialog = (isEdit = false) => {
    setOpen(true);
    clearState();
    setIsEdit(isEdit);
    setDialogTitle(isEdit ? "Update Dvd" : "Create Dvd");
    dispatch(OpenPopup());
  };

  const closeDialog = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dvdObj = { dvdId: id, title, actorName };
    if (isEdit) {
      dispatch(UpdateDvd(dvdObj)); // Update existing DVD
    } else {
      dispatch(CreateDvd(dvdObj)); // Add new DVD
    }
    closeDialog();
  };

  const handleEdit = (data) => {
    setIsEdit(true);
    setId(data.dvdId); // Assuming 'data' has the DVD's details
    setTitle(data.title);
    setActorName(data.actorName);
    openDialog(true);
    dispatch(GetDvdById(data));
  };

  const handleRemove = (data) => {
    if (window.confirm("Do you want to remove?")) {
      dispatch(RemoveDvd(data));
      setRemoveTrigger((prev) => !prev);
    }
  };

  const clearState = () => {
    setId(0);
    setTitle("");
    setActorName("");
  };

  // Render
  return (
    <div>
      {props.companyState.isLoading ? (
        <h2>Loading.....</h2>
      ) : props.companyState.errorMessage ? (
        <h2>{props.companyState.errorMessage}</h2>
      ) : (
        <Paper sx={{ margin: "1%" }}>
          <Typography variant="h3">DVD MENU</Typography>
          <div style={{ margin: "1%" }}>
            <Button onClick={() => openDialog()} variant="contained">
              Add New (+)
            </Button>
          </div>

          <TableComponent
            columns={columns}
            companyList={props.companyState.companyList}
            page={page}
            rowPerPage={rowPerPage}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />

          <PaginationComponent
            count={props.companyState.companyList.length}
            rowsPerPage={rowPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />

          <DialogComponent
            open={open}
            onClose={closeDialog}
            title={dialogTitle}
            handleSubmit={handleSubmit}
            titleValue={title || ""}
            actorNameValue={actorName || ""}
            onTitleChange={(e) => setTitle(e.target.value)}
            onActorNameChange={(e) => setActorName(e.target.value)}
          />
        </Paper>
      )}
    </div>
  );
};

// Redux connection
const mapStateToProps = (state) => {
  return {
    companyState: state.dvd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCompany: () => dispatch(GetAllDvd()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dvd);

// Component for table
const TableComponent = ({ columns, companyList, page, rowPerPage, handleEdit, handleRemove }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "midnightblue" }}>
            {columns.map((column) => (
              <TableCell key={column.id} style={{ color: "white" }}>
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {companyList.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.dvdId}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.actorName}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(row)} variant="contained" color="primary">
                  Edit
                </Button>
                <Button onClick={() => handleRemove(row)} variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Component for pagination
const PaginationComponent = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[2, 5, 10, 20]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

// Component for dialog
const DialogComponent = ({
  open,
  onClose,
  title,
  handleSubmit,
  titleValue,
  actorNameValue,
  onTitleChange,
  onActorNameChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <span>{title}</span>
        <IconButton style={{ float: "right" }} onClick={onClose}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5} margin={5}>
            <TextField
              required
              error={titleValue.length === 0}
              value={titleValue}
              onChange={onTitleChange}
              variant="outlined"
              label="Title"
            />
            <TextField
              required
              error={actorNameValue.length === 0}
              value={actorNameValue}
              onChange={onActorNameChange}
              variant="outlined"
              label="Actor Name"
            />
            <Divider></Divider>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
