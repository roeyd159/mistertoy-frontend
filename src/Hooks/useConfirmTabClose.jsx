import { useState, useEffect } from 'react'

export function useConfirmTabClose() {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    useEffect(() => {
        function handleBeforeUnload(ev) {
            if (hasUnsavedChanges) {
                ev.preventDefault()
                ev.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [hasUnsavedChanges])

    return setHasUnsavedChanges
}