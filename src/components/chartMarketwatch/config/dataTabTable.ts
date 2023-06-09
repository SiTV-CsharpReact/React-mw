import { ITableTab } from "./interface.config";
import ImagePriceBoard from "../../../images/calendar-7-32.png";
import ImageBuySell from "../../../images/ppc-optimization-32.png";
import ImageHandShake from "../../../images/handshake-32.png";

export const DataTabTable: ITableTab[] = [
  {
    width: 24,
    height: 24,
    alt: "Tab danh mục",
    src: ImagePriceBoard,
    title: "Danh mục",
  },
  {
    width: 24,
    height: 24,
    alt: "Tab Top Mua/Bán",
    src: ImageBuySell,
    title: "Top Mua/Bán",
  },
  {
    width: 24,
    height: 24,
    alt: "Tab Khớp lệnh",
    src: ImageHandShake,
    title: "Khớp lệnh",
  },
];
