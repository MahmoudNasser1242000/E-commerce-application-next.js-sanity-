import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <>
        <div className="flex items-center justify-center pt-34 pb-16" id='goTop'>
            <SignIn />
        </div>
    </>
}