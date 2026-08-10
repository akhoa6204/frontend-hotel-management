import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Pager from "@components/pager";
import { fmtVND } from "@utils/format";
import type { ServiceResponse } from "@constant/response/ServiceResponse";
import { useBookingManagementContext } from "@context/booking-management";
import { useTranslation } from "react-i18next";

export default function BookingServiceTab() {
  const { t } = useTranslation(["bookings", "common"]);
  const {
    services,
    invoiceDetail: invoice,
    filterService,
    metaServices,
    loadingInvoiceDetail,
    onChangePageService,
    onChangeTabService,
    updateService,
    removeService,
    canEdit,
    addService,
    invoiceDetail,
    loadingServices,
  } = useBookingManagementContext();
  return (
    <Grid container spacing={{ xs: 3, md: 2.5 }} alignItems="flex-start">
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          borderRight: { md: "1px solid #E4E7EC" },
          pr: { md: 2.5 },
        }}
      >
        <Typography fontSize={15} fontWeight={650}>
          {t("detail.hotelServices", { ns: "bookings" })}
        </Typography>

        <Tabs
          value={filterService.type}
          onChange={(_, v) => onChangeTabService(v)}
          sx={{ minHeight: 40, mt: 0.5, mb: 0.5, "& .MuiTab-root": { minHeight: 40, minWidth: 100, px: 1.5, fontSize: 13 } }}
        >
          <Tab value="SERVICE" label={t("detail.serviceTab", { ns: "bookings" })} />
          <Tab value="EXTRA_FEE" label={t("detail.incidentalsTab", { ns: "bookings" })} />
        </Tabs>

        <List className="admin-scrollbar" disablePadding sx={{ minHeight: 260, maxHeight: 360, overflowY: "auto" }}>
          {loadingServices ? <Stack alignItems="center" justifyContent="center" spacing={1} py={5}><CircularProgress size={24} /><Typography variant="body2" color="text.secondary">{t("detail.loadingServices", { ns: "bookings" })}</Typography></Stack> : Array.isArray(services) && services.length > 0
            ? services
                .filter((s: ServiceResponse) => s.type === filterService.type)
                .map((s: ServiceResponse) => {
                  const existed = invoice?.invoiceItems?.some(
                    (i) => i.extraService?.id === s.id,
                  );

                  return (
                    <ListItem
                      key={s.id}
                      divider
                      sx={{
                        px: 0,
                        py: 1.25,
                        cursor: canEdit ? "pointer" : "not-allowed",
                        transition: "all .15s ease",
                        "&:hover": {
                          bgcolor: "#F9FAFB",
                        },
                      }}
                      onClick={() => {
                        if (!canEdit) return;
                        if (!invoiceDetail) return;
                        addService(invoiceDetail.id, s.id);
                      }}
                      secondaryAction={
                        <Typography fontWeight={600}>
                          {fmtVND(s.basePrice)} {t("currency.symbol", { ns: "bookings" })}
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography fontWeight={600}>{s.name}</Typography>
                            {existed && (
                              <Typography
                                fontSize={11}
                                px={1}
                                py={0.25}
                                borderRadius={1}
                                bgcolor="#EAF4FF"
                                color="#1D6FC2"
                              >
                                {t("detail.added", { ns: "bookings" })}
                              </Typography>
                            )}
                          </Box>
                        }
                        secondary={s.description}
                      />
                    </ListItem>
                  );
                })
            : <Box py={5} textAlign="center"><Typography fontWeight={600}>{t("detail.noMatchingServices", { ns: "bookings" })}</Typography><Typography variant="body2" color="text.secondary">{t("detail.servicesEmptyHint", { ns: "bookings" })}</Typography></Box>}
        </List>

        {(metaServices?.totalPages || 1) > 1 && (
          <Box display="flex" justifyContent="center" pt={1.5}>
            <Pager
              totalPages={metaServices?.totalPages || 1}
              page={metaServices?.page || 1}
              onChange={onChangePageService}
            />
          </Box>
        )}
      </Grid>

      {/* BOOKING SERVICES */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Typography fontSize={15} fontWeight={650} mb={1}>
          {t("detail.bookingServices", { ns: "bookings" })}
        </Typography>

        {loadingInvoiceDetail ? (
          <Box textAlign="center" py={4}>
            <CircularProgress size={28} />
          </Box>
        ) : (invoiceDetail?.invoiceItems?.length || 1) > 1 ? (
          <List disablePadding>
            {invoiceDetail?.invoiceItems
              .filter((item) => item.extraService)
              .map((item) => (
                <ListItem
                  key={item.id}
                  divider
                  sx={{ px: 0, py: 1.25 }} secondaryAction={
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton
                        size="small"
                        disabled={!canEdit}
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateService(item.id, item.quantity - 1);
                          } else {
                            removeService(item.id);
                          }
                        }}
                      >
                        <Remove />
                      </IconButton>

                      <Typography width={24} textAlign="center">
                        {item.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        disabled={!canEdit}
                        onClick={() => {
                          updateService(item.id, item.quantity + 1);
                        }}
                      >
                        <Add />
                      </IconButton>

                      <Button
                        size="small"
                        color="error"
                        disabled={!canEdit}
                        onClick={() => removeService(item.id)}
                      >
                        {t("actions.delete", { ns: "common" })}
                      </Button>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={item.extraService?.name}
                    secondary={t("detail.quantity", { ns: "bookings", count: item.quantity })}
                  />
                </ListItem>
              ))}
          </List>
        ) : (
          <Box sx={{ mt: 1, py: 4, px: 2, textAlign: "center", bgcolor: "#F9FAFB", border: "1px dashed #D0D5DD", borderRadius: "10px" }}><Typography fontWeight={600}>{t("detail.noServices", { ns: "bookings" })}</Typography><Typography variant="body2" color="text.secondary" mt={0.5}>{t("detail.noServicesHint", { ns: "bookings" })}</Typography></Box>
        )}
      </Grid>
    </Grid>
  );
}
