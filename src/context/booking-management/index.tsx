import useBookingManagement from "@pages/admin/booking-management/useBookingManagement";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type BookingManagementContextValue = ReturnType<typeof useBookingManagement>;

const BookingManagementContext =
  createContext<BookingManagementContextValue | null>(null);

export function BookingManagementProvider({
  children,
}: {
  children: ReactNode;
}) {
  const bookingManagement = useBookingManagement();

  return (
    <BookingManagementContext.Provider value={bookingManagement}>
      {children}
    </BookingManagementContext.Provider>
  );
}

export function useBookingManagementContext() {
  const context = useContext(BookingManagementContext);

  if (!context) {
    throw new Error(
      "useBookingManagementContext must be used inside BookingManagementProvider",
    );
  }

  return context;
}
