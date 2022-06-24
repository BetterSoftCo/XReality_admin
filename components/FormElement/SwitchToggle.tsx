import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

const SwitchToggle = (enabledValue: any) => {
  const [enabled, setEnabled] = useState(enabledValue)

  return (
    <>
      <Switch.Group>
        <div className="flex items-center">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? 'bg-red-400' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-[48px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400`}
          >
            <span
              className={`${
                enabled ? '-translate-x-7' : '-translate-x-1'
              } inline-block w-4 h-4 transform bg-blue-50 rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </>
  )
}

export default SwitchToggle
