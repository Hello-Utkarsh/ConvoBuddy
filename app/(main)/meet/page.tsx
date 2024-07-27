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
        id: 1,
        value: "next.js",
        label: "Next.js",
    },
    {
        id: 2,
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        id: 3,
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        id: 4,
        value: "remix",
        label: "Remix",
    },
    {
        id: 5,
        value: "astro",
        label: "Astro",
    },
]

const Languages = [
    {
        id: 1,
        value: "english",
        label: "English",
    },
]

const Meet = () => {

    const [interestOpen, setInterestOpen] = useState(false)
    const [languageOpen, setLanguageOpen] = useState(false)
    const [interestValue, setInterest]: any = useState([])
    const [languageValue, setLanguage]: any = useState([])
    const [formData, setData]: any = useState({
        name: "",
        age: "",
        interests: [],
        language: []
    })

    const handleChange = async (e: any) => {
        const name = e.target.name
        const value = e.target.value
        setData((p: any) => ({ ...p, [name]: value }))
    }


    const handleSubmit = () => {
        setData((p: any) => ({ ...p, 'interests': interestValue }))
    }

    const addLang = (e: any) => {
        console.log(e.target.value)
    }

    return (
        <div className='flex flex-col ml-[12%] px-4 py-4 w-full'>
            <div className='flex justify-between w-full'>
                <Dialog>
                    <DialogTrigger className='bg-[#393E46] hover:bg-black px-2 rounded-md text-[#FFD369] tracking-tight w-fit mt-4'>Edit Prefrence</DialogTrigger>
                    <DialogContent className='bg-[#393E46]'>
                        <DialogHeader>
                            <form className='flex flex-col' action={handleSubmit}>
                                <label className='text-white mt-1 ml-1' htmlFor="">Name</label>
                                <Input name='name' onChange={handleChange} value={formData.name} className='bg-[#222831] mt-1 text-white' type="text" placeholder="Joseph" />
                                <label className='text-white mt-2' htmlFor="">Age</label>
                                <Input name='age' onChange={handleChange} className='bg-[#222831] mt-1 text-white' type="number" placeholder="18" />
                                <div className='flex justify-between'>
                                    <Popover open={interestOpen} onOpenChange={setInterestOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={interestOpen}
                                                className="w-fit mt-2 bg-[#222831] border-0 hover:bg-[#222831] hover:text-[#EEEEEE] text-[#EEEEEE] justify-between"
                                            >What are your interests
                                                <ChevronsUpDown className="ml-2 h-4 w-fit shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command className='bg-[#222831] text-[#EEEEEE]'>
                                                <CommandInput placeholder="Search framework..." />
                                                <CommandEmpty>Not found.</CommandEmpty>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {frameworks.map((framework) => (
                                                            <CommandItem
                                                                className='text-[#EEEEEE]'
                                                                key={framework.id}
                                                                value={framework.value}
                                                                onSelect={(currentValue) => {
                                                                    const exist = formData['interests'].find((v: any) => currentValue == v)
                                                                    if (!exist) {
                                                                        setData((p: any) => ({ ...p, 'interests': [...formData['interests'], currentValue] }))
                                                                    }
                                                                    setInterestOpen(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        interestValue === framework.value ? "opacity-100" : "opacity-0"
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
                                    <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={languageOpen}
                                                className="w-fit mt-2 bg-[#222831] border-0 hover:bg-[#222831] hover:text-[#EEEEEE] text-[#EEEEEE] justify-between"
                                            >Select Language
                                                <ChevronsUpDown className="ml-2 h-4 w-fit shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command className='bg-[#222831] text-[#EEEEEE]'>
                                                <CommandInput placeholder="Search language..." onChangeCapture={addLang}/>
                                                <CommandEmpty className='px-1 py-1'>
                                                    <Button onClick={addLang} className='bg-[#EEEEEE] text-[#222831] hover:text-[#222831] hover:bg-[#EEEEEE] w-full font-normal rounded-sm h-fit'>Create language</Button>
                                                </CommandEmpty>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {Languages.map((Language) => (
                                                            <CommandItem
                                                                className='text-[#EEEEEE]'
                                                                key={Language.id}
                                                                value={Language.value}
                                                                onSelect={(currentValue) => {
                                                                    const exist = formData['language'].find((v: any) => currentValue == v)
                                                                    if (!exist) {
                                                                        setData((p: any) => ({ ...p, 'language': [...formData['language'], currentValue] }))
                                                                    }
                                                                    setLanguageOpen(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        languageValue === Language.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {Language.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className='justify-between'>
                                    <div className='flex flex-wrap mt-1'>
                                        {formData['interests'] && formData['interests'].map((val: any) => { return <span className='px-2 flex items-center py-1 bg-[#222831] text-[#EEEEEE] rounded-md mx-1'>{val} <span onClick={() => {setData((p: any) => ({...p, 'interests': formData['interests'].filter((v: any) => v != val)}))}} className='cursor-pointer'><IoIosClose /></span></span> })}
                                    </div>
                                    <div className='flex flex-wrap mt-1'>
                                        {formData['language'] && formData['language'].map((val: any) => { return <span className='px-2 flex items-center py-1 bg-[#222831] text-[#EEEEEE] rounded-md mx-1'>{val} <span onClick={() => {setData((p: any) => ({...p, 'language': formData['language'].filter((v: any) => v != val)}))}} className='cursor-pointer'><IoIosClose /></span></span> })}
                                    </div>
                                </div>
                                <Button type='submit' className='bg-[#222831] text-[#EEEEEE] tracking-tight w-fit mt-2'>Submit</Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Button className='bg-[#393E46] text-[#FFD369] tracking-tight w-fit mt-4'>Button</Button>
            </div>
        </div>
    )
}

export default Meet
