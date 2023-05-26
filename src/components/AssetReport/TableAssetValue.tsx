import { useAppSelector } from "../../store/configureStore";
import TbodyAssetValue from "./TbodyAssetValue";

const TableAssetValue = () => {
  const { assetReport } = useAppSelector((state) => state.assetReport);

  return (
    <div className="report__tabcondition__left">
      <div>
        {assetReport?.Table?.map((item: any, index: number) => (
          <table key={index}>
            <TbodyAssetValue table="tb1" item={item} />
            <TbodyAssetValue table="tb2" item={item} />
            <TbodyAssetValue table="tb3" item={item} />
            <TbodyAssetValue item={item} />
          </table>
        ))}
      </div>
    </div>
  );
};

export default TableAssetValue;
