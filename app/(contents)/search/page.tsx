// "use client"

// import { useSearchParams, useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { Bounded } from "@/components/bouned"

// export default function Page() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const search = searchParams.get("s")

//   useEffect(() => {
//     if (!search) {
//       router.replace("/404") // redirect to a 404 page
//     }
//   }, [search, router])

//   if (!search) return null

//   return <div className="h-screen">
//     {/* Search param: {search} */}
//     <div className="h-[20vh] bg-nexia-dark-teal-100 flex items-center ">
//   <Bounded>
//     <p className="text-white text-5xl font-light py-8">Results for : &auot;{search}&quot;</p>
//   </Bounded>
//     </div>
    
//     </div>
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page