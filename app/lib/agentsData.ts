import { BiNetworkChart } from "react-icons/bi";
import { PiGraduationCap } from "react-icons/pi";
import { PiPiggyBank } from "react-icons/pi";
import { PiCodeBold } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { MdAutoGraph } from "react-icons/md";

export const agents = [
  {
    title: "iResearcher",
    url: "/marketing",
    description: "for plan people allocation and people capacities",
    online: true,
    icon: BiNetworkChart,
  },
  {
    title: "Career Agent",
    url: "/recruitment",
    description: "Unlock your dream job with our  career agent.",
    online: true,
    icon: PiGraduationCap,
  },
  {
    title: "Investment Agent",
    url: "/test",
    description: "Investment opportunities with data-driven insights.",
    online: false,
    icon: PiPiggyBank,
  },
  {
    title: "Coding Agent",
    url: "/scrum",
    description: "Transform your coding experience",
    online: false,
    icon: PiCodeBold,
  },
  {
    title: "Data Analytics Agent",
    url: "/ritual",
    description: "Transform your data into actionable insights",
    online: false,
    icon: MdAutoGraph,
  },
  {
    title: "Document Agent",
    url: "/market",
    description: "Get the most out of your personal documents",
    online: false,
    icon: RiRobot2Line,
  },
];
