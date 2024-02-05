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
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles"; // Atau '@material-ui/core/styles' untuk versi sebelumnya
import { connect } from "react-redux";
import { GetCaseOne, GetCaseThree, GetCaseTwo, GetReportOne, GetReportTwo } from "../Redux/actions/CasesAction";
import moment from "moment";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

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

const columns1 = [
  { id: "title", name: "Title" },
  { id: "name", name: "Name" },
];

const columns2 = [
  { id: "name", name: "Name" },
  { id: "loan_amount", name: "Loan Amount" },
];

const columns3 = [{ id: "last_borrowed", name: "Last Borrowed" }];
const columns1r = [
  { id: "total", name: "Total" },
  { id: "jumlah", name: "Jumlah" },
];

const columns2r = [
  { id: "jumlah1", name: "Jumlah Pinjaman Januari" },
  { id: "jumlah2", name: "Jumlah Pinjaman Februari" },
  { id: "jumlah3", name: "Jumlah Pinjaman Maret" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const data = [
  { name: "Januari", value: 30 },
  { name: "Februai", value: 40 },
  { name: "Maret", value: 10 },
  { name: "April", value: 20 },
];

const data2 = [
  { name: "Die Another Day", dipinjam: 4 },
  { name: "Inception", dipinjam: 3 },
  { name: "Avatar", dipinjam: 1 },
];
const data3 = [
  { name: "Andi", meminjam: 3 },
  { name: "Budi", meminjam: 2 },
  { name: "Citra", meminjam: 5 },
];

function Case(props) {
  const dataOne = props.reportOneState.oneReportList;
  const dataTwo = props.reportTwoState.twoReportList;
  const classes = useStyles();
  useEffect(() => {
    props.loadCase1();
    props.loadCase2();
    props.loadCase3();
    props.loadReport1();
    props.loadReport2();
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <h2>Total</h2>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "midnightblue" }}>
                      {columns1r.map((column) => (
                        <TableCell key={column.id} style={{ color: "white" }}>
                          {column.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataOne.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <h2>Jumlah Pinjaman Perbulan</h2>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: "midnightblue" }}>
                      {columns2r.map((column) => (
                        <TableCell key={column.id} style={{ color: "white" }}>
                          {column.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTwo.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.jumlah_pinjaman_januari}</TableCell>
                        <TableCell>{row.jumlah_pinjaman_februari}</TableCell>
                        <TableCell>{row.jumlah_pinjaman_maret}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <h2>DVD Paling Sering Dipinjam</h2>
              <BarChart width={400} height={200} data={data2}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dipinjam" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
              </BarChart>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <h2>Peminjam Paling Sering</h2>
              <BarChart width={400} height={200} data={data3}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="meminjam" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
              </BarChart>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <h2>Laporan Peminjam Per bulan</h2>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value.toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    caseOneState: state.caseOne,
    caseTwoState: state.caseTwo,
    caseThreeState: state.caseThree,
    reportOneState: state.reportOne,
    reportTwoState: state.reportTwo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCase1: () => dispatch(GetCaseOne()),
    loadCase2: () => dispatch(GetCaseTwo()),
    loadCase3: () => dispatch(GetCaseThree()),
    loadReport1: () => dispatch(GetReportOne()),
    loadReport2: () => dispatch(GetReportTwo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Case);
