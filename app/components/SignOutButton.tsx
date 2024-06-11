import { signOut } from "next-auth/react"

const SignOutButton = () => {
	return (
		<button onClick={() => signOut()} className="p-2 rounded-md bg-black text-white">Log Out</button>
	)
}

export default SignOutButton
