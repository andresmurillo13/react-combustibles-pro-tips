import reactLogo from '../../public/images/logo.svg'

export const MapLogo = () => {
    return (
        <img src={ reactLogo } 
             alt="React Logo" 
             style={{
                 position: 'fixed',
                 bottom: '20px',
                 right: '20px',
                 width: '130px'
             }}
        /> 
    )
}
