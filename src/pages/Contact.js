import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {AiFillMail} from 'react-icons/ai'

const Contact = () => {
    const form = useRef();
    const [emailSent, setEmailSent] = useState(false);


    const sendEmail = (e) => {
      e.preventDefault();
      
  
      emailjs.sendForm('service_qqnirgm', 'template_f8fbaz4', form.current, 'tPepm3RSIO6xKdtEv')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        setEmailSent(true);
    };



  useEffect(() => {
    if (emailSent) {
      // Hide the score after 3 seconds
      const timer = setTimeout(() => {
        setEmailSent(false);
      }, 2000);

      // Clear the timer if the component unmounts or if showScore is updated
      return () => clearTimeout(timer);
    }
  }, [emailSent]);

  return (

    <div className='flex items-center justify-center w-full text-black' id='contact'>
        <div className='max-w-[1240px] px-20 py-16'>
            
            <div className='bg-gray-800 text-white flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0  w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg'>
            <div className='flex flex-col space-y-8 justify-between'>
                <div>
                    <h1 className='font-bold text-4xl tracking-wide'>Contact Me</h1>
                    <p className='pt-2 text-sm'>Want to get in touch? you can contact me through the linked form here or by email. I look forward to speaking with you soon  </p>
                </div>
                <div className='flex flex-col space-y-6'>
           
                    <div className='inline-flex space-x-2 items-center'>
                        <AiFillMail/>
                        <span className='font-semibold text-cyan-400 hover:underline'>evanmulcare@gmail.com</span>
                    </div>
                </div>
            </div>
            <div>
                    <div className='bg-pink-400 rounded-xl shadow-lg p-8 text-white md:w-80'>
                        <form ref={form} onSubmit={sendEmail} className='flex flex-col space-y-4'>
                            <div>
                                <label className='text-sm form-label' htmlFor="name">Name</label>
                
                                <input type="text" name="user_name" placeholder='Your Name' className='form-control ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300 text-black' required/>

                            </div>
                            <div>
                                <label className='text-sm form-label'>Email Address</label>
                
                                <input type="text" name="user_email" placeholder='Email Address' className='form-control ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300 text-black' required/>

                            </div>
                            <div>
                                <label className='text-sm form-label' htmlFor="message">Message</label>
                
                                <textarea type="submit" name="message" placeholder='Message' rows="4" className='form-control ring-1 bg-white ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300 text-black' required/>
                                
                            </div>
                            <input type="submit" value="Send" className='text-xl font-bold cursor-pointer rounded-3xl hover:bg-cyan-400 active:bg-teal-600' />
                            </form>

                            {emailSent && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
                                    <h2 className=" text-3xl font-medium mb-4">
                                      Email Sent!
                                    </h2>
                                   <p>I will get back to you as soon as i can, thank you!</p>
                                    <button className="bg-pink-400 text-white py-2 px-4 rounded-md mt-4" onClick={() => setEmailSent(false)}>Close</button>
                                    </div>
                                </div>
                                )}
                        
                    </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default Contact