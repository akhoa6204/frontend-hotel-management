import { useNavigate } from "react-router-dom";
import useForm from "@hooks/useForm";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery, useTheme } from "@mui/material";
import { buildDefaultSearchParams } from "@utils/dateRange";
import useSnackbar from "@hooks/useSnackbar";
import { sleep } from "@utils/sleep";
import { formatDateInput } from "@utils/format";
import type { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import GuestRoomTypeService from "@services/guest/roomType.service";
import { useTranslation } from "react-i18next";

const useHome = () => {
  const { t } = useTranslation("client");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { alert, showError, closeSnackbar } = useSnackbar();

  const { form, errors, onChangeField, onSubmit } =
    useForm<SearchBookingFilter>(
      {
        startDate: formatDateInput(today.toISOString()),
        endDate: formatDateInput(tomorrow.toISOString()),
        capacity: 1,
      },

      (f) => {
        const errors: Partial<Record<keyof SearchBookingFilter, string>> = {};

        if (!f.startDate) errors.startDate = t("home.search.validation.checkInRequired");
        if (!f.endDate) errors.endDate = t("home.search.validation.checkOutRequired");

        if (Object.keys(errors).length > 0) {
          showError(t("home.search.validation.dateRangeRequired"));
        }

        return errors;
      },

      (form) => {
        navigate("/search", {
          state: {
            ...form,
          },
        });
      },
    );
  const { data, isLoading: loading } = useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => {
      await sleep(500);
      return GuestRoomTypeService.getList({
        page: 1,
        limit: 3,
        ...form,
      });
    },
  });

  const roomTypes = data?.data ?? [];

  const onClickSeeAll = () => {
    const dateRange = buildDefaultSearchParams();
    navigate("/booking", {
      state: {
        ...dateRange,
      },
    });
  };
  const onClickRoomCard = (capacity: number) => {
    const dateRange = buildDefaultSearchParams(capacity);
    navigate("/search", {
      state: {
        ...dateRange,
      },
    });
  };

  return {
    loading,
    rooms: roomTypes,
    form,
    onChange: onChangeField,
    onSubmit,
    errors,
    isMobile,
    onClickSeeAll,
    alert,
    closeSnackbar,
    onClickRoomCard,
  };
};

export default useHome;
