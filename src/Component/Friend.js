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

import {
  CreateFriend,
  GetAllFriend,
  GetFriendById,
  RemoveFriend,
  UpdateFriend,
  OpenPopup,
} from "../Redux/actions/FriendAction";

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

// Friend Component
const Friend = (props) => {
  // State variables
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [open, setOpen] = useState(false);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Create Friend");
  const [removeTrigger, setRemoveTrigger] = useState(false);
  const [error, setError] = useState(false);

  // Redux hooks and variables
  const dispatch = useDispatch();
  const editObj = useSelector((state) => state.friend.companyObj);

  // Column definition for table
  const columns = [
    { id: "friendId", name: "Id" },
    { id: "name", name: "Name" },
    { id: "address", name: "Address" },
    { id: "email", name: "Email" },
    { id: "phoneNumber", name: "Phone Number" },
    { id: "action", name: "Action" },
  ];

  // Effect for loading friend data
  useEffect(() => {
    props.loadCompany();
  }, [removeTrigger]);

  // Effect for handling edit object changes
  useEffect(() => {
    if (Object.keys(editObj).length > 0) {
      setId(editObj.friendId);
      setName(editObj.name);
      setAddress(editObj.address);
      setEmail(editObj.email);
      setPhoneNumber(editObj.phoneNumber);
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
    setDialogTitle(isEdit ? "Update Friend" : "Create Friend");
    dispatch(OpenPopup());
  };

  const closeDialog = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const friendObj = { friendId: id, name, address, email, phoneNumber };
    if (isEdit) {
      dispatch(UpdateFriend(friendObj)); // Update existing FRIEND
    } else {
      dispatch(CreateFriend(friendObj)); // Add new FRIEND
    }
    closeDialog();
  };

  const handleEdit = (data) => {
    setIsEdit(true);
    setId(data.friendId); // Assuming 'data' has the FRIEND's details
    setName(data.name);
    setAddress(data.address);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    openDialog(true);
    dispatch(GetFriendById(data));
  };

  const handleRemove = (data) => {
    if (window.confirm("Do you want to remove?")) {
      dispatch(RemoveFriend(data));
      setRemoveTrigger((prev) => !prev);
    }
  };

  const clearState = () => {
    setId(0);
    setName("");
    setAddress("");
    setEmail("");
    setPhoneNumber("");
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
          <Typography variant="h3">FRIEND MENU</Typography>
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
            nameValue={name || ""}
            addressValue={address || ""}
            emailValue={email || ""}
            phoneNumberValue={phoneNumber || ""}
            onNameChange={(e) => setName(e.target.value)}
            onAddressChange={(e) => setAddress(e.target.value)}
            onEmailChange={(e) => {
              setEmail(e.target.value);
              setError(!validateEmail(e.target.value));
            }}
            onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
            error={error}
          />
        </Paper>
      )}
    </div>
  );
};

// Redux connection
const mapStateToProps = (state) => {
  return {
    companyState: state.friend,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCompany: () => dispatch(GetAllFriend()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);

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
              <TableCell>{row.friendId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
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
  nameValue,
  addressValue,
  emailValue,
  phoneNumberValue,
  onNameChange,
  onAddressChange,
  onEmailChange,
  onPhoneNumberChange,
  error,
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
              error={nameValue.length === 0}
              value={nameValue}
              onChange={onNameChange}
              variant="outlined"
              label="Name"
            />
            <TextField
              required
              error={addressValue.length === 0}
              value={addressValue}
              onChange={onAddressChange}
              variant="outlined"
              label="Address"
            />
            <TextField
              required
              error={emailValue.length === 0}
              value={emailValue}
              onChange={onEmailChange}
              variant="outlined"
              label="Email"
              helperText={error ? "Invalid email format" : ""}
            />
            <TextField
              required
              error={phoneNumberValue.length === 0}
              value={phoneNumberValue}
              onChange={onPhoneNumberChange}
              variant="outlined"
              label="Phone Number"
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
