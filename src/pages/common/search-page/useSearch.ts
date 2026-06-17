import useSnackbar from "@hooks/useSnackbar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useForm from "@hooks/useForm";
import { formatDateInput } from "@utils/format";
import { useMediaQuery, useTheme } from "@mui/material";
import { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import { SearchFilter } from "@constant/internal/SearchFilter";
import GuestRoomTypeService from "@services/guest/roomType.service";

type FormBooking = SearchBookingFilter & SearchFilter;
const useSearch = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: Partial<SearchBookingFilter>;
  };

  const { alert, showError, closeSnackbar, showSuccess } = useSnackbar();
  const nights = state?.nights || 1;
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + Number(nights));

  const initForm: SearchBookingFilter = {
    startDate: state?.startDate || formatDateInput(today.toISOString()),
    endDate: state?.endDate || formatDateInput(tomorrow.toISOString()),
    capacity: Number(state?.capacity || 1),
  };

  const {
    form: formSearch,
    errors,
    onChangeField: onChangeFormSearch,
    onSubmit: onSubmitSearch,
  } = useForm<FormBooking>(initForm, undefined, (f) => {
    setFilters((p) => ({
      ...p,
      ...f,
    }));
  });

  const [filters, setFilters] = useState<SearchFilter>({
    page: 1,
    limit: 10,
    q: "",
    sortBy: "basePrice",
    sortOrder: "asc",
  });

  const enabled = useMemo(
    () =>
      Boolean(
        formSearch.startDate &&
        formSearch.endDate &&
        (formSearch.capacity || 1) >= 1,
      ),
    [formSearch.startDate, formSearch.endDate, formSearch.capacity],
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["rooms.search", filters],
    queryFn: async () => {
      return GuestRoomTypeService.getList({
        ...filters,
        ...formSearch,
      });
    },
    enabled,
  });
  const rooms = data?.data ?? [];
  const meta = data?.pagination;
  const loadingRooms = isLoading || isFetching;

  const hasAutoHandledRoomTypeRef = useRef(false);

  useEffect(() => {
    if (!state?.roomTypeId) return;
    if (hasAutoHandledRoomTypeRef.current) return;
    if (loadingRooms) return;
    if (!data) return;

    const findRoom = rooms?.find((room) => room.id == state.roomTypeId);

    hasAutoHandledRoomTypeRef.current = true;

    if (!findRoom || !findRoom.isAvailable) {
      showError("Không còn loại phòng này trong khoảng thời gian này.");
      return;
    }

    navigate(`/booking`, {
      state: {
        roomId: findRoom.id,
        startDate: formSearch.startDate,
        endDate: formSearch.endDate,
      },
    });
  }, [data, loadingRooms, rooms, state?.roomTypeId]);

  const handleSort = (s: typeof filters.sortOrder) =>
    setFilters((p) => ({ ...p, sortOrder: s, page: 1 }));

  const handleRoomType = (value: string | undefined) =>
    setFilters((p) => ({ ...p, roomType: value, page: 1 }));

  const onBooking = (id: number) => {
    if (!formSearch.startDate || !formSearch.endDate) {
      showError("Điền đủ thông tin ngày bắt đầu - ngày kết thúc");
      return;
    }
    navigate(`/booking`, {
      state: {
        roomId: id,
        startDate: formSearch.startDate,
        endDate: formSearch.endDate,
      },
    });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return {
    formSearch,
    errors,
    onChangeFormSearch,
    onSubmitSearch,

    filters,

    rooms,
    loadingRooms,
    meta,
    handleSort,
    handleRoomType,
    setPage: (page: number) => setFilters((p) => ({ ...p, page })),
    setLimit: (limit: number) => setFilters((p) => ({ ...p, limit })),

    alert,
    closeSnackbar,

    onBooking,

    isMobile,
  };
};

export default useSearch;
