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
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { CreateLoan, GetAllLoan, GetLoanById, RemoveLoan, UpdateLoan, OpenPopup } from "../Redux/actions/LoanAction";
import { GetAllDvd } from "../Redux/actions/DvdAction";
import { GetAllFriend } from "../Redux/actions/FriendAction";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// Loan Component
const Loan = (props) => {
  // State variables
  const [id, setId] = useState(0);
  const [friendName, setFriendName] = useState("");
  const [dvdName, setDvdName] = useState("");
  const [loanDate, setLoanDate] = useState(Date.now());
  const [returnDate, setReturnDate] = useState(Date.now());

  const [open, setOpen] = useState(false);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Create Loan");
  const [removeTrigger, setRemoveTrigger] = useState(false);

  // Redux hooks and variables
  const dispatch = useDispatch();
  const editObj = useSelector((state) => state.loan.companyObj);
  // Column definition for table
  const columns = [
    { id: "loanId", name: "Id" },
    { id: "friendName", name: "Friend Name" },
    { id: "dvdName", name: "Dvd Title" },
    { id: "loanDate", name: "Loan Date" },
    { id: "returnDate", name: "Return Date" },
    { id: "action", name: "Action" },
  ];

  // Effect for loading loan data
  useEffect(() => {
    props.loadLoan();
    props.loadDvd();
    props.loadFriend();
    setRemoveTrigger(false);
  }, [removeTrigger]);

  // Effect for handling edit object changes
  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setId(editObj.loanId);
      setFriendName(editObj.friendId);
      setDvdName(editObj.dvdId);
      setLoanDate(editObj.loanDate);
      setReturnDate(editObj.returnDate);
    } else {
      clearState();
    }
  }, [editObj]);

  const dvds = props.dvdState.companyList;
  const friends = props.friendState.companyList;
  // Handler functions
  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  const openDialog = (isEdit = false) => {
    setOpen(true);
    setIsEdit(isEdit);
    setDialogTitle(isEdit ? "Update Loan" : "Create Loan");
    dispatch(OpenPopup());
  };

  const closeDialog = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loanObj = { loanId: id, friendId: friendName, dvdId: dvdName, loanDate, returnDate };
    if (isEdit) {
      setRemoveTrigger(true);
      dispatch(UpdateLoan(loanObj)); // Update existing FRIEND
    } else {
      setRemoveTrigger(true);
      dispatch(CreateLoan(loanObj)); // Add new FRIEND
    }
    closeDialog();
  };

  const handleEdit = (data) => {
    setIsEdit(true);
    setId(data.loanId); // Assuming 'data' has the FRIEND's details
    setFriendName(data.friendId);
    setDvdName(data.dvdId);
    setLoanDate(data.loanDate);
    setReturnDate(data.returnDate);
    openDialog(true);
    dispatch(GetLoanById(data));
  };

  const handleRemove = (data) => {
    if (window.confirm("Do you want to remove?")) {
      dispatch(RemoveLoan(data));
      setRemoveTrigger(true);
    }
  };

  const clearState = () => {
    setId(0);
    setFriendName("");
    setDvdName("");
    setLoanDate(new Date());
    setReturnDate(new Date());
  };

  // Render
  return (
    <div>
      {props.loanState.isLoading ? (
        <h2>Loading.....</h2>
      ) : props.loanState.errorMessage ? (
        <h2>{props.loanState.errorMessage}</h2>
      ) : (
        <Paper sx={{ margin: "1%" }}>
          <Typography variant="h3">LOAN MENU</Typography>
          <div style={{ margin: "1%" }}>
            <Button onClick={() => openDialog()} variant="contained">
              Add New (+)
            </Button>
          </div>

          <TableComponent
            columns={columns}
            companyList={props.loanState.companyList}
            page={page}
            rowPerPage={rowPerPage}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />

          <PaginationComponent
            count={props.loanState.companyList.length}
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
            friendNameValue={friendName || ""}
            dvdNameValue={dvdName || ""}
            loanDateValue={loanDate || moment()}
            returnDateValue={returnDate || moment()}
            onFriendNameChange={(e) => setFriendName(e.target.value)}
            onDvdNameChange={(e) => setDvdName(e.target.value)}
            onLoanDateChange={(newValue) => setLoanDate(newValue || moment())}
            onReturnDateChange={(newValue) => setReturnDate(newValue || moment())}
            friends={friends}
            dvds={dvds}
          />
        </Paper>
      )}
    </div>
  );
};

// Redux connection
const mapStateToProps = (state) => {
  return {
    loanState: state.loan,
    friendState: state.friend,
    dvdState: state.dvd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLoan: () => dispatch(GetAllLoan()),
    loadDvd: () => dispatch(GetAllDvd()),
    loadFriend: () => dispatch(GetAllFriend()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loan);

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
              <TableCell>{row.loanId}</TableCell>
              <TableCell>{row.friendName}</TableCell>
              <TableCell>{row.dvdName}</TableCell>
              <TableCell>{moment(row.loanDate).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{moment(row.returnDate).format("DD/MM/YYYY")}</TableCell>
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
  friendNameValue,
  dvdNameValue,
  loanDateValue,
  returnDateValue,
  onFriendNameChange,
  onDvdNameChange,
  onLoanDateChange,
  onReturnDateChange,
  friends,
  dvds,
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
            <FormControl fullWidth required>
              <InputLabel>Friend Name</InputLabel>
              <Select value={friendNameValue} label="Friend Name" onChange={onFriendNameChange}>
                {friends.map((friend) => (
                  <MenuItem value={friend.friendId}>{friend.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Dvd Name</InputLabel>
              <Select value={dvdNameValue} label="Dvd Name" onChange={onDvdNameChange}>
                {dvds.map((dvd) => (
                  <MenuItem value={dvd.dvdId}>{dvd.title + " - " + dvd.actorName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Loan Date"
                value={loanDateValue ? moment(loanDateValue) : moment()}
                onChange={onLoanDateChange}
                minDate={moment()}
                renderInput={(params) => (
                  <TextField {...params} required helperText={params.error ? "This field is required" : null} />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Return Date"
                value={returnDateValue ? moment(returnDateValue) : moment()}
                onChange={onReturnDateChange}
                minDate={moment()}
                renderInput={(params) => (
                  <TextField {...params} required helperText={params.error ? "This field is required" : null} />
                )}
              />
            </LocalizationProvider>
            <Divider />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
