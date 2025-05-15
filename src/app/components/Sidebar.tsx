"use client";

// import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');  
    };

    return (
        <aside className="bg-gray-50 border-r border-gray-300 w-64 h-screen p-6">
            <nav>
                <ul className="space-y-3">
                    <li>
                        <Link href="/casos/visualizar">
                            <div className="flex">
                                {/* <Image src='/icons/icon-visualizar.png' width={18} height={18} alt='' /> */}
                                <span className="block p-2 text-gray-700 hover:bg-gray-200 rounded transition">Visualizar casos</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <span className="block p-2 text-gray-700 hover:bg-gray-200 rounded transition">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/casos/criar">
                            <span className="block p-2 text-gray-700 hover:bg-gray-200 rounded transition">Cadastrar novo usuário</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="w-full text-left">
                            <span className="block p-2 text-gray-700 hover:bg-gray-200 rounded transition">Sair</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
