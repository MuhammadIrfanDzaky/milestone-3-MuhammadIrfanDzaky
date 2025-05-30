'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CartIcon({ count, animateIcon, animateBadge }) {
  return (
    <motion.svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animateIcon ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
    >
      {/* Cart body */}
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Badge circle at top-right */}
      {count > 0 && (
        <motion.g
          animate={animateBadge ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Adjust cx,cy to move badge further into top-right */}
          <circle cx={19} cy={4.5} r={4.5} fill="#EF4444" />
          <text
            x={19}
            y={7}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="7"
            fill="#fff"
            fontWeight="bold"
          >
            {count}
          </text>
        </motion.g>
      )}
    </motion.svg>
  )
}
