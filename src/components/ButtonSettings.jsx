
import { FiSettings } from 'react-icons/fi';
import { useStateContext } from '../contexts/ContextProvider';

export const ButtonSettings = () => {

    const { setThemeSettings, currentColor } = useStateContext()
    return (
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>

            <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
                <FiSettings />
            </button>

        </div>
    )
}
