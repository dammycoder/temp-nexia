import * as React from "react"

import { cn } from "@/_lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "font-effra file:text-foreground placeholder:text-nexia-gray selection:bg-primary selection:text-primary-foreground  border-nexia-dark-teal-100 bg-gray-100 flex h-9 w-full min-w-0 rounded-xl border  px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 placeholder:font-medium placeholder:text-lg file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
        "focus-visible:border-nexia-light-teal-100 focus-visible:ring-nexia-light-teal-100/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
