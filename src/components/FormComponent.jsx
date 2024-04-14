import { useFormik } from 'formik';
import React from 'react'
import { FileParser } from '../utilis/FileParser';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { loggedUserAction } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';
function FormComponent() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const VALID_TYPE = ['image/png','image/jpg','image/jpeg'];

    const KB = 1024;
    const MB = KB*1024;

const formik = useFormik({
    initialValues:{
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        gender:'',
        image:'',
        birthDate:'',
    },

    // 2. Vlidacija YUP
    validationSchema:Yup.object({
        firstName:Yup.string().required('Field is required'),
        lastName:Yup.string().required('Field is required'),
        email:Yup.string().email('Invalid email').required('Field is required'),
        password:Yup.string().min(5).required('Field is required'),
        gender:Yup.string().required('Field is required'),
        birthDate:Yup.string().required('Field is required'),
        image:Yup.mixed()
                .required('Image is required')
                .test('fileSize','Wrong file size',(value)=>value.size<MB*2)
                .test('fileType','Wrong file type', (value) => VALID_TYPE.includes(value.type))
    }),

    // 3. onSubmit 

    onSubmit: (values)=>{
     
        FileParser(values.image)
        .then((res)=>{
            //Posalji mi object sa image: string:done
            
            dispatch(loggedUserAction({...values,image:res}))
            navigate('/')
        })
        .catch(err=>console.log(err))
        
        formik.resetForm();
    },
});

    const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];

  return <form className='bg-slate-300 p-5 rounden-lg mt-5  flex flex-col gap-5 w-full md:w-[500px] md:mx-auto '  onSubmit={formik.handleSubmit}>
    <div className='flex flex-col'>
        <label className='text-[14px] text-gray-600' htmlFor="firstname">FirstName
        <span className='text-[14px] text-red-500 ml-3' >{showError('firstName')}</span></label>
        <input id='firstname' type="text" placeholder='Insert firstname'
        name='firstName' value={formik.values.firstName}
        onChange={formik.handleChange}
        className='outline-none px-[16px] py-[8px] rounded-lg'
        />
    </div>
    <div className='flex flex-col'>
        <label htmlFor="lastname"
        className='text-[14px] text-gray-600'>LastName
         <span className='text-[14px] text-red-500 ml-3' >{showError('lastName')}</span></label>
        <input id='lastname' type="text" placeholder='Insert lastname'
        name='lastName'
        value={formik.values.lastName}
        onChange={formik.handleChange}
        className='outline-none px-[16px] py-[8px] rounded-lg'
        />
    </div>

    <div className='flex flex-col'>
        <label className='text-[14px] text-gray-600' htmlFor="email">Email
        <span className='text-[14px] text-red-500 ml-3' >{showError('email')}</span></label>
        <input id='email' type="text" placeholder='Insert email'
        name='email' value={formik.values.email}
        onChange={formik.handleChange}
        className='outline-none px-[16px] py-[8px] rounded-lg'
        />
    </div>
    <div className='flex flex-col'>
        <label htmlFor="password"
        className='text-[14px] text-gray-600'>Password  <span className='text-[14px] text-red-500 ml-3' >{showError('password')}</span>
      </label>
        <input id='password' type="password" placeholder='Insert password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        className='outline-none px-[16px] py-[8px] rounded-lg'
        />
    </div>

    <div className='flex flex-col'>
        <label className='text-[14px] text-gray-600' htmlFor="gender">Gender
        <span className='text-[14px] text-red-500 ml-3' >{showError('gender')}</span></label>
        <select
         id='gender'
         name='gender'
         value={formik.values.gender}
         onChange={formik.handleChange}
         className='outline-none px-[16px] py-[8px] rounded-lg'
            >
            <option defaultChecked value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>

        <div className='flex flex-col'>
        <label htmlFor="image"
        className='text-[14px] text-gray-600'>Image
          <span className='text-[14px] text-red-500 ml-3' >{showError('image')}</span></label>
        <input id='image' type="file" placeholder='Insert password'
        name='image'
        
        onChange={(e)=>{console.log(formik.setFieldValue(e.target.name,e.target.files[0]))}}
        className='outline-none px-[16px] py-[8px] rounded-lg'
        />
    </div>
        <div className='flex flex-col'>
        <label htmlFor="birthDate"
        className='text-[14px] text-gray-600'>Birthday</label>
        <input id='birthDate' type="date"
        name='birthDate'
        value={formik.values.birthDate}
        onChange={formik.handleChange}
        className='outline-none px-[16px] py-[8px] rounded-lg'
        />
    </div>
    </div>
    
    <button className='bg-green-400 text-black px-[16px] py-[8px] rounded-lg mt-5' type='submit'>Register me</button>
  </form>
  
}

export default FormComponent