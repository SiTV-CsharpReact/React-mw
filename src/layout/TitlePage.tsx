import React from 'react'
import { useAppSelector } from '../store/configureStore';

interface Props {
  content?: string;
}

const TitlePage:React.FC<Props> = ({content}) => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  return (
    <div className="nav__content__top">
    <div className={`w-full bg-[#dedede] ${mode}-bg`}>
      <ul className="flex ml-[127px] mb-0 mt-0 navigation">
        <li className="text-sm py-[10px] pr-[10px] pl-0 text-[#007db7]" >
        {content}
        </li>
      </ul>
    </div>
  </div>
  )
}

export default TitlePage