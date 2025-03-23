import Image from 'next/image'
import Link from 'next/link'

function PaymentConfirm() {
    return (
        <div className='flex flex-col items-center justify-center px-5 pt-34 h-full mb-12'>
            <Image src='/images/verified.png'
                alt='check'
                width={400}
                height={400}
            />
            <h2 className='text-[24px]'>Payment Successful !</h2>
            <h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
                order confirmation
                along with Digital Content
            </h2>
            <Link
                href="/"
                className='px-8 py-2 rounded-sm mt-6 text-white bg-primary'>
                Go to Home
            </Link>

        </div>
    )
}

export default PaymentConfirm