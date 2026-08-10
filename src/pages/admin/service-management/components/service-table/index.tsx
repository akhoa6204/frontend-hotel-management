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
import type { ServiceResponse } from "@constant/response/ServiceResponse";
import { useTranslation } from "react-i18next";

interface Props {
  data: ServiceResponse[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  onRowClick?: (id: number) => void;
  onDelete?: (service: ServiceResponse) => void;
}

const TypeChip = ({ type }: { type: ServiceResponse["type"] }) => {
  const { t } = useTranslation("services");
  return <Chip label={t(`types.${type}`)} size="small" sx={{ height: 25, border: 0, borderRadius: "999px", bgcolor: "#F2F4F7", color: "#475467", fontSize: 12, fontWeight: 600, "& .MuiChip-label": { px: 1.15 } }} />;
};

export default function ServiceTable({ data, loading = false, error = false, onRetry, onRowClick, onDelete }: Props) {
  const { t, i18n } = useTranslation(["services", "common"]);
  const numberLocale = i18n.resolvedLanguage === "en" ? "en-US" : "vi-VN";
  const formatPrice = (value: number) => value.toLocaleString(numberLocale);
  const [actionMenu, setActionMenu] = useState<{ anchor: HTMLElement; service: ServiceResponse } | null>(null);
  const emptyContent = <Stack alignItems="center" sx={{ py: 5 }}><Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>{error ? t("states.loadError", { ns: "services" }) : t("states.empty", { ns: "services" })}</Typography><Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>{error ? t("states.loadErrorHint", { ns: "services" }) : t("states.emptyHint", { ns: "services" })}</Typography>{error && onRetry && <Button size="small" onClick={onRetry} sx={{ mt: 1 }}>{t("actions.retry", { ns: "common" })}</Button>}</Stack>;

  return (
    <>
      <TableContainer component={Paper} className="diamond-sea-admin" sx={{ display: { xs: "none", sm: "block" }, border: "1px solid #E4E7EC", borderRadius: "12px", boxShadow: "none", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 720 }}>
          <TableHead sx={{ bgcolor: "#F9FAFB", "& th": { height: 46, py: 1, color: "#475467", fontSize: 12, fontWeight: 650, whiteSpace: "nowrap" } }}><TableRow><TableCell sx={{ width: 80 }}>{t("columns.id", { ns: "services" })}</TableCell><TableCell sx={{ width: "38%" }}>{t("columns.name", { ns: "services" })}</TableCell><TableCell align="right" sx={{ width: "22%" }}>{t("columns.price", { ns: "services" })}</TableCell><TableCell sx={{ width: "20%" }}>{t("columns.type", { ns: "services" })}</TableCell><TableCell align="center" sx={{ width: 90 }}>{t("columns.actions", { ns: "services" })}</TableCell></TableRow></TableHead>
          <TableBody>
            {loading && Array.from({ length: 6 }).map((_, row) => <TableRow key={row}>{Array.from({ length: 5 }).map((__, cell) => <TableCell key={cell} sx={{ py: 1.4 }}><Skeleton width={cell === 1 ? 160 : "65%"} /></TableCell>)}</TableRow>)}
            {!loading && !error && data.map((service) => <TableRow key={service.id} hover tabIndex={0} onClick={() => onRowClick?.(service.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onRowClick?.(service.id); } }} sx={{ cursor: "pointer", "&:last-child td": { borderBottom: 0 }, "&:hover": { bgcolor: "#F9FAFB" }, "& td": { height: 58, py: 1 } }}>
              <TableCell sx={{ color: "#98A2B3", fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}>{service.id}</TableCell>
              <TableCell><Typography sx={{ maxWidth: 300, color: "#1F2937", fontSize: 13.5, fontWeight: 650, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{service.name}</Typography>{service.description && <Typography sx={{ maxWidth: 300, mt: 0.2, color: "#98A2B3", fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{service.description}</Typography>}</TableCell>
              <TableCell align="right"><Typography sx={{ color: "#344054", fontSize: 13.5, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{t("priceValue", { ns: "services", value: formatPrice(service.basePrice) })}</Typography></TableCell>
              <TableCell><TypeChip type={service.type} /></TableCell>
              <TableCell align="center"><IconButton aria-label={t("actions.openMenu", { ns: "services", name: service.name })} size="small" onClick={(event) => { event.stopPropagation(); setActionMenu({ anchor: event.currentTarget, service }); }} sx={{ color: "#667085" }}><MoreVert fontSize="small" /></IconButton></TableCell>
            </TableRow>)}
            {!loading && (error || data.length === 0) && <TableRow><TableCell colSpan={5}>{emptyContent}</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1} sx={{ display: { xs: "flex", sm: "none" } }}>
        {loading && Array.from({ length: 5 }).map((_, index) => <Card key={index} variant="outlined" sx={{ p: 1.5, borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none" }}><Skeleton width="55%" /><Skeleton width="40%" /><Skeleton width="65%" /></Card>)}
        {!loading && !error && data.map((service) => <Card key={service.id} role="button" tabIndex={0} variant="outlined" onClick={() => onRowClick?.(service.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onRowClick?.(service.id); } }} sx={{ width: "100%", p: 1.5, borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none", bgcolor: "#FFFFFF", textAlign: "left", cursor: "pointer" }}><Stack direction="row" justifyContent="space-between" gap={1}><Box sx={{ minWidth: 0 }}><Typography sx={{ color: "#1F2937", fontSize: 14, fontWeight: 650, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{service.name}</Typography><Typography sx={{ mt: 0.3, color: "#344054", fontSize: 13, fontWeight: 600 }}>{t("priceValue", { ns: "services", value: formatPrice(service.basePrice) })}</Typography></Box><IconButton aria-label={t("actions.openMenu", { ns: "services", name: service.name })} size="small" onClick={(event) => { event.stopPropagation(); setActionMenu({ anchor: event.currentTarget, service }); }}><MoreVert fontSize="small" /></IconButton></Stack><Box sx={{ mt: 0.75 }}><TypeChip type={service.type} /></Box></Card>)}
        {!loading && (error || data.length === 0) && <Card variant="outlined" sx={{ borderColor: "#E4E7EC", borderRadius: "10px", boxShadow: "none" }}>{emptyContent}</Card>}
      </Stack>

      <Menu anchorEl={actionMenu?.anchor} open={Boolean(actionMenu)} onClose={() => setActionMenu(null)} PaperProps={{ sx: { width: 180, border: "1px solid #E4E7EC", borderRadius: "8px", boxShadow: "0 8px 24px rgba(16,24,40,0.10)" } }}>
        <MenuItem onClick={() => { if (actionMenu) onRowClick?.(actionMenu.service.id); setActionMenu(null); }} sx={{ minHeight: 38, fontSize: 13.5 }}>{t("actions.edit", { ns: "services" })}</MenuItem>
        <MenuItem onClick={() => { if (actionMenu) onDelete?.(actionMenu.service); setActionMenu(null); }} sx={{ minHeight: 38, color: "#B42318", fontSize: 13.5 }}>{t("actions.delete", { ns: "services" })}</MenuItem>
      </Menu>
    </>
  );
}
