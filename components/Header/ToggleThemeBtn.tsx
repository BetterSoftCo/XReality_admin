import { useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'

const SwitchBtn = () => {
  const [theme, setTheme] = useState(false)

  return (
    <>
      {/* Theme toggler*/}
      <button
        className="rounded-md focus:outline-none focus:shadow-outline-purple mr-2"
        onClick={() => setTheme(!theme)}
        aria-label="Toggle color mode"
      >
        {theme ? (
          <SunIcon
            className="w-9 h-9 p-1.5 border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
            aria-hidden="true"
          />
        ) : (
          <MoonIcon
            className="w-9 h-9 p-1.5 border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
            aria-hidden="true"
          />
        )}
      </button>
    </>
  )
}

export default SwitchBtn
