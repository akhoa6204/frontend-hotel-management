import { Box, Container } from "@mui/material";
import GlobalSnackbar from "@components/GlobalSnackbar";
import HeroSection from "./components/hero-section";
import RoomList from "./components/room-list";
import PropertyIntro from "./components/PropertyIntro";
import ServicesSection from "./components/services-section";
import DestinationSection from "./components/destination-section";
import BookingCta from "./components/booking-cta";
import useHome from "./useHome";

const HomePage = () => {
  const { rooms, loading, form, onChange, onSubmit, onClickSeeAll, alert, closeSnackbar, onClickRoomCard } = useHome();
  return <Box component="main" sx={{ bgcolor: "background.default" }}><HeroSection form={form} onChange={onChange} onSubmit={onSubmit} /><Container maxWidth="lg"><RoomList rooms={rooms} loading={loading} onClickSeeAll={onClickSeeAll} onClickRoomCard={onClickRoomCard} /><PropertyIntro /><ServicesSection /><DestinationSection /><BookingCta /></Container><GlobalSnackbar alert={alert} closeSnackbar={closeSnackbar} /></Box>;
};
export default HomePage;
