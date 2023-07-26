import React, { useEffect, useState } from "react";
// import { DataStockCode } from "../../models/stockCode";
import agent from "../../api/agent";
import { News } from "../../models/new";
import { getCookie } from "../../utils/util";
import Slider from "react-slick";
import { Tooltip } from "@mui/material";
import { useAppSelector } from "../../store/configureStore";
// import 'swiper/modules/...';
// import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
const settings = {
  // dots: true,
  //     infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,

  vertical: true,
  verticalSwiping: true,
};
// import './styles.css';
const NewsPopup = () => {
  const cookie = getCookie("aspfpt_language");
  // console.log(cookie);
  const [dataNew, setDataNew] = useState<News | null>(null);
  const { code } = useAppSelector((state) => state.popupTable);

  useEffect(() => {
    const RP = {
      action: "news",
      symbol: code,
    };
    const fetchDataTableBasic = async () => {
      const dataTable = await agent.dataTableBasic.postFormData(RP);
      setDataNew(dataTable.data);
      // console.log(dataTable.data);
    };
    fetchDataTableBasic();
  }, [code]);

  return (
    <div className="mt-[5px]">
      <div className="px-[5px] py-[2px] rounded-t-sm text-[#929292] text-xs font-bold bg-bgPopup border-b border-bgBoxPopupBorder ">
        <span className="px-[5px]">TIN TỨC</span>
      </div>
      <div>
        <ul id="ulNews" className="pu-ul-news">
          <Slider {...settings} className="color-white">
            {cookie === "VN"
              ? dataNew?.VN?.map((data, index) => (
                  <Tooltip
                    title={`${data.Title} (${data.ShowTime} ${data.ShowDate})`}
                    key={index}
                  >
                    <li>
                      <div>
                        <a
                          className="color-white"
                          href={`http://www.fpts.com.vn/${data.Path} `}
                          // title="BVSC CBTT Quyết định của Tổng Giám đốc về việc Đầu tư chứng chỉ tiền gửi (15:38:05 09/02/2023)"
                        >
                          {data.Title}
                        </a>
                      </div>
                    </li>
                  </Tooltip>
                ))
              : dataNew?.EN?.map((data, index) => (
                  <li key={index}>
                    <div>
                      <Tooltip
                        title={`${data.Title} (${data.ShowTime} ${data.ShowDate})`}
                      >
                        <a
                          className="color-white"
                          href={`http://www.fpts.com.vn/${data.Path} `}
                          // title="BVSC CBTT Quyết định của Tổng Giám đốc về việc Đầu tư chứng chỉ tiền gửi (15:38:05 09/02/2023)"
                        >
                          {data.Title}
                        </a>
                      </Tooltip>
                    </div>
                  </li>
                ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
};

export default NewsPopup;
