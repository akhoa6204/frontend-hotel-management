import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation("client");

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: { xs: 520, md: 620 },
        display: "flex",
        alignItems: "center",
        py: { xs: 7, sm: 9, md: 11 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(220px, .72fr) minmax(0, 1.28fr)" },
            alignItems: "center",
            gap: { xs: 3.5, sm: 5, md: 9 },
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          <Box aria-hidden sx={{ position: "relative", width: "fit-content" }}>
            <Typography
              sx={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: { xs: 96, sm: 128, md: 164 },
                fontWeight: 400,
                lineHeight: .82,
                letterSpacing: "-.06em",
                color: "primary.main",
              }}
            >
              404
            </Typography>
            <Box sx={{ width: { xs: 72, md: 96 }, height: 2, bgcolor: "primary.main", mt: { xs: 2.5, md: 3.5 } }} />
          </Box>

          <Box sx={{ maxWidth: 620 }}>
            <Typography sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: ".16em" }}>
              {t("notFound.eyebrow")}
            </Typography>
            <Typography
              component="h1"
              sx={{
                mt: 1.25,
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: { xs: 34, sm: 42, md: 50 },
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-.025em",
              }}
            >
              {t("notFound.title")}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 540, fontSize: { xs: 15, sm: 16.5 }, lineHeight: 1.75 }}>
              {t("notFound.description")}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mt: { xs: 3.5, md: 4.5 }, alignItems: { sm: "center" } }}>
              <Button component={Link} to="/" variant="contained" startIcon={<HomeOutlinedIcon />} sx={{ minHeight: 48, px: 2.75 }}>
                {t("notFound.actions.home")}
              </Button>
              <Button component={Link} to="/search" variant="outlined" endIcon={<ArrowForwardRoundedIcon />} sx={{ minHeight: 48, px: 2.75, borderColor: "divider", color: "text.primary" }}>
                {t("notFound.actions.rooms")}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
