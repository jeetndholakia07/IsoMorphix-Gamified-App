import { Card, CardContent } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel
} from '@tanstack/react-table';
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type TableProps = {
    data: any;
    columns: any[];
};

const Leaderboard: FC<TableProps> = ({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: false
    });
    const { t } = useTranslation();

    return (
        <>
            <h2 className="text-3xl font-bold text-center pt-6 pb-2">{t("leaderboard")}</h2>
            <div className="w-full flex justify-center py-6">
                <Card className="w-full md:w-3/4 !bg-gray-800 rounded-md lg:w-1/2 xl:w-2/3 bg-gradient-to-r from-purple-800 to-gray-900 text-white shadow-lg">
                    <CardContent className="overflow-x-auto px-4 pb-6 !bg-gray-900 !from-purple-800 !to-gray-900">
                        <TableContainer
                            component={Paper}
                            elevation={0}
                        >
                            <Table
                                size="small"
                                className="min-w-full bg-[#1F2937] align-middle table-auto text-white"
                            >
                                <TableHead className="bg-purple-700">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id} className="text-start">
                                            {headerGroup.headers.map((header) => (
                                                <TableCell
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="px-4 py-3 font-bold text-sm uppercase !text-white text-nowrap tracking-wide border-b border-gray-600"
                                                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                                                >
                                                    {!header.isPlaceholder &&
                                                        flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHead>
                                <TableBody className=" text-white divide-y divide-gray-700">
                                    {table.getRowModel().rows.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                align="center"
                                                className="!border-none py-6 text-sm !text-white"
                                                sx={{ fontFamily: 'Poppins, sans-serif' }}
                                            >
                                                {t("Messages.noDataFound")}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                className="hover:bg-gray-800 transition-colors duration-200"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                                                        className="px-6 py-3 !border-none !text-white whitespace-nowrap align-middle"
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Leaderboard;
