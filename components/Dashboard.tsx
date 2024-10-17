'use client';

import { useState, useEffect } from 'react'
import { Home, Users, Settings, LogOut, BarChart2, Download, ThumbsUp } from "lucide-react"
import { useRouter } from 'next/navigation'

// Composants pour chaque page
const AccueilPage = ({ emailCount, loading, error }) => (
  <>
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Bienvenue sur votre Dashboard</h2>
    
    {/* Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Emails dans la boîte de réception"
        value={
          loading ? 'Chargement...' : 
          error ? 'Erreur de chargement' : 
          emailCount !== null ? emailCount.toString() : 'N/A'
        }
        icon={<Users className="w-8 h-8 text-blue-500" />}
      />
      <StatCard
        title="Téléchargements"
        value="5,678"
        icon={<Download className="w-8 h-8 text-green-500" />}
      />
      <StatCard
        title="Avis positifs"
        value="98%"
        icon={<ThumbsUp className="w-8 h-8 text-yellow-500" />}
      />
    </div>

    {/* Chart placeholder */}
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistiques d'utilisation</h3>
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md flex items-center justify-center">
        <BarChart2 className="w-16 h-16 text-gray-400" />
        <span className="text-gray-500 ml-2">Graphique à venir</span>
      </div>
    </div>

    {/* Additional content */}
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Activité récente</h3>
      <p className="text-gray-600">
       
      </p>
    </div>
  </>
)

const AntiSpam = () => (
  <div className="space-y-6">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">AntiSpam</h2>
      <p className="text-gray-600">
        
      </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Target folder</h3>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          confirmer
        </button>
      </div>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">prompt</h3>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          confirmer
        </button>
      </div>
    </div>
  </div>
)

const AutoMove = () => (
  <div className="space-y-6">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">AutoMove</h2>
      <p className="text-gray-600">
        
      </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Target folder</h3>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          confirmer
        </button>
      </div>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">prompt</h3>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          confirmer
        </button>
      </div>
    </div>
  </div>
)
const AutoReply = () => (
  <div className="space-y-6">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">AutoReply</h2>
      <p className="text-gray-600">
        
      </p>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">filter prompt</h3>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          confirmer
        </button>
      </div>
    </div>
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">reply prompt</h3>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
      
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          confirmer
        </button>
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const [emailCount, setEmailCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState('accueil');
  const router = useRouter();

  useEffect(() => {
    const fetchEmailCount = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/email-count');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Nombre d\'emails reçu de l\'API Python:', data.count);
        setEmailCount(data.count);
      } catch (e) {
        console.error('Error fetching email count:', e);
        setError('Failed to fetch email count. Is the Flask server running on port 5000?');
      } finally {
        setLoading(false);
      }
    };

    fetchEmailCount();
  }, []);

  const renderActivePage = () => {
    switch (activePage) {
      case 'accueil':
        return <AccueilPage emailCount={emailCount} loading={loading} error={error} />;
      case 'AntiSpam':
        return <AntiSpam />;
      case 'AutoMove':
        return <AutoMove />;
      case 'AutoReply':
          return <AutoReply />;
      default:
        return <AccueilPage emailCount={emailCount} loading={loading} error={error} />;
    }
  };

  // Nouvelle fonction pour gérer la déconnexion
  const handleLogout = () => {
    // TODO: Ajouter ici la logique de déconnexion (par exemple, effacer les tokens d'authentification)
    router.push('/login');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <button onClick={() => setActivePage('accueil')} className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800">
            <Home className="inline-block w-5 h-5 mr-2" />
            Accueil
          </button>
          <button onClick={() => setActivePage('AntiSpam')} className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800">
            <Users className="inline-block w-5 h-5 mr-2" />
            AntiSpam
          </button>
          <button onClick={() => setActivePage('AutoMove')} className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800">
            <Settings className="inline-block w-5 h-5 mr-2" />
            AutoMove
          </button>
          <button onClick={() => setActivePage('AutoReply')} className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800">
            <Users className="inline-block w-5 h-5 mr-2" />
            AutoReply
          </button>
          {/* Modification : Remplacé "Aide" par "Logout" et ajouté la fonction handleLogout */}
          <button onClick={handleLogout} className="block px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800">
            <LogOut className="inline-block w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {renderActivePage()}
      </main>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}