import { Footer, Header } from "@components";
import AccountSidebar from "@components/account-sidebar";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const AccountLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{ bgcolor: "background.default", minHeight: "92vh" }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1440,
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2.5, md: 3.5, lg: 4 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                lg: "216px minmax(0, 1fr)",
              },
              alignItems: "start",
              gap: { xs: 3, lg: 4 },
            }}
          >
            <AccountSidebar />
            <Box component="main" sx={{ minWidth: 0 }}>
              <Outlet />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AccountLayout;
