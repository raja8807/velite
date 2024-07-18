import { Outfit,Lilita_One as HeadFont} from "next/font/google";
// import { Inder as Be_Vietnam_Pro } from "next/font/google";

const outfit = Outfit({
  weight: ["400"],
  subsets: ["latin"],
});
const headFont = HeadFont({
  weight: ["400"],
  subsets: ["latin"],
});

const fonts = {
  MainFont: outfit.className,
  HeadFont: headFont.className,
};
export default fonts;
