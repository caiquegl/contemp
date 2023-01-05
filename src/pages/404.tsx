import Link from 'next/link'

const FourOhFour = () => {
    return <>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
            <a>
                Go back home
            </a>
        </Link>
    </>
}

export default FourOhFour;
