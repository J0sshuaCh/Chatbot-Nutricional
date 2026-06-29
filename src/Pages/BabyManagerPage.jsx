import React, { useState } from 'react'
import { ProfileBabyCard } from '../components/card/ProfileBabyCard'
import { AnalisisBabyCard } from '../components/card/AnalisisBabyCard'
import { AlergiasBabyCard } from '../components/card/AlergiasBabyCard'
import { RecetasBabyCard } from '../components/card/RecetasBabyCard'
import { useNavigate } from 'react-router-dom'

export const BabyManagerPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2  gap-5 py-6  items-stretch'>

        <div
          onClick={() => navigate("/babies")}
          className='bg-white rounded-2xl shadow-lg border border-gray-200 p-5  overflow-y-auto transition-all duration-300 cursor-pointer'
        >
          <ProfileBabyCard />
        </div>

        <div
          onClick={() => navigate("/medical-history")}
          className=' bg-white rounded-2xl shadow-lg border border-gray-200 p-5  overflow-y-auto transition-all duration-300 cursor-pointer'
        >
          <AnalisisBabyCard />
        </div>

        <div
          onClick={() => navigate("/allergies")}
          className='bg-white rounded-2xl shadow-lg border border-gray-200 p-5  overflow-y-auto transition-all duration-300 cursor-pointer'
        >
          <AlergiasBabyCard />
        </div>

        <div
          onClick={() => navigate("/recipes")}
          className='bg-white rounded-2xl shadow-lg border border-gray-200 p-5    overflow-y-auto transition-all duration-300 cursor-pointer'
        >
          <RecetasBabyCard />
        </div>
      </div>
    </>
  )
}