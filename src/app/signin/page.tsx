import SignInForm from "@/components/views/SignInForm"
import ContextWrapper from "@/global/context"

const SignIn = () => {
    return (
        <ContextWrapper>
            <SignInForm />
        </ContextWrapper>
    )
}

export default SignIn