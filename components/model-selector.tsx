"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FC, useState } from "react"

const models = [
  {
    value: "anthropic/claude-3-sonnet",
    label: "Claude 3 Sonnet",
  },
  {
    value: "anthropic/claude-3-opus",
    label: "Claude 3 Opus",
  },
  {
    value: "meta-llama/llama-3.1-405b-instruct",
    label: "Llama 3.1 405B",
  },
  {
    value: "meta-llama/llama-3.1-70b-instruct",
    label: "Llama 3.1 70B",
  },
  {
    value: "google/gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
  },
]

export const ModelSelector: FC<{ onModelChange: (model: string) => void }> = ({ onModelChange }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("anthropic/claude-3-sonnet")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? models.find((model) => model.value === value)?.label : "Select model..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    onModelChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === model.value ? "opacity-100" : "opacity-0")} />
                  {model.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
