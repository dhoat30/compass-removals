import Header from '@/Components/UI/Header/Header';
import ThankYou from '@/Components/UI/ThankYou/ThankYou';

export const metadata = {
    metadataBase: new URL('https://bestnzmovers.co.nz'),
    title: 'Thank You',
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function Page() {
    return (
        <>
            <Header />
            <main>
                <ThankYou />
            </main>
        </>

    )
}
