import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="loading-wrapper">
        <Image src="/logo.png"      width={48 * 2}
                height={22 * 2} alt="Logo on Splash Screen" quality="60" priority />
        <div className="loader"></div>
    </div>
}
/* HTML: <div class="loader"></div> */
