export interface ShiftVisual {
  background: string;
  border: string;
  text: string;
  accent: string;
}

const neutralShiftVisual: ShiftVisual = {
  background: "#F2F4F7",
  border: "#D0D5DD",
  text: "#475467",
  accent: "#98A2B3",
};

const shiftVisuals: Record<string, ShiftVisual> = {
  MORNING: {
    background: "#FFF8E7",
    border: "#F0D9A4",
    text: "#805A16",
    accent: "#D69B32",
  },
  AFTERNOON: {
    background: "#FFF2E8",
    border: "#EDC9AD",
    text: "#8D4E25",
    accent: "#CF7A3D",
  },
  NIGHT: {
    background: "#EEF1F8",
    border: "#CDD5E6",
    text: "#344B72",
    accent: "#657AA3",
  },
  OFFICE: {
    background: "#ECF7F4",
    border: "#BFE1D7",
    text: "#276957",
    accent: "#4B927F",
  },
};

shiftVisuals.ADMINISTRATIVE = shiftVisuals.OFFICE;

export const getShiftVisual = (code: string): ShiftVisual =>
  shiftVisuals[code.toUpperCase()] ?? neutralShiftVisual;
