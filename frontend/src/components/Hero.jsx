import HeroImage from "../assets/hero-image.jpg";

export default function Hero() {
    return (
        <div className="relative w-full h-screen flex items-start justify-start overflow-hidden ">
            <div
                className="absolute inset-0 -z-10 w-full h-full"
                style={{
                    backgroundImage: `url(${HeroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scaleX(-1)',
                    filter: 'brightness(0.5)'
                }}
            />

            <div className="relative z-10 px-4 sm:px-8 md:px-12 w-full mt-30">
                <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-base leading-tight md:leading-[1.1] mb-4 md:mb-6 drop-shadow-lg">
                    Your Home In<br />The City
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-xl md:max-w-2xl">
                    Discover a peaceful retreat in the heart of the urban landscape. Hootelier offers a cozy and comfortable stay, perfect for travelers looking to unwind after a busy day. With well-appointed rooms, a welcoming atmosphere, and a convenient location, we provide a relaxing experience amidst the city's energy.
                </p>
            </div>
        </div>
    );
}
