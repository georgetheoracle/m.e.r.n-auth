import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.id]: event.target.value})
    };

    const handleSubmit = async(event) =>{
        event.preventDefault();
    try {
        setLoading(true);
        setError(false);
        const res = await fetch ('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false){
            setError(true);
            return;
        }
        navigate('/')
    } catch (error) {
         setLoading(false);
         setError(true);
    }
    };


  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
            <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'loading...' : 'Sign In'}</button>
        </form>
        <div className='flex gap-3 mt-5'>
            <p>Don&apos;t Have an account?</p>
            <Link to='/sign-up'> 
            <span className='text-blue-500'>Sign In</span>
            </Link>
        </div>
        <p className='text-red-500 mt-5'>{error && 'Invalid credentials, Use another Input'}</p>
    </div>
    </>
  )
}

