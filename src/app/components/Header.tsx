import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-300 px-6 py-3 flex justify-between items-center bg-">
            <div className="flex items-center space-x-3">
                <Image src="/logo-gop.png" alt="GOP Logo" width={130} height={50} />
            </div>

            <div className="flex items-center">
                <Image src="/icons/icon-perfil.png" alt="Perfil" width={24} height={24} />
            </div>
        </header>
    );
}
