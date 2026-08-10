import { Box, Button, Paper, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { GlobalSnackbar } from "@components";
import ProfileInformation from "./components/ProfileInformation";
import ProfileSecurity from "./components/ProfileSecurity";
import useAdminProfile, { type AdminProfileTab } from "./useAdminProfile";
import { useTranslation } from "react-i18next";

const AdminProfilePage = () => {
  const { t } = useTranslation(["profile", "common"]);
  const { activeTab, changeTab, profileForm, passwordForm, profileErrors, passwordErrors, updateProfileField, updatePasswordField, submitProfile, submitPassword, isEditing, startEditing, cancelEditing, isProfileDirty, roleLabel, isProfileLoading, isProfileError, retryProfile, isProfileSaving, isPasswordChanging, alert, closeSnackbar } = useAdminProfile();

  return (
    <Box sx={{ width: 1, maxWidth: 840 }}>
      <Box sx={{ mb: 2.5 }}><Typography component="h1" sx={{ color: "#163B47", fontSize: { xs: 26, md: 29 }, lineHeight: 1.25, fontWeight: 700 }}>{t("title", { ns: "profile" })}</Typography><Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13.5 }}>{t("subtitle", { ns: "profile" })}</Typography></Box>

      <Paper variant="outlined" sx={{ borderColor: "#E4E7EC", borderRadius: "11px", boxShadow: "none", overflow: "hidden" }}>
        <Tabs value={activeTab} onChange={(_, value: AdminProfileTab) => changeTab(value)} aria-label={t("title", { ns: "profile" })} sx={{ minHeight: 44, px: { xs: 1, sm: 2 }, borderBottom: "1px solid #EAECF0", "& .MuiTab-root": { minHeight: 44, minWidth: "auto", px: 2, color: "#667085", fontSize: 13, fontWeight: 600 }, "& .Mui-selected": { color: "#1D6FC2" }, "& .MuiTabs-indicator": { height: 2 } }}><Tab value="info" label={t("information", { ns: "profile" })} /><Tab value="security" label={t("security", { ns: "profile" })} /></Tabs>
        <Box sx={{ px: { xs: 2, sm: 2.5 }, py: { xs: 2.25, sm: 2.5 } }}>
          {isProfileLoading ? <Stack spacing={1.5}><Skeleton width={170} /><Skeleton height={42} /><Skeleton height={42} /></Stack> : isProfileError ? <Stack alignItems="flex-start" sx={{ py: 2 }}><Typography sx={{ color: "#344054", fontSize: 14, fontWeight: 600 }}>{t("loadError", { ns: "profile" })}</Typography><Typography sx={{ mt: 0.4, color: "#667085", fontSize: 13 }}>{t("loadHint", { ns: "profile" })}</Typography><Button size="small" onClick={() => retryProfile()} sx={{ mt: 1 }}>{t("actions.retry", { ns: "common" })}</Button></Stack> : activeTab === "info" ? <ProfileInformation form={profileForm} errors={profileErrors} roleLabel={roleLabel} editing={isEditing} saving={isProfileSaving} dirty={isProfileDirty} onChange={updateProfileField} onSubmit={submitProfile} onEdit={startEditing} onCancel={cancelEditing} /> : <ProfileSecurity form={passwordForm} errors={passwordErrors} saving={isPasswordChanging} onChange={updatePasswordField} onSubmit={submitPassword} />}
        </Box>
      </Paper>
      <GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} />
    </Box>
  );
};

export default AdminProfilePage;
