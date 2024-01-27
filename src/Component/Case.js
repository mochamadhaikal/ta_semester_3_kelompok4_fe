import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles"; // Atau '@material-ui/core/styles' untuk versi sebelumnya
import { connect } from "react-redux";
import { GetCaseOne, GetCaseThree, GetCaseTwo } from "../Redux/actions/CasesAction";
import moment from "moment";

// Membuat custom styles
const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    // Pastikan Anda mengganti URL di bawah ini dengan URL image Anda
    backgroundImage: 'url("https://i.pinimg.com/736x/c6/e6/5f/c6e65f0c5653d2dadc8e4192e2b8fae0.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // Ini yang membuat background menjadi fixed
    width: "100%",
    height: "80vh", // Sesuaikan dengan kebutuhan
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const columns1 = [
  { id: "title", name: "Title" },
  { id: "name", name: "Name" },
];

const columns2 = [
  { id: "name", name: "Name" },
  { id: "loan_amount", name: "Loan Amount" },
];

const columns3 = [{ id: "last_borrowed", name: "Last Borrowed" }];

function Case(props) {
  const classes = useStyles();
  useEffect(() => {
    props.loadCase1();
    props.loadCase2();
    props.loadCase3();
  }, []);
  return (
    <div className={classes.backgroundImage}>
      <Paper sx={{ margin: "1%" }}>
        <Accordion key={1}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${1}a-content`}
            id={`panel${1}a-header`}
          >
            <Typography>{`Question ${1}: Tampilkan data DVD dan nama peminjam untuk bulan Januari!`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "midnightblue" }}>
                    {columns1.map((column) => (
                      <TableCell key={column.id} style={{ color: "white" }}>
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.caseOneState.oneList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion key={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${2}a-content`}
            id={`panel${2}a-header`}
          >
            <Typography>{`Question ${2}: Tampilkan nama-nama peminjam yang sering meminjam DVD dari Risa!`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "midnightblue" }}>
                    {columns2.map((column) => (
                      <TableCell key={column.id} style={{ color: "white" }}>
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.caseTwoState.twoList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{moment(row.loan_amount).format("DD MMMM YYYY")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion key={3}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${3}a-content`}
            id={`panel${3}a-header`}
          >
            <Typography>{`Question ${3}: Tampilkan tanggal peminjaman terakhir untuk DVD dengan judul “Die Another Day”!`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "midnightblue" }}>
                    {columns3.map((column) => (
                      <TableCell key={column.id} style={{ color: "white" }}>
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.caseThreeState.threeList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{moment(row.last_borrowed).format("DD/MM/YYYY")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    caseOneState: state.caseOne,
    caseTwoState: state.caseTwo,
    caseThreeState: state.caseThree,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCase1: () => dispatch(GetCaseOne()),
    loadCase2: () => dispatch(GetCaseTwo()),
    loadCase3: () => dispatch(GetCaseThree()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Case);
