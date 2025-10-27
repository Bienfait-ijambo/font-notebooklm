
import GoogleIcon from '@/assets/google.png'

function LoginPage() {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/auth/google'
    };
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
                        Welcome Back
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Sign in to continue to your account
                    </p>
        <div className="bg-primary text-primary-foreground h-8 mt-10">Hello</div>

                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center mb-10 cursor-pointer justify-center w-full gap-3 px-2 py-3 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition bg-white"
                    >
                        <img src={GoogleIcon} alt="logo" width={25} />
                        Continue with Google
                    </button>
                </div>

                

            </div>
        </>
    )
}

export default LoginPage
