import React from 'react'

import TaskbarButton from '../components/Taskbar/TaskbarButton'

import  AmanPhoto  from '../images/IMG_0959.png'
import  RileyPhoto  from '../images/IMG_0955.png'
import  SugnyuPhoto  from '../images/IMG_0948.png'
import  ZanePhoto  from '../images/IMG_0952.png'


import './AboutMe.scss'
import Taskbar from '../components/Taskbar/Taskbar'

const AboutUs = () => {
    return (
        <>
            <Taskbar />
            <div className='w-full bg-gradient-to-b via-black from-gray-700 to-black text-white pt-32'>
                <div className="container__AboutUs w-2/3 mx-auto text-center">

                    <h1 className='text-5xl'>About Us</h1>
                    <p className='mb-10'>We are Computer Science Students from Michigan State University.
                        We are intrested in inovative and cutting edge techonology!</p>

                    <h1 className='text-3xl'>Aman Dhruva Thamminana</h1>
                    <img className='mx-auto cornerRadius' src={AmanPhoto} width="200px" height="200px" alt="" />
                    <p>Major: Computer Science, and Math</p>
                    <p>
                        My main interests include Algorithms and Computer theory, Cloud technology, and Machine Learning/Artificial intelligence. I also dabble in other aspects of Business, Engineering, web and mobile development.
                        I also love spontaneously traveling, listening to overplayed music and consuming too much coffee.
                    </p>
                    <div className='flex justify-center items-center mb-10'>

                    <div className="socials">

                        <TaskbarButton label="LinkedIn" link='https://www.linkedin.com/in/aman-thamminana/' />
                        <TaskbarButton label="Github" link='https://github.com/amantham20' />
                        <TaskbarButton label="E-Mail" link='mailto:thammina@msu.edu' />

                    </div>
                    </div>


                    <h1 className='text-3xl'>Riley Cook</h1>
                    <img className='mx-auto cornerRadius' src={RileyPhoto} width="200px" height="200px" alt="" />
                    <p>Major: Computer Science</p>
                    <p>
                        Im passitionate about learning new things and solving problems. I enjoy working with others and learning from them. I am currently working on my undergrad in computer science and I am looking forward to the future.
                    </p>
                    <div className="socials flex justify-center items-center mb-10">
                        <TaskbarButton label="LinkedIn" link='https://www.linkedin.com/in/rileygcook/' />
                        <TaskbarButton label="Github" link='https://github.com/rcookie777' />
                        <TaskbarButton label="E-Mail" link='mailto:thammina@msu.edu' />
                    </div>
                    <h1 className='text-3xl'>
                        Sugnyu Kwon
                    </h1>
                    <img className='mx-auto cornerRadius' src={SugnyuPhoto} width="200px" height="200px" alt="" />
                    <p>Major: Computer Science</p>
                    <p>
                        I am a senior at Michigan State University majoring in Computer Science. I am interested in software development and data science. I am currently working on my undergraduate degree and looking forward to the future.
                    </p>
                    <div className="socials flex justify-center items-center mb-10">
                        <TaskbarButton label="E-Mail" link='mailto:thammina@msu.edu' />
                    </div>
                    <h1 className='text-3xl mt-10'>Zane Aridi</h1>
                    <img className='mx-auto cornerRadius' src={ZanePhoto} width="200px" height="200px" alt="" />
                    <p>Major: Computer Science</p>

                    <p>
                        My main interests are philosophy, anime, video games. I do like to touch grass on the weekends or snow when I go skiing. I'm pursuing a Master's in CSE and have my own Software Consultancy.
                    </p>
                    <div className="socials flex justify-center items-center mb-10">
                        <TaskbarButton label="LinkedIn" link='https://www.linkedin.com/in/zane-aridi-b883b321b/' />
                        <TaskbarButton label="Github" link='https://github.com/ZaneAridi1022//' />
                        {/* <TaskbarButton label="E-Mail" link='mailto:thammina@msu.edu'/> */}
                    </div>


                    <h1 className='text-3xl my-10 pb-10'>
                        Special Thanks to
                        University of Waterloo
                    </h1>
                </div>
            </div>

        </>
    )
}

export default AboutUs