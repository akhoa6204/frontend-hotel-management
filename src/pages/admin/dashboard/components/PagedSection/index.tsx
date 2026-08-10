import type { ReactNode } from "react";
import type { Pagination } from "@constant/response/ApiResponse";
import Pager from "@components/pager";
import { Box, Chip, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PagedSectionProps<T> {
  title: string;
  items: T[];
  meta?: Pagination;
  loading?: boolean;
  emptyText?: string;
  renderItem: (item: T, index: number) => ReactNode;
  onChangePage?: (page: number) => void;
  footerSlot?: ReactNode;
}

const PagedSection = <T,>({
  title,
  items,
  meta,
  loading = false,
  emptyText,
  renderItem,
  onChangePage,
  footerSlot,
}: PagedSectionProps<T>) => {
  const { t } = useTranslation("common");

  return (
    <Paper variant="outlined" sx={{ p: { xs: 1.75, sm: 2 }, borderRadius: "11px", borderColor: "#E4E7EC", boxShadow: "none" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography component="h3" sx={{ color: "text.primary", fontSize: 17, fontWeight: 650 }}>
          {title}
        </Typography>
        {!loading && (
          <Chip label={meta?.total ?? items.length} size="small" sx={{ height: 24, border: 0, bgcolor: "#F2F4F7", color: "#475467", fontSize: 12, fontWeight: 600 }} />
        )}
      </Stack>

      {loading ? (
        <Box sx={{ minHeight: 72, display: "grid", placeItems: "center" }}>
          <CircularProgress size={22} />
        </Box>
      ) : items.length === 0 ? (
        <Typography sx={{ py: 2, color: "text.secondary", fontSize: 13.5 }}>
          {emptyText ?? t("states.noResults")}
        </Typography>
      ) : (
        <Stack sx={{ mt: 0.75 }} divider={<Box sx={{ borderBottom: "1px solid #EAECF0" }} />}>
          {items.map((item, index) => (
            <Box key={index}>{renderItem(item, index)}</Box>
          ))}
        </Stack>
      )}

      {footerSlot}
      {meta && meta.totalPages > 1 && onChangePage && (
        <Box sx={{ mt: 1.25, pt: 1.25, borderTop: "1px solid #EAECF0", display: "flex", justifyContent: "center" }}>
          <Pager page={meta.page} totalPages={meta.totalPages} onChange={onChangePage} siblingCount={1} boundaryCount={1} />
        </Box>
      )}
    </Paper>
  );
};

export default PagedSection;
