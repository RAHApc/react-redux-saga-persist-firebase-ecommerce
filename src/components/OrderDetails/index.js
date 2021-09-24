import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    TableBody, TableContainer, TableCell,
    TableHead, Table, TableRow
} from '@material-ui/core';
import { setOrderDetails } from './../../redux/Order/orders.actions';



const columns = [
    {
        id: 'productThumbnail',
        lable: ''
    },
    {
        id: 'productName',
        lable: 'Name'
    },
    {
        id: 'productPrice',
        lable: 'Price'
    },
    {
        id: 'quantity',
        lable: 'Quantity'
    }
];

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
};

const formatText = (columnName, columnValue) => {
    switch (columnName) {
        case 'productPrice':
            return `${columnValue}`;

        case 'productThumbnail':
            return <img src={columnValue} width={250} />;

        default:
            return columnValue;
    }
};

const OrderDetails = ({ order }) => {
    const dispatch = useDispatch();
    const orderItems = order && order.orderItems;

    useEffect(() => {
        return() => {
            dispatch(
                setOrderDetails({})
            );
        }
    }, []);

    return ( 
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col, pos) => {
                            return (
                                <TableCell
                                    key={pos}
                                    style={styles}
                                >
                                    {col.lable}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                {(Array.isArray(orderItems) && orderItems.lenght > 0) && orderItems.map((row, pos) => {
                    return(
                        <TableRow key={pos}>
                            {columns.map((col, pos) => {
                                const columnName = col.id;
                                const columnValue = row[columnName];
                                const formattedText = formatText(columnName, columnValue);

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
 
export default OrderDetails;