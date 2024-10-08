"use client"

import qs from "query-string"
import { Search } from "lucide-react"
// you can use native URL search params or you can build you own hook
import { useDebounceValue } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebounceValue(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue
        }
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debouncedValue, router])

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

// No guarantees this is the best way to do things, but ChatGPT helped me fix it. The new import is useDebounceValue instead of useDebounce and then you can declare the debounced value like so to fix the type errors:

// const [debouncedValue, _] = useDebounceValue<string>(value, 500, {
//         // Optional: specify options here
//     });
