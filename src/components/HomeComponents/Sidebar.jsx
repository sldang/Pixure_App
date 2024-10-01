import React from 'react'

const Sidebar = () => {
  return (
    <div>
    <div className="bg-white">
        <div className="flex-col flex">
            <div className="w-full border-b-2"></div>
            <div className="flex border-r-2 border-black h-screen pr-4 overflow-x-hidden">
                <div className="bg-white lg:flex md:w-64 md:flex-col hidden">
                    <div className="flex-col pt-5 flex overflow-y-auto">
                        <div className="h-full flex-col justify-between px-4 flex">
                            <div className="space-y-4">
                                <p className="font-medium text-sm text-gray-900 px-4 py-2.5 block transition-all duration-200 hover:bg-gray-200 cursor-pointer">Create</p>
                                <p className="font-medium text-sm text-gray-900 px-4 py-2.5 block transition-all duration-200 hover:bg-gray-200 cursor-pointer">Home</p>
                                <p className="font-medium text-sm text-gray-900 px-4 py-2.5 block transition-all duration-200 hover:bg-gray-200 cursor-pointer">Search</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Sidebar