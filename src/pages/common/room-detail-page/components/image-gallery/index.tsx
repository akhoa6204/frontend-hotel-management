import { useEffect, useMemo, useRef, useState } from "react";
import { BgRoom } from "@assets/images";
import type { RoomTypeImageResponse } from "@constant/response/RoomTypeImageResponse";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import { Box, Button, Dialog, IconButton, Stack, Typography } from "@mui/material";

interface Props {
  images: RoomTypeImageResponse[];
  roomName: string;
}

const inappropriateImagePattern = /(meme|joke|giphy|tenor|\.gif(?:\?|$))/i;

const ImageGallery = ({ images, roomName }: Props) => {
  const galleryImages = useMemo(() => {
    const uniqueImages = new Map<string, RoomTypeImageResponse>();

    images.forEach((image) => {
      const url = image.url?.trim();
      if (!url || inappropriateImagePattern.test(`${url} ${image.alt ?? ""}`)) return;
      if (!uniqueImages.has(url)) uniqueImages.set(url, { ...image, url });
    });

    const normalizedImages = Array.from(uniqueImages.values());
    return normalizedImages.length
      ? normalizedImages
      : [{ url: BgRoom, alt: "Không gian khách sạn Diamond Sea" }];
  }, [images]);

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [mainImage, ...secondaryImages] = galleryImages;
  const supportingImages = secondaryImages.slice(0, 2);
  const galleryOpen = activeImageIndex !== null;
  const activeImage = galleryOpen ? galleryImages[activeImageIndex] : null;

  const closeGallery = () => setActiveImageIndex(null);
  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };
  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === null ? 0 : (current + 1) % galleryImages.length,
    );
  };
  const markImageAsFailed = (url: string) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(url);
      return next;
    });
  };

  useEffect(() => {
    if (!galleryOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) =>
          current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) =>
          current === null ? 0 : (current + 1) % galleryImages.length,
        );
      }
      if (event.key === "Escape") setActiveImageIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen, galleryImages.length]);

  useEffect(() => {
    if (activeImageIndex === null) return;
    thumbnailRefs.current[activeImageIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeImageIndex]);

  const imageButton = (
    image: RoomTypeImageResponse,
    index: number,
    main = false,
  ) => (
    <Box
      component="button"
      type="button"
      onClick={() => setActiveImageIndex(index)}
      aria-label={`Xem ảnh ${index + 1} của ${roomName}`}
      sx={{
        position: "relative",
        display: "block",
        width: 1,
        height: 1,
        p: 0,
        border: 0,
        overflow: "hidden",
        cursor: "zoom-in",
        bgcolor: "#d8d5ce",
        "&:hover img": { transform: "scale(1.025)" },
        "&:focus-visible": { outline: "3px solid #2E90FA", outlineOffset: 2 },
      }}
    >
      {failedImages.has(image.url) ? (
        <Stack alignItems="center" justifyContent="center" spacing={1} sx={{ height: 1, color: "text.secondary" }}>
          <BrokenImageOutlinedIcon />
          <Typography variant="caption">Không thể tải ảnh</Typography>
        </Stack>
      ) : (
        <Box
          component="img"
          src={image.url}
          alt={image.alt || `${roomName} - ảnh ${index + 1}`}
          onError={() => markImageAsFailed(image.url)}
          sx={{ width: 1, height: 1, display: "block", objectFit: "cover", transition: "transform .4s ease" }}
        />
      )}
      {main && galleryImages.length > 1 && (
        <Button
          component="span"
          variant="contained"
          color="inherit"
          startIcon={<CollectionsOutlinedIcon />}
          sx={{ position: "absolute", right: 18, bottom: 18, bgcolor: "rgba(255,255,255,.94)", color: "#183746", borderRadius: 1 }}
        >
          Xem tất cả ảnh
        </Button>
      )}
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: supportingImages.length ? "1.65fr 1fr" : "1fr" }, gap: { xs: 1, md: 1.25 }, height: { xs: 360, sm: 440, md: 520 } }}>
        {imageButton(mainImage, 0, true)}
        {!!supportingImages.length && (
          <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateRows: supportingImages.length === 2 ? "1fr 1fr" : "1fr", gap: 1.25, minHeight: 0 }}>
            {supportingImages.map((image, index) => (
              <Box key={image.url} sx={{ minHeight: 0 }}>
                {imageButton(image, index + 1)}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Dialog
        open={galleryOpen}
        onClose={closeGallery}
        fullWidth
        maxWidth="lg"
        aria-label={`Thư viện ảnh ${roomName}`}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "calc(100% - 64px)" },
            height: { xs: "100dvh", md: "min(90dvh, 860px)" },
            maxHeight: "none",
            m: { xs: 0, md: 4 },
            borderRadius: { xs: 0, md: 1.5 },
            bgcolor: "#091a22",
            overflow: "hidden",
          },
        }}
      >
        <IconButton
          onClick={closeGallery}
          aria-label="Đóng thư viện ảnh"
          sx={{ position: "absolute", top: { xs: 12, md: 18 }, right: { xs: 12, md: 18 }, zIndex: 2, color: "#fff", bgcolor: "rgba(0,0,0,.5)", "&:hover": { bgcolor: "rgba(0,0,0,.7)" } }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {activeImage && activeImageIndex !== null && (
          <Box sx={{ height: 1, minHeight: 0, display: "flex", flexDirection: "column", color: "#fff" }}>
            <Box sx={{ position: "relative", flex: "1 1 auto", minHeight: 0, display: "grid", placeItems: "center", p: { xs: "64px 48px 42px", sm: "68px 72px 44px", md: "64px 88px 46px" }, overflow: "hidden" }}>
              {failedImages.has(activeImage.url) ? (
                <Stack alignItems="center" spacing={1.5} sx={{ color: "rgba(255,255,255,.72)" }}>
                  <BrokenImageOutlinedIcon sx={{ fontSize: 42 }} />
                  <Typography>Không thể tải ảnh này</Typography>
                </Stack>
              ) : (
                <Box
                  component="img"
                  src={activeImage.url}
                  alt={activeImage.alt || `${roomName} - ảnh ${activeImageIndex + 1}`}
                  onError={() => markImageAsFailed(activeImage.url)}
                  sx={{ display: "block", width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              )}

              {galleryImages.length > 1 && (
                <>
                  <IconButton onClick={showPreviousImage} aria-label="Ảnh trước" sx={{ position: "absolute", left: { xs: 8, sm: 18 }, top: "50%", color: "#fff", bgcolor: "rgba(0,0,0,.42)", "&:hover": { bgcolor: "rgba(0,0,0,.68)" } }}>
                    <ArrowBackIosNewRoundedIcon />
                  </IconButton>
                  <IconButton onClick={showNextImage} aria-label="Ảnh tiếp theo" sx={{ position: "absolute", right: { xs: 8, sm: 18 }, top: "50%", color: "#fff", bgcolor: "rgba(0,0,0,.42)", "&:hover": { bgcolor: "rgba(0,0,0,.68)" } }}>
                    <ArrowForwardIosRoundedIcon />
                  </IconButton>
                </>
              )}

              <Typography aria-live="polite" sx={{ position: "absolute", bottom: 12, px: 1.5, py: .5, borderRadius: 10, bgcolor: "rgba(0,0,0,.48)", fontSize: 14 }}>
                {activeImageIndex + 1} / {galleryImages.length}
              </Typography>
            </Box>

            <Box sx={{ flex: "0 0 auto", borderTop: "1px solid rgba(255,255,255,.14)", bgcolor: "#10252e", px: { xs: 2, md: 3 }, py: { xs: 1.5, md: 2 } }}>
              <Stack direction="row" spacing={1.25} sx={{ overflowX: "auto", overflowY: "hidden", pb: .5, scrollbarWidth: "thin", overscrollBehaviorInline: "contain" }}>
                {galleryImages.map((image, index) => {
                  const active = index === activeImageIndex;
                  return (
                    <Box
                      component="button"
                      type="button"
                      ref={(element: HTMLButtonElement | null) => {
                        thumbnailRefs.current[index] = element;
                      }}
                      key={image.url}
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`Xem ảnh ${index + 1}`}
                      aria-current={active ? "true" : undefined}
                      sx={{ flex: "0 0 auto", width: { xs: 72, sm: 92 }, height: { xs: 52, sm: 66 }, p: 0, border: active ? "2px solid #fff" : "2px solid transparent", borderRadius: .75, overflow: "hidden", bgcolor: "#20343d", opacity: active ? 1 : .62, cursor: "pointer", transition: "opacity .2s ease, border-color .2s ease", "&:hover": { opacity: 1 }, "&:focus-visible": { outline: "3px solid #61aee8", outlineOffset: 2 } }}
                    >
                      {failedImages.has(image.url) ? (
                        <BrokenImageOutlinedIcon sx={{ color: "rgba(255,255,255,.65)", mt: 1.5 }} />
                      ) : (
                        <Box component="img" src={image.url} alt="" onError={() => markImageAsFailed(image.url)} sx={{ width: 1, height: 1, display: "block", objectFit: "cover" }} />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default ImageGallery;
