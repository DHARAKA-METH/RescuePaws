import DogCard from '@/component/Cart/DogCard';
import Navbar from '@/component/NavBar';
import { TagCart } from '@/constants/Stats'
import React from 'react'

const page = () => {


    const dogs = [
        { id: "1", name: "Golden Retriever", location: "Colombo Fort", status: "Reported", time: "2 hrs ago" },
        { id: "2", name: "Mixed Breed", location: "Negombo Beach", status: "Rescued", time: "1 day ago" },
        { id: "3", name: "Labrador", location: "Kandy City", status: "Adopted", time: "3 days ago" },
        { id: "4", name: "Beagle", location: "Galle Fort", status: "Reported", time: "5 hrs ago" },
        { id: "5", name: "German Shepherd", location: "Matara Town", status: "Rescued", time: "2 days ago" },
        { id: "6", name: "Poodle", location: "Kurunegala", status: "Reported", time: "7 hrs ago" },
        { id: "7", name: "Bulldog", location: "Anuradhapura", status: "Adopted", time: "4 days ago" },
        { id: "8", name: "Mixed Breed", location: "Jaffna Market", status: "Reported", time: "3 hrs ago" },
        { id: "9", name: "Golden Retriever", location: "Batticaloa Beach", status: "Rescued", time: "12 hrs ago" },
        { id: "10", name: "Labrador", location: "Trincomalee Port", status: "Adopted", time: "5 days ago" },
        { id: "11", name: "Beagle", location: "Nuwara Eliya", status: "Reported", time: "8 hrs ago" },
        { id: "12", name: "Mixed Breed", location: "Kalutara Bridge", status: "Rescued", time: "1 day ago" },
        { id: "13", name: "Poodle", location: "Ratnapura", status: "Reported", time: "6 hrs ago" },
        { id: "14", name: "German Shepherd", location: "Badulla Town", status: "Adopted", time: "2 days ago" },
        { id: "15", name: "Golden Retriever", location: "Panadura", status: "Reported", time: "9 hrs ago" },
        { id: "16", name: "Mixed Breed", location: "Moratuwa", status: "Rescued", time: "11 hrs ago" },
        { id: "17", name: "Bulldog", location: "Polonnaruwa", status: "Reported", time: "4 hrs ago" },
        { id: "18", name: "Labrador", location: "Hambantota", status: "Adopted", time: "6 days ago" },
        { id: "19", name: "Beagle", location: "Chilaw", status: "Reported", time: "10 hrs ago" },
        { id: "20", name: "Mixed Breed", location: "Puttalam", status: "Rescued", time: "2 days ago" },
    ];
    let value = dogs.length



    return (
        <div className='w-full min-h-screen flex flex-col gap-4'>
            <Navbar />
            <section className='bg-navy text-white w-full h-[250px] flex flex-col px-12 md:px-18 py-12 gap-4'>
                <div className=' flex flex-col md:flex-row justify-evenly' >
                    <h2 className='md:text-4xl text-2xl font-bold'>All Dogs</h2>
                    <p className='pl-4 pr-4 pt-1 pb-1 bg-white/10 rounded-full flex justify-center items-center'>{value} Dogs</p>
                </div>
                <div className='flex justify-center items-center mt-3'>

                    <div className='flex justify-center items-center w-[750px] bg-white/10 h-12 rounded-2xl'>
                        <input type="text" placeholder='Search' className='w-[750px] h-12 rounded-2xl px-4 ' />
                    </div>
                </div>
                <div className='flex justify-center items-center mt-2 gap-4'>
                    {TagCart.map((item) => (
                        <p key={item.value} className='pl-4 pr-4 pt-1 pb-1 bg-white/10 rounded-full flex justify-center items-center'>{item.value}</p>
                    ))}




                </div>
            </section>
            <div className='flex justify-center items-center mt-2 gap-4  px-12 md:px-18 py-12'>


                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {dogs.map((dog, i) => (
                        <div
                            key={dog.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <DogCard {...dog} />
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default page
