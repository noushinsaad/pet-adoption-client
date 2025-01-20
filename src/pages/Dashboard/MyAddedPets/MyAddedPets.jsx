import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Modal, Pagination } from "flowbite-react";
import { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
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
        { accessorKey: 'index', header: '#', cell: info => info.row.index + 1 },
        { accessorKey: 'photoUrl', header: 'Profile Picture', cell: info => <img className="h-12 w-12 rounded-full object-cover" src={info.getValue()} alt={info.row.original.name} /> },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'age', header: 'Age' },
        { accessorKey: 'category', header: 'Category' },
        { accessorKey: 'addedBy', header: 'Added By' },
        {
            accessorKey: 'adopted',
            header: 'Adoption Status',
            cell: ({ row }) => row.original.adopted ? "Adopted" : "Not Adopted"
        },
        {
            header: 'Actions',
            cell: info => (
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
                        onClick={() => window.location.href = `/update-pet/${info.row.original._id}`}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                        Update
                    </Button>
                    <Button
                        size="xs"
                        onClick={() => handleChangeAdoptionStatus(info.row.original)}
                        className="bg-green-600 hover:bg-cyan-700 text-white"
                    // disabled={info.row.original.adopted}
                    >
                        Adopted?
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: myAddedPets,
        // data: allPets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    if (isLoading) {
        return (<div className="p-6">
            <Skeleton height={40} width={300} count={3} />
        </div>)
    }

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">My Added Pets</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer p-4">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() && (header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50 transition duration-200">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-4 text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4">
                <Pagination
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                    onPageChange={page => table.setPageIndex(page - 1)}
                />
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>
                    Confirm Deletion
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this pet?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={confirmDeletePet} color="failure">Yes</Button>
                    <Button onClick={() => setIsModalOpen(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyAddedPets;
