
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../hooks';

import 'sweetalert2/dist/sweetalert2.min.css';

const loginFormFields = {

    loginEmail: '',
    loginPassword: ''
}


export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

    const loginSubmit = (event) => {

        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });

    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error al iniciar sesión', errorMessage, 'error');
        }

    }, [errorMessage])

    return (
        <div className="2xl:container h-screen m-auto">
            <div className="fixed inset-0 w-7/12 md:block" hidden>

                <video
                    className="w-full h-full object-cover"
                    loop
                    autoPlay
                    muted  // Agrega este atributo
                    src="../public/videos/video.mp4"
                    poster="../public/images/bg.jpg"
                ></video>
            </div>
            <div className="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block" hidden></div>
            <div className="relative h-full ml-auto lg:w-6/12">
                <div className="m-auto py-12 px-6 sm:pr-20 xl:w-10/12">
                    <div className="space-y-4">
                        <a href="">
                            <img src="../public/images/logo.svg" className="w-45" alt="drivstoff" />
                        </a>
                        <p className=" text-lg text-black text-center font-extrabold ">Bienvenidos al Control de Combustibles</p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">

                    </div>



                    <form onSubmit={loginSubmit} className="space-y-6 py-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Correo electronico"
                                autoComplete="username"
                                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>

                        <div className="flex flex-col items-end">
                            <input
                                type="password"
                                autoComplete="current-password"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                                onChange={onLoginInputChange}
                            />
                            {/* <button type="reset" className="w-max p-3 -mr-3">
                                <span className="text-sm tracking-wide text-blue-600">Forgot password ?</span>
                            </button> */}
                        </div>

                        <div>
                            <button className="w-full px-6 py-3 rounded-xl bg-sky-500 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                                <span className="font-semibold text-white text-lg">Ingresa</span>
                            </button>
                        </div>
                    </form>

                    <div className="border-t pt-12">
                        <div className="space-y-2 text-center">
                            <img src="../public/images/logo.svg" className="h-13 m-auto " alt="" />
                            <span className="block text-sm tracking-wide text-gray-500">
                                Software Control de Combustibles
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default LoginPage;