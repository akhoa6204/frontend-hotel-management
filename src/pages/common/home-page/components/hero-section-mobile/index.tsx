import SearchBarMobile from "@components/search-bar-mobile";
import { SearchBookingFilter } from "@constant/internal/SearchBookingFilter";
import { Box, Container, Typography } from "@mui/material";
interface Props {
  form: SearchBookingFilter;
  onChange: (field: keyof SearchBookingFilter, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const HeroSectionMobile: React.FC<Props> = (props) => {
  return (
    <>
      <Box sx={{ bgcolor: "#2E90FA0d", height: 236 }} position={"relative"}>
        <Container>
          <Box sx={{ py: 5 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 28,
              }}
            >
              Trải nghiệm cùng
            </Typography>
            <Typography
              color="primary"
              sx={{
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              Diamond Sea Đà Nẵng
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container
        sx={{
          transform: "translateY(-80px)",
        }}
      >
        <SearchBarMobile {...props} />
      </Container>
    </>
  );
};
export default HeroSectionMobile;
