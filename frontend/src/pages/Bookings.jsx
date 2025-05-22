import { useEffect, useState } from "react";
import Table from "../components/Table";
import Layout from "../layouts/Layout";
import StatusBadge from "../components/StatusBadge";
import ReusableDialog from "../components/ReusableDialog";
import useRoomStore from "../stores/useRoomStore";
import useBookingStore from "../stores/useBookingStore";
import AddBookingForm from "../components/AddBookingForm";
import EditBookingForm from "../components/EditBookingForm";
import ConfirmationForm from "../components/ConfirmationForm";
import CheckOutForm from "../components/CheckoutForm";

export default function Booking() {
  const [dialogType, setDialogType] = useState(null);
  const { rooms, fetchRooms } = useRoomStore();
  const { bookings, fetchBookings, deleteBooking, updateBookingStatus } =
    useBookingStore();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, [fetchRooms, fetchBookings]);

  const formatDateTime = (dateString) => {
    if (!dateString) return null; // null or empty string check

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null; // invalid date check

    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const headerColumns = [
    {
      key: "customerName",
      label: "Customer",
      render: (item) => (
        <p className="text-sm text-gray-800 dark:text-white font-medium">
          {item.customer
            ? `${item.customer.firstName || ""} ${
                item.customer.lastName || ""
              }`.trim() || "Guest"
            : "Guest"}
        </p>
      ),
    },
    {
      key: "room",
      label: "Room",
      render: (item) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {item.room?.roomNumber || "N/A"}
        </p>
      ),
    },
    {
      key: "roomType",
      label: "Room Type",
      render: (item) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {item.room?.roomType?.name || "N/A"}
        </p>
      ),
    },
    {
      key: "checkInDate",
      label: "Check-In",
      render: (item) => {
        const formatted = formatDateTime(item.checkInDate);
        return (
          <div className="flex flex-col font-normal text-sm text-gray-800 dark:text-white">
            <span>{formatted?.date ?? "--/--/----"}</span>
            <span className="text-xs">{formatted?.time ?? "--:--"}</span>
          </div>
        );
      },
    },
    {
      key: "checkOutDate",
      label: "Check-Out",
      render: (item) => {
        const formatted = formatDateTime(item.checkOutDate);
        return (
          <div className="flex flex-col font-normal text-sm text-gray-800 dark:text-white">
            <span>{formatted?.date ?? "--/--/----"}</span>
            <span className="text-xs">{formatted?.time ?? "--:--"}</span>
          </div>
        );
      },
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
      options: ["all", "confirmed", "checked_in", "checked_out", "cancelled"],
      getValue: (item) => item.status,
    },
  ];

  function handleOpenDialog(type) {
    setDialogType(type);
  }

  function handleOpenDialogOption(type, item) {
    setDialogType(type);
    if (type === "check_out") {
      const fullBooking = bookings.find((b) => b.id === item.id);
      setSelectedItem(fullBooking || item);
    } else {
      setSelectedItem(item);
    }
  }

  function handleCloseDialog() {
    setDialogType(null);
  }

  const filterAvailableRooms = (rooms) => {
    return rooms.filter((room) => room.status === "available");
  };

  const handleDeleteBooking = () => {
    if (selectedItem) {
      // Call the delete function from the booking store
      deleteBooking(selectedItem.id)
        .then(() => {
          // Optionally, you can show a success message or refresh the booking list
          fetchBookings();
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        })
        .finally(() => {
          handleCloseDialog();
        });
    }
  };

  function handleOpenCheckInConfirm(item) {
    setSelectedItem(item);
    setDialogType("check_in_confirm");
  }

  const handleConfirmCheckIn = () => {
    if (!selectedItem) return;

    updateBookingStatus(selectedItem.id, {
      datetime: new Date().toISOString(),
      status: "checked_in",
    })
      .then(() => {
        fetchBookings();
      })
      .catch((error) => {
        console.error("Error checking in booking:", error);
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  const handleOpenCheckOutConfirm = (checkoutDetails) => {
    setSelectedItem(checkoutDetails); // enriched booking object
    setDialogType("confirm_check_out");
  };

  const handleConfirmCheckOut = () => {
    if (!selectedItem) return;

    updateBookingStatus(selectedItem.id, {
      datetime: selectedItem.checkOutDate,
      status: "checked_out",
      price: selectedItem.price,
      paymentMethod: "cash",
    })
      .then(() => {
        fetchBookings();
      })
      .catch((error) => {
        console.error("Error checking out booking:", error);
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  return (
    <Layout>
      <Table
        headerTitle="Booking Management"
        headerDescription="Add, edit and manage bookings."
        primaryButtonText="Add Booking"
        primaryOnClick={() => handleOpenDialog("add")}
        headerColumns={headerColumns}
        data={bookings}
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
          {
            label: "Check In",
            onClick: (item) => handleOpenCheckInConfirm(item),
            disabled: (item) => item.status !== "confirmed",
          },
          {
            label: "Check Out",
            onClick: (item) => handleOpenDialogOption("check_out", item),
            disabled: (item) => item.status !== "checked_in",
          },
        ]}
        customSearchFn={(item, lowerSearch) => {
          return (
            (item.customer &&
              `${item.customer.firstName} ${item.customer.lastName}`
                .toLowerCase()
                .includes(lowerSearch)) ||
            (item.room &&
              item.room.roomNumber
                .toString()
                .toLowerCase()
                .includes(lowerSearch)) ||
            item.room?.roomType?.name.toLowerCase().includes(lowerSearch) ||
            item.status.toLowerCase().includes(lowerSearch)
          );
        }}
      />

      {dialogType === "add" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Add New Booking"
        >
          <AddBookingForm
            onClose={handleCloseDialog}
            rooms={filterAvailableRooms(rooms)}
          />
        </ReusableDialog>
      )}

      {dialogType === "edit" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Edit Booking"
        >
          <EditBookingForm
            onClose={handleCloseDialog}
            rooms={filterAvailableRooms(rooms)}
            booking={selectedItem}
          />
        </ReusableDialog>
      )}

      {dialogType === "delete" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Delete Booking"
        >
          <ConfirmationForm
            title={"Delete Room"}
            description={`Are you sure you want to delete the booking for "${selectedItem?.customer?.firstName} ${selectedItem?.customer?.lastName}"?`}
            onClose={handleCloseDialog}
            onClick={handleDeleteBooking}
          />
        </ReusableDialog>
      )}

      {dialogType === "check_in_confirm" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Confirm Check-In"
        >
          <ConfirmationForm
            title="Confirm Check-In"
            description={`Are you sure you want to check in "${selectedItem?.customer?.firstName} ${selectedItem?.customer?.lastName}"?`}
            onClose={handleCloseDialog}
            onClick={handleConfirmCheckIn}
            confirmText="Yes, Check In"
            cancelText="Cancel"
          />
        </ReusableDialog>
      )}

      {dialogType === "confirm_check_out" && (
        <ReusableDialog
          isOpen={true}
          onClose={handleCloseDialog}
          title="Confirm Check-Out"
        >
          <ConfirmationForm
            title="Confirm Check-Out"
            description={`Customer: ${selectedItem?.customer?.firstName} ${
              selectedItem?.customer?.lastName
            }
Total: ₱${selectedItem?.price?.toFixed(2)} | Tendered: ₱${parseFloat(
              selectedItem?.tenderedAmount
            ).toFixed(2)} | Change: ₱${parseFloat(selectedItem?.change).toFixed(
              2
            )}
Proceed with checkout?`}
            onClose={handleCloseDialog}
            onClick={handleConfirmCheckOut}
            confirmText="Yes, Check Out"
            cancelText="Cancel"
          />
        </ReusableDialog>
      )}

      {dialogType === "check_out" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="">
          <CheckOutForm
            booking={selectedItem}
            onClose={handleCloseDialog}
            rooms={rooms}
            onClick={handleOpenCheckOutConfirm}
          />
        </ReusableDialog>
      )}
    </Layout>
  );
}
