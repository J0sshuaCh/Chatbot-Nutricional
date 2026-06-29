import {
    LayoutDashboard,
    Baby,
    ClipboardPlus,
    TriangleAlert,
    BookOpenText
} from "lucide-react"

export const navLinks = [
    { id: 1, name: "Dashboard", path: "/manager-baby", icon: LayoutDashboard },
    { id: 2, name: "Bebés", path: "/babies", icon: Baby },
    { id: 3, name: "Controles", path: "/medical-history", icon: ClipboardPlus },
    { id: 4, name: "Alergias", path: "/allergies", icon: TriangleAlert },
    { id: 5, name: "Recetas", path: "/recipes", icon: BookOpenText },
];
