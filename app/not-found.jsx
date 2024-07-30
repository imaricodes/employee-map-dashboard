import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        <Link href="/" className='cursor-pointer text-white py-3 px-6 w-full bg-green-500'>Home</Link>
      </p>
    </div>
  )
}