import { useAppSelector } from "../../store/configureStore";
import TbodyAssetValue from "./TbodyAssetValue";

const TableAssetValue = () => {
  const { assetReport } = useAppSelector((state) => state.report);
  const mode = "light";

  return (
    <div className={`report__tabcondition__left ${mode}-bg`}>
      <div>
        {assetReport?.Table?.map((item: any, indx: number) => (
          <table key={indx}>
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
