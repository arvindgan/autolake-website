import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">We're Still Working On This</h1>
      <p className="text-xl mb-8">This feature is coming soon. Stay tuned!</p>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe%20Express%20-%20file%20(1)-bs3blAeBJgTdsQ9mzq2pMGb6yysaWL.png"
        alt="Digital Bear Engineer"
        width={200}
        height={200}
        className="mb-8"
      />
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
