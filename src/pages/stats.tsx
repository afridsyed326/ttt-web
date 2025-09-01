import DefaultLayout from "@/layouts/default";
import { useStatsActions } from "@/store/stats/statsActions";
import { SelectStatsState, TGamePlayed } from "@/store/stats/statsSlice";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";
import CustomPagination from "@/components/Pagintation/Pagination";
import { formatDate } from "@/utils/playUtils";

const StatsPage = () => {
    const { getStats, getGameHistory } = useStatsActions();
    const { games, gameHistoryPaginated } = useSelector(SelectStatsState);
    const [filters, setFilters] = useState({ page: 1, limit: 10 });

    useEffect(() => {
        getStats();
    }, []);

    useEffect(() => {
        getGameHistory(filters);
    }, [filters]);

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const colors = {
        WIN: "#22C55E",
        LOSE: "#EF4444",
        DRAW: "#F97316",
    };

    const statsArr = [
        {
            value: games.totalGames,
            label: "Total Games",
            color: "#3B82F6",
        },
        {
            value: games.wins,
            label: "Wins",
            color: "#22C55E",
        },
        {
            value: games.losses,
            label: "Losses",
            color: "#EF4444",
        },
        {
            value: games.draws,
            label: "Draws",
            color: "#F97316",
        },
    ];

    const columns = [
        {
            uid: "createdAt",
            label: "Date",
        },
        {
            uid: "userPlayer",
            label: "Side",
        },
        {
            uid: "result",
            label: "Result",
        },
    ];

    const renderCell = React.useCallback(
        (game: TGamePlayed, columnKey: React.Key) => {
            const cellValue = game[columnKey as keyof TGamePlayed];

            switch (columnKey) {
                case "createdAt":
                    return <span>{formatDate(cellValue as string)}</span>;
                case "userPlayer":
                    return (
                        <span className="font-bold">
                            {Number(cellValue) < 0 ? "X" : "O"}
                        </span>
                    );
                case "result":
                    return (
                        <span
                            className="font-bold"
                            style={{
                                color: (colors as any)[cellValue as string],
                            }}
                        >
                            {cellValue === "ONGOING" ? "Unfinished" : cellValue}
                        </span>
                    );
                default:
                    return cellValue;
            }
        },
        []
    );

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
                {statsArr.map((stat, i) => (
                    <div
                        key={i}
                        className={clsx(
                            "border border-primary/50 shadow-xl rounded-2xl"
                        )}
                    >
                        <p className="text-center font-semibold">
                            {stat.label}
                        </p>
                        <p
                            className="text-center text-[50px] font-bold"
                            style={{
                                color: stat.color,
                            }}
                        >
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
            <div className="pt-10">
                <h2 className="text-lg font-semibold text-center mb-5">
                    Game History
                </h2>
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === "actions"
                                        ? "center"
                                        : "start"
                                }
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={gameHistoryPaginated.list}>
                        {(item) => (
                            <TableRow key={item._id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex justify-center py-4">
                    <CustomPagination
                        handlePageChange={handlePageChange}
                        totalPages={gameHistoryPaginated.totalPages}
                    />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default StatsPage;
