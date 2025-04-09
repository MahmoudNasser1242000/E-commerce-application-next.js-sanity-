import PaymentConfirmContent from '@/components/Payment/PaymentConfirmContent/PaymentConfirmContent';

type TParams = Promise<{ cartId: string }>

async function PaymentConfirm({params}: {params: TParams}) {
    return (
        <div className='flex flex-col items-center justify-center px-5 pt-34 h-full mb-12' id='goTop'>
            <PaymentConfirmContent cartId={(await params).cartId} />
        </div>
    )
}

export default PaymentConfirm