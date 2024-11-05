import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type StatBoxProps = {
  numericValue: number;
  text: string;
  icon: any; // You may want to specify a stricter type here if possible
};

const StatBox: React.FC<StatBoxProps> = ({ numericValue, text, icon }) => {
  return (
    <div className='bg-[#1a262d] p-6 rounded-lg m-2 font-raleway w-full hover:shadow-lg'>
      <FontAwesomeIcon icon={icon} />
      <p className='text-xl text-gray-400'>{text}</p>
      <p className='text-4xl text-white font-bold'>{Math.floor(numericValue)}</p>
    </div>
  );
};

export default StatBox;
