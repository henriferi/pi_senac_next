import Image from 'next/image';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 px-6 py-3 flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
                <Image src="/logo-gop.png" alt="GOP Logo" width={130} height={50} />
            </div>

            <div className="flex items-center">
                <Image src="/icons/icon-perfil.png" alt="Perfil" width={24} height={24} />
            </div>
        </header>
    );
}