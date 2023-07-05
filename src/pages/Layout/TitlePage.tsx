import React from 'react'
import { useAppSelector } from '../../store/configureStore';
import { Tooltip } from '@mui/material';


interface Props {
  content?: string;
  Title ? :string;
  Icon ? :boolean;
  LinkPage ? : string;
}

const TitlePage:React.FC<Props> = ({content,Title,Icon,LinkPage}:Props) => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  return (
    <div className="nav__content__top">
    <div className={`w-full bg-[#dedede] ${mode}-bg`}>
      <ul className="flex ml-[127px] mb-0 mt-0 navigation">
        <li className="text-sm py-[10px] pr-[10px] pl-0 text-[#007db7]" >
           {content ?  content : "Chưa đăng ký dịch vụ" }  <label htmlFor="" >
           {Icon === true ?  <Tooltip title={Title ? Title : ""}>
            <a href={LinkPage}  target="_blank" > <i className="fa fa-info-circle" aria-hidden="true"  id="iconPage"></i></a> 
            
            </Tooltip> : "" } 
        </label>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default TitlePage