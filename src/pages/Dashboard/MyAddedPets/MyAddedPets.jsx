import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Modal, Pagination } from "flowbite-react";
import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useMyAddedPets from "../../../hooks/usemyAddedPets";

const MyAddedPets = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    const { myAddedPets, refetch, isLoading } = useMyAddedPets();

    const handleDeletePet = (pet) => {
        setSelectedPet(pet);
        setIsModalOpen(true);
    };

    const confirmDeletePet = async () => {
        if (selectedPet) {
            await axiosSecure.delete(`/pets/${selectedPet._id}`);
            refetch();
            setIsModalOpen(false);
        }
    };

    const handleChangeAdoptionStatus = async (pet) => {
        await axiosSecure.patch(`/pets/${pet._id}`, { adopt: pet.adopted });
        refetch();
    };

    const columns = [
        { accessorKey: "index", header: "#", cell: (info) => info.row.index + 1 },
        {
            accessorKey: "photoUrl",
            header: "Profile Picture",
            cell: (info) => (
                <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={info.getValue()}
                    alt={info.row.original.name}
                />
            ),
        },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "age", header: "Age" },
        { accessorKey: "category", header: "Category" },
        {
            accessorKey: "adopted",
            header: "Adoption Status",
            cell: ({ row }) => (row.original.adopted ? "Adopted" : "Not Adopted"),
        },
        {
            header: "Actions",
            cell: (info) => (
                <div className="flex flex-col md:flex-row gap-2 items-center">
                    <Button
                        size="xs"
                        onClick={() => handleDeletePet(info.row.original)}
                        className="bg-red-600 text-white"
                    >
                        Delete
                    </Button>
                    <Button
                        size="xs"
                        onClick={() =>
                            (window.location.href = `/dashboard/updatePet/${info.row.original._id}`)
                        }
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                        Update
                    </Button>
                    <Button
                        size="xs"
                        onClick={() => handleChangeAdoptionStatus(info.row.original)}
                        className="bg-green-600 hover:bg-cyan-700 text-white"
                    >
                        Adopted?
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: myAddedPets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton height={40} width={30} count={3} />
            </div>
        );
    }

    return (
        <div className="p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">My Added Pets</h2>

            {myAddedPets.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-700 dark:border-gray-600 shadow-lg rounded-lg border border-gray-200">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-600">
                        <thead className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="text-left">
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="p-4 text-sm font-medium text-left tracking-wide cursor-pointer"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() && (
                                                <span>
                                                    {header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"}
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="p-4 text-sm text-gray-700 dark:text-gray-300 align-middle"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        You have not listed any pets for adoption yet.
                    </p>
                    <Button
                        onClick={() => (window.location.href = "/dashboard/addPet")}
                        className="bg-green-600 text-white mt-4"
                    >
                        Add Pet for Adoption
                    </Button>
                </div>
            )}

            {/* Pagination Controls */}
            {myAddedPets.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <Pagination
                        currentPage={table.getState().pagination.pageIndex + 1}
                        totalPages={table.getPageCount()}
                        onPageChange={(page) => table.setPageIndex(page - 1)}
                    />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>Confirm Deletion</Modal.Header>
                <Modal.Body>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete this pet?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={confirmDeletePet} color="failure">
                        Yes
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyAddedPets;
