'use client'; // This must be the first line
import Image from 'next/image'

export default function Loader (){ 



    return (<div className="loading-wrapper">
        <div className="content-wrapper max-width-lg">
        <Image src="/logo.png"   width={96*1.3}
                height={37*1.3} alt="logo"/> 
                 <div className="loader"></div>

                </div>
    </div>   
)
}