import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import Table from "../components/Table";
import Layout from "../layouts/Layout";
import ReusableDialog from "../components/ReusableDialog";
import AddDeviceForm from "../components/AddIoTDeviceForm";
import EditDeviceForm from "../components/EditIoTDeviceForm";
import ConfirmationForm from "../components/ConfirmationForm";
import useIoTDeviceStore from "../stores/useIoTDeviceStore";
import useRoomStore from "../stores/useRoomStore";

export default function IoTDevice() {
  const [dialogType, setDialogType] = useState(null);
  const { devices, fetchDevices, deleteDevice } = useIoTDeviceStore();
  const { rooms, fetchRooms } = useRoomStore();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchDevices();
    fetchRooms();
  }, [fetchDevices, fetchRooms]);

  function handleOpenDialog(type) {
    setDialogType(type);
  }

  function handleCloseDialog() {
    setDialogType(null);
    setSelectedItem(null);
  }

  const headerColumns = [
    {
      key: "nickname",
      label: "Nickname",
      render: (item) => (
        <p className="font-semibold text-sm text-gray-800 dark:text-white">
          {item.nickname}
        </p>
      ),
    },
    {
      key: "deviceSerial",
      label: "Device Serial",
      render: (item) => (
        <p className="text-sm text-gray-700 dark:text-white">
          {item.deviceSerial}
        </p>
      ),
    },
    {
      key: "room",
      label: "Room",
      render: (item) => (
        <p className="text-sm text-gray-700 dark:text-white">
          {item.room?.roomNumber || "N/A"}
        </p>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  const filterBy = [
    {
      key: "status",
      label: "Status",
      options: ["all", "active", "inactive"],
      getValue: (item) => item.status,
    },
  ];

  const handleOpenDialogOption = (type, item) => {
    setDialogType(type);
    setSelectedItem(item);
  };

  const handleDeleteDevice = () => {
    if (selectedItem) {
      deleteDevice(selectedItem.id)
        .then(fetchDevices)
        .catch((error) => console.error("Error deleting device:", error))
        .finally(handleCloseDialog);
    }
  };

  return (
    <Layout>
      <Table
        headerTitle="IoT Devices Management"
        headerDescription="Manage all IoT devices in the hotel rooms."
        primaryButtonText="Add Device"
        primaryOnClick={() => handleOpenDialog("add")}
        headerColumns={headerColumns}
        data={devices}
        filterBy={filterBy}
        filterLabel="Status"
        tableActions={[
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
            item.nickname?.toLowerCase().includes(lowerSearch) ||
            item.deviceSerial?.toLowerCase().includes(lowerSearch) ||
            item.room?.roomNumber?.toLowerCase().includes(lowerSearch)
          );
        }}
      />

      {dialogType === "add" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Add New Device">
          <AddDeviceForm onClose={handleCloseDialog} rooms={rooms} />
        </ReusableDialog>
      )}

      {dialogType === "edit" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Edit Device">
          <EditDeviceForm onClose={handleCloseDialog} device={selectedItem} rooms={rooms} />
        </ReusableDialog>
      )}

      {dialogType === "delete" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Delete Device">
          <ConfirmationForm
            title="Delete Device"
            description={`Are you sure you want to delete the device "${selectedItem?.nickname}"?`}
            onClose={handleCloseDialog}
            onClick={handleDeleteDevice}
            confirmText="Delete"
            cancelText="Cancel"
          />
        </ReusableDialog>
      )}
    </Layout>
  );
}
