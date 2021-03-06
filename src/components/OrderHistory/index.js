import React from 'react';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router';

const columns = [
    {
        id: 'orderCreateDate',
        lable: 'Order Date'
    },
    {
        id: 'documentID',
        lable: 'Document Id'
    },
    {
        id: 'orderTotal',
        lable: 'Amount'
    }
];

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
};

const formatText = (columnName, columnValue) => {
    switch (columnName) {
        case 'orderTotal':
            return `${columnValue}`;

        case 'orderCreateDate':
            return moment(columnValue.nano).format('DD/MM/YYYY');
    
        default:
            return columnValue;
    }
};

const OrderHistory = ({ orders }) => {
    const history = useHistory();

    return ( 
        <TableContainer>
            <Table>

                <TableHead>
                    <TableRow>
                        {columns.map((column, pos) => {
                            const { lable } = column;

                            return (
                                <TableCell
                                    key={pos}
                                    style={styles}
                                >
                                    {lable}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {(Array.isArray(orders) && orders.lenght > 0) && orders.map((row, pos) => {
                        const { documentID } = row;

                        return(
                            <TableRow 
                                key={pos}
                                onClick={() => history.push(`/order/${documentID}`)}
                            >

                                {columns.map((column, pos) => {
                                    const columnName = column.id;
                                    const columnValue = row[columnName];
                                    const formattedText = formatText(columnName,columnValue);

                                    return (
                                        <TableCell
                                            key={pos}
                                            style={styles}
                                        >
                                            {formattedText}
                                        </TableCell>
                                        )
                                    })}

                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </TableContainer>
     );
}
 
export default OrderHistory;