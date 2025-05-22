import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import Table from "../components/Table";
import Layout from "../layouts/Layout";
import ReusableDialog from "../components/ReusableDialog";
import AddRoomForm from "../components/AddRoomForm";
import useRoomTypeStore from "../stores/useRoomTypeStore";
import useRoomStore from "../stores/useRoomStore";
import ConfirmationForm from "../components/ConfirmationForm";
import EditRoomForm from "../components/EditRoomForm";

export default function Room() {
  const [dialogType, setDialogType] = useState(null);
  const {roomTypes, fetchRoomTypes} = useRoomTypeStore()
  const {rooms, fetchRooms, deleteRoom} = useRoomStore()
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchRoomTypes();
    fetchRooms();
  }, [fetchRoomTypes, fetchRooms]);

  function handleOpenDialog(type) {
    setDialogType(type);
  }

  function handleCloseDialog() {
    setDialogType(null);
  }

  const headerColumns = [
    {
      key: "roomNumber",
      label: "Room Number",
      render: (item) => {
        return (
          <p className="font-semibold text-sm text-gray-800 dark:text-white">
            {item.roomNumber}
          </p>
        );
      },
    },
    {
      key: "roomType",
      label: "Room Type",
      render: (item) => {
        const roomType = item.roomType?.name || "N/A";

        return (
          <div>
            <p className="font-normal text-sm text-gray-800 dark:text-white">
              {roomType}
            </p>
          </div>
        );
      },
    },
    {
      key: "floor",
      label: "Floor",
      render: (item) => {
        return (
          <p className="font-normal text-sm text-gray-800 dark:text-white">
            {item.floor}
          </p>
        );
      },
    },

    {
      key: "maxOccupancy",
      label: "Max Occupancy",
      render: (item) => {
        return (
          <p className="font-normal text-sm text-gray-800 dark:text-white">
            {item.roomType?.maxOccupancy}
          </p>
        );
      },
    },
    {
      key: "basePrice",
      label: "Base Price",
      render: (item) => {
        const formattedPrice = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(item.roomType?.basePrice);

        return (
          <span className="text-sm text-gray-800 font-normal dark:text-white">
            {formattedPrice}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];


const filterBy = [
  {
    key: "status",
    label: "Status",
    options: ["all", "available", "occupied"],
    getValue: (item) => item.status,
  },
  
];

const handleOpenDialogOption = (type, item) => {
  setDialogType(type);
  setSelectedItem(item);
}

const handleDeleteRoom = () => {
  if (selectedItem) {
    // Call the delete function from the room store
    deleteRoom(selectedItem.id)
      .then(() => {
        // Optionally, you can show a success message or refresh the room list
        fetchRooms();
      })
      .catch((error) => {
        console.error("Error deleting room:", error);
      })
      .finally(() => {
        handleCloseDialog();
      });
  }
}

  return (
    <Layout>
      <Table
        headerTitle={"Room management"}
        headerDescription={"Add, edit and remove rooms."}
        primaryButtonText={"Add Room"}
        primaryOnClick={() => handleOpenDialog("add")}
        headerColumns={headerColumns}
        data={rooms}
        filterBy={filterBy}
        filterLabel="Room Type"
        tableActions=
          {[
            {
              label: "Edit",
              onClick: (item) => handleOpenDialogOption("edit", item),
            },
            {
              label: "Delete",
              onClick: (item) => handleOpenDialogOption("delete", item),
            },
           
          ]}
        customSearchFn={(item, lowerSearch) => {
    return (
      item.roomNumber.toString().toLowerCase().includes(lowerSearch) ||
      item.roomType?.name?.toLowerCase().includes(lowerSearch) ||
      item.floor?.toString().toLowerCase().includes(lowerSearch) ||
      item.roomType?.maxOccupancy?.toString().includes(lowerSearch) ||
      item.roomType?.basePrice?.toString().includes(lowerSearch) ||
      item.status?.toLowerCase().includes(lowerSearch)
    );
  }}
      />

      {dialogType === "add" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Add New Room">
          <AddRoomForm onClose={handleCloseDialog} roomTypes={roomTypes}/>
        </ReusableDialog>
      )}

      {dialogType === "edit" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Edit Room">
          <EditRoomForm onClose={handleCloseDialog} roomTypes={roomTypes} room={selectedItem}/>
        </ReusableDialog>
      )}

      {dialogType === "delete" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Delete Room">
          <ConfirmationForm
            title={"Delete Room"}
            description={`Are you sure you want to delete the room "${selectedItem?.roomNumber}"?`}
            onClose={handleCloseDialog}
            onClick={handleDeleteRoom}
            confirmText={"Delete"}
            cancelText={"Cancel"}
          />
        </ReusableDialog>
      )}
    </Layout>
  );
}
