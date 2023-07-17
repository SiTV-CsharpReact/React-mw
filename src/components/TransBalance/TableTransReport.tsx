import React, { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../../store/configureStore";
import { formatNumber, formatNumberMarket } from "../../utils/util";
import axios from "axios";
import io from 'socket.io-client';

const TableTransReport = (props: any) => {
    const {assetReport } = useAppSelector((state) => state.assetReport);
    const [dataTable, setDataTable] = useState([])
    const [dataArrHSX, setArrHSX] = useState<any>([])
    const [dataArrHNX, setArrHNX] = useState<any>([])
    const [short, setShort] = useState(false);
    const [sort, setSort] = useState("asc");
    const [label, setLabel] = useState("");
    const { mode } = useAppSelector((state) => state.settingColorMode);
    useEffect(() => {
        if (props.short)
            setShort(!short);
    }, [props.short, short]);
    const handleSort = (key: string) => {
        setLabel(key);
        if (sort === "asc") {
            const sorted: any = [...dataTable].sort((a: any, b: any) => {
                if (a[key] === "string" && b[key] === "string") {
                    return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
                }
                return a[key] > b[key] ? 1 : -1;
            });
            setDataTable(sorted);
            setSort("desc");
        }
        if (sort === "desc") {
            const sorted: any = [...dataTable].sort((a: any, b: any) => {
                if (a[key] === "string" && b[key] === "string") {
                    return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
                }
                return a[key] < b[key] ? 1 : -1;
            });
            setDataTable(sorted);
            setSort("asc");
        }
    };
    useEffect(() => {
        let arr = assetReport?.Table1?.map((item: any) => item);
        const sorted = arr?.sort((a: any, b: any) =>
            a.ASTOCKCODE > b.ASTOCKCODE ? 1 : -1
        );
        setLabel("ASTOCKCODE");
        setDataTable(sorted);
    }, [assetReport]);
    useEffect(() => {
        dataTable?.forEach((item: any) => {
            const code = item?.Value.StockCode;
            fetchDataHSN(code);
            fetchDataHNN(code)
        });
    }, [dataTable]);
    const fetchDataHSN = async (code: string) => {
        try {
            const { data } = await axios.get(`https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${code}`)
             data.map((item: any) =>
             setArrHSX((prev: any[]) => [...prev, [item?.Info?.[0][1], "HSX", item?.Info?.[31][1]]])
        )
       } catch (error : any) {
        if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }
       }
    }
    const fetchDataTable = async () => {
       try {
         const { data } = await axios.get("http://localhost:3111/Data")
         setDataTable(data)
       } catch (error) {
        console.log("loi day ne ")
       }
    }
    const fetchDataHNN = async (code: string) => {
      try {
          const { data } = await axios.get(`https://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=${code}`)
          data.map((item: any) =>
          setArrHNX((prev: any[]) => [...prev, [item?.Info?.[12][1], "HNX", item?.Info?.[31][1]]])
        )
      } catch (error) {
        console.log("loi day ne hiu hiu ")
      }
    }
    useEffect(() => {
        fetchDataTable()
    }, [dataTable])
      const mergedData = dataTable?.map((item: any) => {
        const dataHSXItem = dataArrHSX?.filter((dataItem: any) => dataItem[0] === item.Key);
        const dataHNXItem = dataArrHNX?.filter((dataItem: any) => dataItem[0] === item.Key);

        return {
            ...item,
            dataItem: dataHSXItem?.length !== 0 ? dataHSXItem[0] : dataHNXItem?.length !== 0 ? dataHNXItem[0] : []
        };
    });
    useEffect(() => {
        const socketHNX = new WebSocket(
            "wss://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=yWr50kq6iuFWJzRwhs7GR3bBYG%2Blpj7laF9cuG7oMsc4RLrmhYu9N%2Fco3Vl68KnUNXyGX7c5uuHmqFw1J1P1ClWXvR4w%2BXZlFMtR33yYxNAdiR%2FXCJWS%2FxL%2BNGhHlIpB&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=4"
        );
        const socketHSX = new WebSocket(
            "wss://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=Ie5DGpXarjClrWZQsIjTMksj0n592Jg8BUV9ChfmtVfpZPN%2BU8aMlfo5FVEDmh%2BmsAw3qgXN3peJW%2FeT6K7sNohOuAT6LC3KdklEDxpPxalgGUkNKF30LWa612toMv19&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=2"
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
            updateQuote(event.data)
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
     const updateQuote = (objRealtime: string) => {
        try {
            const dataHNXRealTime = JSON.parse(objRealtime);
            if (dataHNXRealTime && dataHNXRealTime.M) {
                const dataM = dataHNXRealTime.M;
                console.log("firstQuote", dataM);
                const arrDatas: any[] = [];
                dataM.forEach((dataLT: any) => {
                    const changeData = JSON.parse(dataLT.A[0].Change);
                    if (Array.isArray(changeData)) {
                        arrDatas.push(changeData);
                    }
                });
                setArrHSX((prevArrHSX: any[]) => prevArrHSX.concat(arrDatas));
                console.log(arrDatas, "change");
            }
        } catch (error) {
            console.error('Error parsing real-time data:', error);
        }
    };
    let totalSum = 0;
    let totalGoc = 0;
    let toTalDk = 0;
    let tongtoTalPC = 0;
    return (
        <div></div>
    );
};
export default TableTransReport;
