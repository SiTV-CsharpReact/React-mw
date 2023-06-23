import { useAppSelector } from "../../store/configureStore";
import TbodyAssetValue from "./TbodyAssetValue";

const TableAssetValue = () => {
  // const { assetReport } = useAppSelector((state) => state.report);
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const { assetReport } = useAppSelector((state) => state.assetReport);
  return (
    <div className={`report__tabcondition__left ${mode}-bg`}>
      <div>
        {assetReport?.Table?.map((item: any, index: number) => (
          <table key={index} className="w-full bg-transparent">
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
