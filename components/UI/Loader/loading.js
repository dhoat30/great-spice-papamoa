import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="loading-wrapper"><Image src="/logo.png"      width={96*2}
    height={37*2} alt="Logo on Splash Screen" />
        <div className="spinner"></div>
    </div>
}
