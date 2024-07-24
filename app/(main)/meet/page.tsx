'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { IoIosClose } from "react-icons/io";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const page = () => {

    const [open, setOpen] = useState(false)
    const [value, setValue]: any = useState([])

    return (
        <div className='flex flex-col ml-[12%] px-4 py-4 w-full'>
            <div className='flex justify-between w-full'>
                <Dialog>
                    <DialogTrigger className='bg-[#393E46] hover:bg-black px-2 rounded-md text-[#FFD369] tracking-tight w-fit mt-4'>Edit Prefrence</DialogTrigger>
                    <DialogContent className='bg-[#393E46]'>
                        <DialogHeader>
                            <form className='flex flex-col' action="">
                                <label className='text-white mt-1 ml-1' htmlFor="">Name</label>
                                <Input className='bg-[#222831] mt-1 text-white' type="text" placeholder="Joseph" />
                                <label className='text-white mt-2' htmlFor="">Age</label>
                                <Input className='bg-[#222831] mt-1 text-white' type="number" placeholder="18" />
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[200px] mt-2 bg-[#222831] border-0 hover:bg-[#222831] hover:text-[#EEEEEE] text-[#EEEEEE] justify-between"
                                        >What are your interests
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command className='bg-[#222831] text-[#EEEEEE]'>
                                            <CommandInput placeholder="Search framework..." />
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandList>
                                                <CommandGroup>
                                                    {frameworks.map((framework) => (
                                                        <CommandItem
                                                            className='text-[#EEEEEE]'
                                                            key={framework.value}
                                                            value={framework.value}
                                                            onSelect={(currentValue) => {
                                                                const exist = value.find((v: any) => currentValue == v)
                                                                console.log(exist)
                                                                if (!exist) {
                                                                    setValue((p: any) => [...p, currentValue])
                                                                }
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    value === framework.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {framework.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <div className='flex flex-wrap mt-1'>
                                    {value && value.map((val: any) => { return <span className='px-2 flex items-center py-1 bg-[#222831] text-[#EEEEEE] rounded-md mx-1'>{val} <span onClick={() => { setValue(value.filter((v: any) => v != val)) }} className='cursor-pointer'><IoIosClose /></span></span> })}
                                </div>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Button className='bg-[#393E46] text-[#FFD369] tracking-tight w-fit mt-4'>Button</Button>
            </div>
        </div>
    )
}

export default page