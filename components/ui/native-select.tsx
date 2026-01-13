import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/_lib/utils"

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select relative w-full has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "border-nexia-dark-teal-100 bg-gray-100 rounded-xl placehlder:nexia-gray placeholder:font-medium placeholder:!text-lg selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 min-h-9 max-h-9 w-full flex items-center text-lg min-w-0 appearance-none border px-3 py-1 pr-9 transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:ring-nexia-light-teal-100/50 focus-visible:border-nexia-light-teal-100 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
