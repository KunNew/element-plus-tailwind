const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");
import {
  cleanupSVG,
  importDirectorySync,
  isEmptyColor,
  parseColors,
  runSVGO,
} from "@iconify/tools";
import { compareColors, stringToColor } from "@iconify/utils/lib/colors";
const plugin = require("tailwindcss/plugin");

function loadFileSystem(dir) {
  // Import icons
  const iconSet = importDirectorySync(dir, {
    includeSubDirs: false,
  });

  // Validate, clean up, fix palette and optimise
  iconSet.forEachSync((name, type) => {
    if (type !== "icon") return;

    const svg = iconSet.toSVG(name);
    if (!svg) {
      // Invalid icon
      iconSet.remove(name);
      return;
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      cleanupSVG(svg);

      // Change color to `currentColor`
      // Skip this step if icon has hardcoded palette
      const blackColor = stringToColor("black");
      const whiteColor = stringToColor("white");
      parseColors(svg, {
        defaultColor: "currentColor",
        callback: (attr, colorStr, color) => {
          if (!color) {
            // Color cannot be parsed!
            throw new Error(
              `Invalid color: "${colorStr}" in attribute ${attr}`
            );
          }

          if (isEmptyColor(color)) {
            // Color is empty: 'none' or 'transparent'. Return as is
            return color;
          }

          // Change black to 'currentColor'
          if (compareColors(color, blackColor)) return "currentColor";

          // Remove shapes with white color
          if (compareColors(color, whiteColor)) return "remove";

          // Icon is not monotone
          return color;
        },
      });

      // Optimise
      runSVGO(svg);
    } catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    // Update icon
    iconSet.fromSVG(name, svg);
  });

  // Export
  return iconSet.export();
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        root_light: "#f5f6fa",
        root_dark: "#272727",
        page_light: "#ffffff",
        page_dark: "#18181B",
        primary: "var(--el-color-primary)",
        main: "var(--el-text-color-primary)",
        regular: "var(--el-text-color-regular)",
        secondary: "var(--el-text-color-secondary)",
        placeholder: "var(--el-text-color-placeholder)",
        light: "var(--el-color-info-light-9)",
        light_hover: "var(--el-color-info-light-8)",
      },
      height: {
        header: "64px",
        footer: "50px",
        tab: "var(--tab-view-height)",
        content: "var(--content-base-height)",
      },
      minHeight: {
        content: "var(--content-base-height)",
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: {
        app: loadFileSystem("./src/assets/icons"),
        ...getIconCollections([
          "mdi",
          "fa-solid",
          "fluent-emoji-flat",
          "ep",
          "ri",
        ]),
      },
    }),
    plugin(({ matchUtilities,addUtilities, addComponents, theme }) => {
      addUtilities({
        '.transition-width': {
          transitionProperty: 'width',
        },
      });
    }),
  ],
};
