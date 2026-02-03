import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/lightswind/table";
import { Button } from '../../../components/lightswind/button';
import { useNavigate } from 'react-router-dom';

const Coupon: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between mx-2 my-4'>
                <h2 className='text-2xl font-semibold'>Coupon Management</h2>
                <Button
                    onClick={() => navigate("/admin/add-coupon")}
                    className='cursor-pointer'>
                    Add New Coupon
                </Button>
            </div>
            <Table className='m-4'>
                <TableCaption>A list of your recent coupon.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Minimum Cart Value</TableHead>
                        <TableHead>Discount Percentage</TableHead>
                        <TableHead>isActive</TableHead>
                        <TableHead>Expiry Time</TableHead>
                        <TableHead>Limit Number</TableHead>
                        <TableHead>Used From</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>INV001</TableCell>
                        <TableCell>43500</TableCell>
                        <TableCell>15%</TableCell>
                        <TableCell>True</TableCell>
                        <TableCell>22 Feb</TableCell>
                        <TableCell>90</TableCell>
                        <TableCell>78</TableCell>
                        <TableCell className="text-right">250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>NISHU34</TableCell>
                        <TableCell>1699</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell>False</TableCell>
                        <TableCell>28 Feb</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>34</TableCell>
                        <TableCell className="text-right">576</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default Coupon
