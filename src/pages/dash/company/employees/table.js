import React from "react";
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    Card
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Table from '../../../../components/table'
import {
    Checkbox,
    Paper as MuiPaper,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
  } from "@material-ui/core";


const headCells = [
    {
        id: 'id',
        position: 'left',
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'name',
        position:  'left',
        disablePadding: false,
        label: 'NOME',
    },
    {
        id: 'sector',
        position:  'left',
        disablePadding: false,
        label: 'SETOR',
    }
];

const rowProvider = (history) => (rowData) => {
    return (
        <React.Fragment>
            <TableCell align="left">{rowData.id}</TableCell>
            <TableCell align="left">{rowData.name}</TableCell>
            <TableCell align="left">{rowData.setor}</TableCell>
        </React.Fragment>
    );
};


export default function EnhancedTable() {

    const history = useHistory();

    const array = [
        
            {
                id: 1,
                name: "aaaa",
                setor: "300"
            },
            {
                id: 2,
                name: "asdas",
                setor: "300"
            },
            {
                id: 3,
                name: "vvv",
                setor: "300"
            },
            {
                id: 3,
                name: "vvv",
                setor: "300"
            }
        
    ]



    return (

        <Table
            rows={array}
            rowProvider={rowProvider(history)}
            headCells={headCells}
        />

    );
}
