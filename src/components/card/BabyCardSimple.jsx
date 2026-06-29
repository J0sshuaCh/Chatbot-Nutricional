import React from 'react'

import { BabyNina } from '../icon/BabyNina';
import { BabyNino } from '../icon/BabyNino';
import { useBabySelectStore } from '../../store/BabySelectStore';

// Avatar de respaldo en caso de que el bebé no tenga foto


export const BabyCardSimple = ({ baby }) => {
    const { babySelect, setBabySelect } = useBabySelectStore();
    const isSelected = babySelect?.id_bebe === baby.id_bebe;

    return (
        <button
            type="button"
            onClick={() => setBabySelect(baby)}
            className={`
                flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all
                w-28 sm:w-32 shadow-md cursor-pointer
                ${isSelected
                    ? 'border-[#7c3aed] bg-violet-50'
                    : 'border-gray-200  bg-white hover:border-violet-300'
                }
            `}
        >
            <div className=" ">
                <div className={`w-24 h-24  rounded-full border-4 border-white flex items-center justify-center shadow-sm overflow-hidden transition-colors duration-300`}>
                    {baby?.genero === 'F' ? <BabyNina className="w-16 h-16" /> : <BabyNino className="w-16 h-16" />}
                </div>
            </div>

            <span
                className={`
                    text-sm sm:text-base font-medium truncate w-full text-center
                    'text-slate-700
                `}
            >
                {baby.name}
            </span>
        </button>
    );
};