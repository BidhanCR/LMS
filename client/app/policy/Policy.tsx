import React from 'react'
import { styles } from '../styles/style'

type Props = {}

const Policy = (props: Props) => {
  return (
    <div>
        <div className={`w-[95%] 800px:w-[92%] m-auto py-2  px-3 text-black dark:text-white`}>
            <h1 className={`${styles.title} !text-center pt-2`}>Platform Terms and Conditions</h1>
            <ul style={{listStyle: "unset", marginLeft: "15px"}}>
                <p className='py-2 ml-[-15px] text-[15px] font-Poppins leading-8 whitespace-pre-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quas quia nisi nulla ipsa soluta libero architecto cumque perferendis ipsum veniam ipsam sequi eaque mollitia quam voluptate, necessitatibus numquam impedit reiciendis perspiciatis, sint provident placeat?</p>
                <br />
                <p className='py-2 ml-[-15px] text-[15px] font-Poppins leading-8 whitespace-pre-line'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quas quia nisi nulla ipsa soluta libero architecto cumque perferendis ipsum veniam ipsam sequi eaque mollitia quam.</p>
            </ul>
        </div>
    </div>
  )
}

export default Policy