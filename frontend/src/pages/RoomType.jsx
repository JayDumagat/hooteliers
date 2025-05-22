import { useEffect, useState } from "react";
import Table from "../components/Table";
import Layout from "../layouts/Layout";
import ReusableDialog from "../components/ReusableDialog";
import AddRoomTypeForm from "../components/AddRoomTypeForm";
import useRoomTypeStore from "../stores/useRoomTypeStore";
import EditRoomTypeForm from "../components/EditRoomTypeForm";
import ConfirmationForm from "../components/ConfirmationForm";

export default function RoomType() {
  const [dialogType, setDialogType] = useState(null);
  const { roomTypes, fetchRoomTypes } = useRoomTypeStore();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  function handleOpenDialog(type) {
    setDialogType(type);
  }

  function handleCloseDialog() {
    setDialogType(null);
  }

  const headerColumns = [
    {
      key: "name",
      label: "Room Type",
      render: (item) => (
        <p className="font-semibold text-sm text-gray-800 dark:text-white">
          {item.name}
        </p>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (item) => (
        <p className="font-normal text-sm text-gray-800 dark:text-white">
          {item.description || "—"}
        </p>
      ),
    },
    {
      key: "maxOccupancy",
      label: "Max Occupancy",
      render: (item) => (
        <p className="font-normal text-sm text-gray-800 dark:text-white">
          {item.maxOccupancy}
        </p>
      ),
    },
    {
      key: "basePrice",
      label: "Base Price",
      render: (item) => {
        const formattedPrice = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(item.basePrice);

        return (
          <span className="text-sm text-gray-800 font-normal dark:text-white">
            {formattedPrice}
          </span>
        );
      },
    },
  ];

  const roomTypeOptions = Array.from(
    new Set(roomTypes.map((type) => type.name))
  );

  const filterBy = [
    {
      key: "name",
      label: "Room Type",
      options: ["all", ...roomTypeOptions],
      getValue: (item) => item.name,
    },
  ];

  const tableActions = [
    {
      label: "Edit",
      onClick: (item) => handleOpenDialogOption("edit", item),
    },
    {
      label: "Delete",
      onClick: (item) => handleOpenDialogOption("delete", item),
    },
  ];

  const handleOpenDialogOption = (type, item) => {
    setDialogType(type);
    setSelectedItem(item);
  };

  const handleDeleteRoomType = () => {
    if (selectedItem) {
      // Call the delete function from the store
      useRoomTypeStore.getState().deleteRoomType(selectedItem.id);
      setDialogType(null);
    }
  };

  return (
    <Layout>
      <Table
        headerTitle="Room Type Management"
        headerDescription="Add, edit and remove room types."
        primaryButtonText="Add Room Type"
        primaryOnClick={() => handleOpenDialog("add")}
        headerColumns={headerColumns}
        data={roomTypes}
        filterBy={filterBy}
        tableActions={tableActions}
        customSearchFn={(item, lowerSearch) => {
          return (
            item.name?.toLowerCase().includes(lowerSearch) ||
            item.description?.toLowerCase().includes(lowerSearch) ||
            item.maxOccupancy?.toString().includes(lowerSearch) ||
            item.basePrice?.toString().includes(lowerSearch)
          );
        }}
      />

      {dialogType === "add" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Add New Room Type"
        >
          <AddRoomTypeForm onClose={handleCloseDialog} roomType={roomTypes} />
        </ReusableDialog>
      )}

      {dialogType === "edit" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Edit Room Type"
        >
          <EditRoomTypeForm
            onClose={handleCloseDialog}
            roomType={selectedItem}
          />
        </ReusableDialog>
      )}

      {dialogType === "delete" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="">
          <ConfirmationForm
            title={"Delete Room Type"}
            description={`Are you sure you want to delete the room type "${selectedItem?.name}" ?`}
            onClose={handleCloseDialog}
            onClick={handleDeleteRoomType}
            confirmText={"Delete"}
            cancelText={"Cancel"}
          />
        </ReusableDialog>
      )}
    </Layout>
  );
}
