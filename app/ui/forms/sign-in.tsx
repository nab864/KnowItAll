
import { signIn } from "@/auth"

export default async function SignIn() {

  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Signin</button>
    </form>
  )
}