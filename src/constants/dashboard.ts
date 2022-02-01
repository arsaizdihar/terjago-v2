import { faBloggerB } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarTimes,
  faFolderOpen,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDoubleRight,
  faBookReader,
  faCalendarCheck,
  faCheckCircle,
  faHome,
  faInfoCircle,
  faStream,
} from "@fortawesome/free-solid-svg-icons";

export const adminMenu = [
  {
    href: "/dashboard/admin/tryout",
    name: "Tryout",
    icon: faStream,
  },
  {
    href: "/dashboard/admin/ujian",
    name: "Ujian",
    icon: faBookReader,
  },
  {
    href: "/dashboard/admin/files",
    name: "File Manager",
    icon: faFolderOpen,
  },
];

export const mainMenu = [
  {
    href: "/",
    name: "Home",
    icon: faHome,
    exact: true,
  },
  {
    href: "https://blog.terjago.id/",
    name: "Blog",
    icon: faBloggerB,
  },
];

export const materiMenu = [
  {
    href: "/dashboard/materi",
    name: "Info",
    icon: faInfoCircle,
    public: true,
    exact: true,
  },
  {
    href: "/dashboard/materi/files",
    name: "Files",
    icon: faFolderOpen,
    public: true,
  },
];

export const tryoutMenu = [
  {
    href: "/dashboard/tryout/tersedia",
    name: "Tersedia",
    icon: faAngleDoubleRight,
  },
  {
    href: "/dashboard/tryout/aktif",
    name: "Aktif",
    icon: faCalendarCheck,
  },
  {
    href: "/dashboard/tryout/selesai",
    name: "Selesai",
    icon: faCheckCircle,
  },
  {
    href: "/dashboard/tryout/terlewat",
    name: "Terlewat",
    icon: faCalendarTimes,
  },
];
