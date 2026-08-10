import Pager from "@components/pager";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface EntityRow {
  id: string | number;
}

interface Props<T extends EntityRow> {
  loading: boolean;
  data: T[];
  onClose: () => void;
  open: boolean;
  selectedId: string | number | null;
  title: string;
  columns: { label: string; name: string }[];

  onSelect?: (row: T) => void;

  q?: string;
  onSearch?: (value: string) => void;

  page?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const EntityPickerDialog = <T extends EntityRow,>({
  data,
  onClose,
  open,
  selectedId,
  title,
  columns = [],
  q,
  onSearch,
  page,
  totalPages,
  onPageChange,
  onSelect,
  loading = false,
}: Props<T>) => {
  const { t } = useTranslation("common");
  const getValueByPath = (obj: unknown, path: string): unknown => {
    return path.split(".").reduce<unknown>((value, key) => {
      if (typeof value !== "object" || value === null) return undefined;
      return (value as Record<string, unknown>)[key];
    }, obj);
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography>{title || t("entityPicker.defaultTitle")}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder={t("entityPicker.search")}
            value={q ?? ""}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={`${col.name}-${index}`}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                  >
                    <CircularProgress size={24} />
                    <Typography variant="body2">{t("entityPicker.loading")}</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography color="text.secondary">
                    {t("entityPicker.empty")}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    selected={row.id === selectedId}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => onSelect?.(row)}
                  >
                    {columns.map((col) => {
                      const value = getValueByPath(row, col.name);

                      return (
                        <TableCell key={`${row.id}-${col.name}`}>
                          {value == null ? "" : String(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        {(totalPages || 1) > 1 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pager
              page={page || 1}
              totalPages={totalPages || 1}
              onChange={onPageChange}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("actions.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default EntityPickerDialog;
