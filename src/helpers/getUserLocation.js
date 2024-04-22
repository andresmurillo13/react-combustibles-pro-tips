
import Swal from 'sweetalert2';

export const getUserLocation = async () => {

    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.longitude, coords.latitude])
            },
            (error) => {
                Swal.fire('Error de ubicación', error.message, 'error');
                reject()
            }
        )
    })
}
