export const NAVBAR_HEIGHT = 80;
/** Slimmer navbar on phones so windows get more reading space. */
export const NAVBAR_HEIGHT_MOBILE = 52;
export const TASKBAR_HEIGHT = 40;
/** Windows can't be dragged above this line (keeps them below the navbar). */
export const DESKTOP_TOP_MARGIN = NAVBAR_HEIGHT;

export const navbarHeight = (isMobile: boolean) => (isMobile ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT);
