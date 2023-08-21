import { HiOutlineHome } from "react-icons/hi";
import { FiMapPin, FiThumbsUp } from "react-icons/fi";
import { BiSmile } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";

export const sidebarLinks = [
  {
    icon: HiOutlineHome,
    label: "Home",
    route: "/home",
  },
  {
    icon: FiMapPin,
    label: "Maps",
    route: "/maps",
  },
  {
    icon: AiOutlinePlusCircle,
    label: "Feed",
    route: "/feed",
  },
  {
    icon: FiThumbsUp,
    label: "Recommend",
    route: "/recommend",
  },
  {
    icon: BiSmile,
    label: "User",
    route: "/user",
  },
  {
    icon: IoIosSearch,
    label: "Search",
    route: "/search",
  },
  {
    icon: IoMdNotificationsOutline,
    label: "Notification",
    route: "/notification",
  },
];
