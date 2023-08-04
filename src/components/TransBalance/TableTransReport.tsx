import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/configureStore";
import axios from "axios";
import TableTransReportFull from "./TableTransReportFull";
import TableTransReportShort from "./TableTransReportShort";
import { MyContext } from "./TransBalance";

const TableTransReport = (props: any) => {
  const [dataTable, setDataTable] = useState({
    dataTableHSX: [],
    dataTableHNX: [],
  });
  const value = useContext(MyContext);
  const [data, setData] = useState<any>([]);
  const [dataReal, setDataReal] = useState<any>({});
  const [sort, setSort] = useState("asc");
  const [label, setLabel] = useState("StockCode");

  const arrDataReal = useMemo(() => {
    const allData = dataTable.dataTableHSX.concat(dataTable.dataTableHNX);
    const array: any = data?.map((key: any) => {
      const existItem: any = allData?.find(
        (item: any) => item[0][1] === key.Key
      );
      if (existItem) {
        return {
          ...key.Value,
          MarketPrice:
            existItem[0][1] === dataReal?.RowID
              ? Number(dataReal?.Info) * 1000
              : Number(existItem[31][1]) === 0
              ? Number(existItem[1][1]) * 1000
              : Number(existItem[31][1]) * 1000,
          RowID: existItem[0][1],
        };
      } else {
        return {
          ...key.Value,
          // RowID: existItem[0][1],
        };
      }
    });

    return array?.sort((a: any, b: any) =>
      a.StockCode > b.StockCode ? 1 : -1
    );
  }, [data, dataReal?.Info, dataReal?.RowID, dataTable.dataTableHNX, dataTable.dataTableHSX]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3111/Data`);
      // setKey(
      //   (prev: string) =>
      //     prev + res.data.Data?.map((key: any) => key.Key).toString()
      // );
      setData(res.data.Data);
    };
    fetchData();
    // const intervalId = setInterval(fetchData, 10000);
    // return () => clearInterval(intervalId);
  }, []);

  //call data từ redis
  useEffect(() => {
    const fetchDataTable = async () => {
      try {
        const v_key = data?.map((key: any) => key.Key).toString();
        if (v_key !== "") {
          const resHSX = await axios.get(
            `https://eztrade.fpts.com.vn/hsx/data.ashx?s=quote&l=${v_key}`
          );
          const resHNX = await axios.get(
            `https://eztrade.fpts.com.vn/hnx/data.ashx?s=quote&l=${v_key}`
          );
          const arrStockHSX = resHSX.data?.map((item: any) => item?.Info);
          const arrStockHNX = resHNX.data?.map((item: any) => {
            return item?.Info?.sort((a: any, b: any) => a[0] - b[0]);
          });
          setDataTable({
            ...dataTable,
            dataTableHSX: arrStockHSX,
            dataTableHNX: arrStockHNX,
          });
        }
      } catch (error) {
        console.log("loi day ne ");
      }
    };
    fetchDataTable();
  }, [data]);

  useEffect(() => {
    const socketHNX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=kTFRm%2BeMNmbiax8RveWxy0GAoLdm7zLDyeu6Sl%2B9XOzeBCLGUvK7xj9%2FmblOu85GVsX%2Ftr7rLY%2BWirAoK2qmI1uDhMF6LvyLGtqaKvHh4VsFqmUdF8qYN72e%2B4VdDB%2Fk&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=6"
    );
    const socketHSX = new WebSocket(
      "wss://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=UlkClbrQp5fHuOoHMIlHwUlE%2BJZXXiEtEf5oBjp0D116uKZ6AsRQQKnaIFBl5Zl%2BW9v6Cg8n6NehzJToMUgSRdJadlfLITar%2FgczCTqX4C27Ews%2BZiDMTl%2FEH7yHCX2D&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=8"
    );
    socketHSX.onopen = () => {
      console.log("WebSocket connection HSX established.");
    };
    socketHNX.onopen = () => {
      console.log("WebSocket connection HNX established.");
    };

    socketHSX.onmessage = (event) => {
      updateQuote(event.data);
    };
    socketHNX.onmessage = (event) => {
      updateQuote(event.data);
    };
    socketHSX.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    socketHNX.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    return () => {
      socketHSX.close();
      socketHNX.close();
    };
  }, []);

  const updateQuote = (objRealtime: any) => {
    const dataHNXRealTime = JSON.parse(objRealtime);
    if (dataHNXRealTime.M?.length !== 0) {
      dataHNXRealTime?.M?.map((data: any) => {
        const converData = JSON.parse(data?.A[0]?.Change);
        if (Array.isArray(converData)) {
          converData?.map((e: any) => {
            return e?.Info?.map((i: any) => {
              if (i[0] === 31) {
                const valueRealTime = {
                  RowID: e.RowID,
                  Info: i[1],
                  Col: i[0],
                };

                setDataReal(valueRealTime);
              }
            });
          });
        }
      });
    }
  };

  const handleSort = (key: string) => {
    setLabel(key);
    if(sort === 'asc'){
      setSort('desc');
    }
    if(sort === 'desc'){
      setSort('asc')
    }
  };

  return (
    <div className="asset__report__BCTH__tbl">
      {props.short ? (
        <TableTransReportShort
          renderReport={arrDataReal}
          label={label}
          sort={sort}
        />
      ) : (
        <TableTransReportFull
          renderReport={arrDataReal}
          label={label}
          sort={sort}
          handleSort={handleSort}
        />
      )}
    </div>
  );
};
export default TableTransReport;
