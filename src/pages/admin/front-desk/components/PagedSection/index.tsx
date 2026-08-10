import type { ReactNode } from "react";
import type { Pagination } from "@constant/response/ApiResponse";
import { Box, Chip, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Pager } from "@components";
import { useTranslation } from "react-i18next";

type PagedSectionProps<T> = {
  title: string;
  items: T[];
  meta?: Pagination;
  loading?: boolean;
  emptyText?: string;
  renderItem: (item: T, index: number) => ReactNode;
  onChangePage?: (page: number) => void;
  footerSlot?: ReactNode;
};

export default function PagedSection<T>({
  title,
  items,
  meta,
  loading = false,
  emptyText,
  renderItem,
  onChangePage,
  footerSlot,
}: PagedSectionProps<T>) {
  const { t } = useTranslation("receptionist");

  return (
    <Paper sx={{ p: { xs: 1.75, sm: 2 }, borderRadius: "11px", borderColor: "#E4E7EC", boxShadow: "none" }} variant="outlined">
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h3" sx={{ color: "#1F2937", fontSize: 17, fontWeight: 650 }}>
            {title}
          </Typography>

          {meta?.total !== undefined && (
            <Chip
              label={meta.total}
              size="small"
              sx={{
                height: 24,
                border: 0,
                fontWeight: 600,
                fontSize: 12,
                color: "#475467",
                backgroundColor: "#F2F4F7",
              }}
            />
          )}
        </Stack>

        {/* BODY */}
        {loading ? (
          <Stack spacing={1.1} sx={{ mt: 1.25 }}>{[0, 1, 2].map((item) => <Box key={item} sx={{ py: 0.45 }}><Skeleton width="48%" height={20} /><Skeleton width="34%" height={18} /></Box>)}</Stack>
        ) : items.length === 0 ? (
          <Typography sx={{ py: 2.25, color: "#667085", fontSize: 13.5 }}>
            {emptyText ?? t("states.noData")}
          </Typography>
        ) : (
          <Stack sx={{ mt: 0.75 }} divider={<Box sx={{ borderBottom: "1px solid #EAECF0" }} />}>
            {items.map((it, idx) => (
              <Box key={idx}>
                {renderItem(it, idx)}
              </Box>
            ))}
          </Stack>
        )}

        {/* FOOTER */}
        {footerSlot}

        {meta && meta.totalPages > 1 && onChangePage && (
          <Box sx={{ mt: 1.25, pt: 1.25, borderTop: "1px solid #EAECF0", display: "flex", justifyContent: "center" }}>
            <Pager
              page={meta.page}
              totalPages={meta.totalPages}
              onChange={onChangePage}
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
