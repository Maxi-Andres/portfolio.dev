import { useState } from 'react'
// import { IconBrush } from '@tabler/icons-react';
import { IconPaint } from '@tabler/icons-react';
import { IconInfoCircle } from '@tabler/icons-react';


const BentoSettings = () => {
  const [theme, setTheme] = useState('Frappe')
  const [MouseEffect, setMouseEffect] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#f5c2e7')

  const themes = ['Latte', 'Frappe', 'Macchiato', 'Mocha']
  const colors = [
    '#f5e0dc', '#f2cdcd', '#f5c2e7', '#cba6f7', 
    '#f38ba8', '#eba0ac', '#fab387', '#f9e2af',
    '#a6e3a1', '#94e2d5', '#89dceb', '#74c7ec',
    '#89b4fa', '#b4befe'
  ]

  return (
    <div className="flex py-10 flex-col items-center w-full px-5 sm:px-10 lg:px-0">

        <div className="flex items-start w-full max-w-6xl mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold text-neutral-400">Choose Your Vibe</h2>
        </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Theme Selector - Ocupa 1 espacio */}
        <div className="glass-effect border border-neutral-800 rounded-2xl p-6 overflow-hidden 
        hover:border-neutral-600 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl"><IconPaint stroke={1.5} /></span>
            <h3 className="text-xl font-semibold text-white">Theme</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4 ">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`text-center py-2 px-4 rounded-2xl hover:text-white transition-colors duration-300 
                  cursor-pointer selection:bg-amber-50 border ${
                  theme === t 
                    ? "text-white bg-white/10 border border-neutral-600" 
                    : "text-neutral-400 hover:text-neutral-200 border-neutral-800 "}`}
              >{t}</button>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 ">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer justify-self-center ${
                  selectedColor === color ? 'ring-1 ring-neutral-400 ring-offset-2 ring-offset-[#181825]' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <button
            onClick={() => setMouseEffect(!MouseEffect)}
            className="mt-4 w-full flex items-center gap-2 px-4 py-2.5  hover:bg-white/10 rounded-lg 
              transition-all duration-300 cursor-pointer"
          >
            {/* <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              MouseEffect ? 'bg-[#89b4fa] border-[#89b4fa]' : 'border-[#6c7086]'
            }`}>
              {MouseEffect && <span className="">✓</span>}
            </div> */}
            <span className="">Mouse effect {MouseEffect ? 'on' : 'off'}</span>
          </button>
        </div>

        {/* Let's Connect - Ocupa 1 espacio */}
        <div className="glass-effect border border-neutral-800 rounded-2xl p-6 overflow-hidden 
        hover:border-neutral-600 transition-all duration-300">
          <div className='flex justify-end'>
            <button className=''><IconInfoCircle stroke={1.5} /></button>
          </div>
          <div> hola </div>

        </div>

        {/* Recent Commits - Ocupa 2 espacios */}
        <div className="glass-effect md:col-span-2 border border-neutral-800 rounded-2xl p-6 overflow-hidden 
        hover:border-neutral-600 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">Recent Commits</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BentoSettings