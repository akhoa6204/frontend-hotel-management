import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { PromotionResponse } from "@constant/response/PromotionResponse";
import { fmtVND, formatDate } from "@utils/format";
import { getPromotionLabels } from "../../usePromotionManagement";

interface Props {
  rows: PromotionResponse[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (promotion: PromotionResponse) => void;
}

const PromotionStatus = ({ promotion }: { promotion: PromotionResponse }) => {
  const { t } = useTranslation("promotions");
  const active = new Date() < new Date(promotion.endDate);
  return (
    <Chip
      size="small"
      label={active ? t("status.active") : t("status.expired")}
      sx={{
        height: 25,
        borderRadius: "999px",
        border: 0,
        bgcolor: active ? "#ECFDF3" : "#F2F4F7",
        color: active ? "#027A48" : "#667085",
        fontSize: 12,
        fontWeight: 600,
        "& .MuiChip-label": { px: 1.15 },
      }}
    />
  );
};

const PromotionType = ({ automatic }: { automatic: boolean }) => {
  const { t } = useTranslation("promotions");
  return <Chip
    size="small"
    label={automatic ? t("types.AUTO") : t("types.CODE")}
    sx={{
      height: 25,
      borderRadius: "999px",
      border: 0,
      bgcolor: automatic ? "#EAF4FF" : "#F2F4F7",
      color: automatic ? "#175CD3" : "#475467",
      fontSize: 12,
      fontWeight: 600,
      "& .MuiChip-label": { px: 1.15 },
    }}
  />;
};

const discountLabel = (promotion: PromotionResponse) =>
  promotion.discountType === "PERCENTAGE"
    ? `${promotion.discountValue}%`
    : `${fmtVND(promotion.discountValue)} VND`;

export default function PromotionsTable({
  rows,
  loading = false,
  error = false,
  onRetry,
  onEdit,
  onDelete,
}: Props) {
  const { t } = useTranslation(["promotions", "common"]);
  const [actionMenu, setActionMenu] = useState<{
    anchor: HTMLElement;
    promotion: PromotionResponse;
  } | null>(null);

  const emptyContent = (
    <Stack alignItems="center" sx={{ py: 5 }}>
      <Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>
        {error
          ? t("states.loadError", { ns: "promotions" })
          : t("states.empty", { ns: "promotions" })}
      </Typography>
      <Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>
        {error
          ? t("states.loadErrorHint", { ns: "promotions" })
          : t("states.emptyHint", { ns: "promotions" })}
      </Typography>
      {error && onRetry && (
        <Button size="small" onClick={onRetry} sx={{ mt: 1 }}>
          {t("actions.retry", { ns: "common" })}
        </Button>
      )}
    </Stack>
  );

  return (
    <>
      <TableContainer
        component={Paper}
        className="diamond-sea-admin"
        sx={{
          display: { xs: "none", md: "block" },
          border: "1px solid #E4E7EC",
          borderRadius: "12px",
          boxShadow: "none",
          overflowX: "auto",
        }}
      >
        <Table size="small" sx={{ minWidth: 1050 }}>
          <TableHead sx={{ bgcolor: "#F9FAFB" }}>
            <TableRow>
              {[
                { label: t("columns.promotion", { ns: "promotions" }), align: "left" as const },
                { label: t("columns.type", { ns: "promotions" }), align: "left" as const },
                { label: t("columns.discount", { ns: "promotions" }), align: "left" as const },
                { label: t("columns.scope", { ns: "promotions" }), align: "left" as const },
                { label: t("columns.used", { ns: "promotions" }), align: "center" as const },
                { label: t("columns.validity", { ns: "promotions" }), align: "center" as const },
                { label: t("columns.status", { ns: "promotions" }), align: "center" as const },
                { label: t("columns.actions", { ns: "promotions" }), align: "center" as const },
              ].map(({ label, align }) => (
                <TableCell
                  key={label}
                  align={align}
                  sx={{
                    height: 46,
                    py: 1,
                    color: "#475467",
                    fontSize: 12,
                    fontWeight: 650,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              Array.from({ length: 6 }).map((_, row) => (
                <TableRow key={row}>
                  {Array.from({ length: 8 }).map((__, cell) => (
                    <TableCell key={cell} sx={{ py: 1.4 }}>
                      <Skeleton width={cell === 0 ? 130 : "70%"} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!loading &&
              !error &&
              rows.map((promotion) => {
                const labels = getPromotionLabels(promotion, t);
                return (
                  <TableRow
                    key={promotion.id}
                    hover
                    onClick={() => onEdit?.(promotion.id)}
                    sx={{
                      cursor: onEdit ? "pointer" : "default",
                      "&:last-child td": { borderBottom: 0 },
                      "&:hover": { bgcolor: "#F9FAFB" },
                      "& td": { height: 58, py: 1 },
                    }}
                  >
                    <TableCell>
                      <Typography
                        sx={{
                          maxWidth: 220,
                          color: "#1F2937",
                          fontSize: 13.5,
                          fontWeight: 650,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {promotion.code || promotion.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <PromotionType automatic={promotion.autoApplied} />
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: "#1F2937",
                          fontSize: 13.5,
                          fontWeight: 650,
                        }}
                      >
                        {discountLabel(promotion)}
                      </Typography>
                      <Typography sx={{ color: "#98A2B3", fontSize: 11.5 }}>
                        {labels.discountTypeTransform}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "#475467", fontSize: 13 }}>
                      {labels.scopeLabel}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        sx={{
                          color: "#344054",
                          fontSize: 13,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {String(labels.usedLabel).replace("/", " / ")}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#667085",
                        fontSize: 12.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(promotion.startDate)} →{" "}
                      {formatDate(promotion.endDate)}
                    </TableCell>
                    <TableCell align="center">
                      <PromotionStatus promotion={promotion} />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label={t("actions.openMenu", { ns: "promotions", name: promotion.code || promotion.name })}
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActionMenu({
                            anchor: event.currentTarget,
                            promotion,
                          });
                        }}
                        sx={{ color: "#667085" }}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {!loading && (error || rows.length === 0) && (
              <TableRow>
                <TableCell colSpan={8}>{emptyContent}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1} sx={{ display: { xs: "flex", md: "none" } }}>
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                p: 1.5,
                borderColor: "#E4E7EC",
                borderRadius: "10px",
                boxShadow: "none",
              }}
            >
              <Skeleton width="52%" />
              <Skeleton width="70%" />
              <Skeleton width="44%" />
            </Card>
          ))}
        {!loading &&
          !error &&
          rows.map((promotion) => {
            const labels = getPromotionLabels(promotion, t);
            return (
              <Card
                key={promotion.id}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "#E4E7EC",
                  borderRadius: "10px",
                  boxShadow: "none",
                }}
              >
                <Stack direction="row" justifyContent="space-between" gap={1}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: "#1F2937",
                        fontSize: 14,
                        fontWeight: 650,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {promotion.code || promotion.name}
                    </Typography>
                    <Typography
                      sx={{ mt: 0.25, color: "#667085", fontSize: 12.5 }}
                    >
                      {labels.autoApplyLabel} · {discountLabel(promotion)}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label={t("actions.openMenu", { ns: "promotions", name: promotion.code || promotion.name })}
                    size="small"
                    onClick={(event) =>
                      setActionMenu({ anchor: event.currentTarget, promotion })
                    }
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                  sx={{ mt: 1 }}
                >
                  <Typography sx={{ color: "#667085", fontSize: 12 }}>
                    {t("usageCount", { ns: "promotions", count: String(labels.usedLabel).replace("/", " / ") })} ·{" "}
                    {formatDate(promotion.startDate)} →{" "}
                    {formatDate(promotion.endDate)}
                  </Typography>
                  <PromotionStatus promotion={promotion} />
                </Stack>
              </Card>
            );
          })}
        {!loading && (error || rows.length === 0) && (
          <Card
            variant="outlined"
            sx={{
              borderColor: "#E4E7EC",
              borderRadius: "10px",
              boxShadow: "none",
            }}
          >
            {emptyContent}
          </Card>
        )}
      </Stack>

      <Menu
        anchorEl={actionMenu?.anchor}
        open={Boolean(actionMenu)}
        onClose={() => setActionMenu(null)}
        PaperProps={{
          sx: {
            width: 190,
            border: "1px solid #E4E7EC",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(16,24,40,0.10)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            if (actionMenu) onEdit?.(actionMenu.promotion.id);
            setActionMenu(null);
          }}
          sx={{ minHeight: 38, fontSize: 13.5 }}
        >
          {t("actions.edit", { ns: "promotions" })}
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (actionMenu) onDelete?.(actionMenu.promotion);
            setActionMenu(null);
          }}
          sx={{ minHeight: 38, color: "#B42318", fontSize: 13.5 }}
        >
          {t("actions.delete", { ns: "promotions" })}
        </MenuItem>
      </Menu>
    </>
  );
}
