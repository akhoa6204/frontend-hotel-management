import GlobalSnackbar from "@components/GlobalSnackbar";
import { Box, Button, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import ChangePasswordTab from "./components/change-password";
import InfoTab from "./components/info";
import useAccountProfilePage, { type ActiveTab } from "./useAccountProfilePage";

const ProfileLoading = () => (
  <Box aria-label="Đang tải hồ sơ" sx={{ maxWidth: 720 }}>
    <Skeleton width={132} height={18} />
    <Skeleton width="55%" height={54} sx={{ mt: 0.5 }} />
    <Skeleton width="80%" height={28} />
    <Skeleton width="100%" height={48} sx={{ mt: 3 }} />
    <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
      <Skeleton width={180} height={32} />
      <Stack spacing={2.25} sx={{ mt: 2.5 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index}>
            <Skeleton width={96} height={18} />
            <Skeleton width={index === 0 ? "48%" : "64%"} height={26} />
          </Box>
        ))}
      </Stack>
    </Box>
  </Box>
);

const AccountProfilePage = () => {
  const {
    activeTab,
    onChangeTab,
    form,
    onChange,
    onSubmitInfo,
    onSubmitPassword,
    errors,
    editing,
    startEditing,
    cancelEditing,
    loading,
    loadError,
    retry,
    savingInfo,
    savingPassword,
    alert,
    closeSnackbar,
  } = useAccountProfilePage();

  if (loading) return <ProfileLoading />;

  if (loadError) {
    return (
      <Box sx={{ maxWidth: 720, py: { xs: 4, md: 6 }, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography component="h1" sx={{ color: "#173C4B", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 30, md: 38 } }}>
          Không thể tải hồ sơ
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5, lineHeight: 1.7 }}>
          Thông tin tài khoản hiện chưa thể truy cập. Vui lòng thử lại.
        </Typography>
        <Button variant="outlined" onClick={() => retry()}>Thử lại</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 1, pb: { xs: 4, md: 7 } }}>
      <Box component="header" sx={{ mb: { xs: 3, md: 4 }, maxWidth: 720 }}>
        <Typography sx={{ color: "primary.main", fontSize: 12, fontWeight: 700, letterSpacing: ".16em", mb: 1 }}>
          TÀI KHOẢN CỦA BẠN
        </Typography>
        <Typography component="h1" sx={{ color: "#173C4B", fontFamily: 'Georgia, "Times New Roman", serif', fontSize: { xs: 32, md: 42 }, lineHeight: 1.15 }}>
          Hồ sơ của tôi
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1.25, maxWidth: 650, lineHeight: 1.7 }}>
          Quản lý thông tin cá nhân được sử dụng cho các kỳ nghỉ tại Diamond Sea.
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(_, value: ActiveTab) => onChangeTab(value)}
        aria-label="Nội dung hồ sơ"
        variant="scrollable"
        scrollButtons={false}
        sx={{
          maxWidth: 720,
          minHeight: 44,
          mb: { xs: 3.5, md: 4.5 },
          borderBottom: "1px solid rgba(23, 60, 75, 0.10)",
          "& .MuiTabs-indicator": { height: 2, borderRadius: 2 },
          "& .MuiTab-root": {
            minHeight: 44,
            minWidth: "auto",
            px: 0,
            mr: { xs: 3, sm: 4.5 },
            color: "text.secondary",
            fontSize: 14,
            fontWeight: 550,
            textTransform: "none",
            "&.Mui-selected": { color: "primary.main", fontWeight: 700 },
          },
        }}
      >
        <Tab value="info" label="Thông tin cá nhân" />
        <Tab value="security" label="Bảo mật tài khoản" />
      </Tabs>

      <Box sx={{ maxWidth: 720 }}>
        {activeTab === "info" ? (
          <InfoTab
            form={form}
            errors={errors}
            editing={editing}
            saving={savingInfo}
            onChange={onChange}
            onSubmit={onSubmitInfo}
            onEdit={startEditing}
            onCancel={cancelEditing}
          />
        ) : (
          <ChangePasswordTab
            form={form}
            errors={errors}
            saving={savingPassword}
            onChangeField={onChange}
            onSubmit={onSubmitPassword}
          />
        )}
      </Box>

      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default AccountProfilePage;
