'use client';

import { useEffect ,useState } from 'react'
import { useRouter } from 'next/navigation'
import { METHODS } from 'http';
import { headers } from 'next/headers';
import Cookies from 'js-cookie';

export default function Login() {
  const [showImap, setShowImap] = useState(false)
  const [email, setEmail] = useState('')
  const [server, setServer] = useState('')
  const [port, setPort] = useState('')
  const [appPassword, setAppPassword] = useState('')
  const router = useRouter()
  ///debut
  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const savedEmail = Cookies.get('email');  // Lire le cookie
    if (savedEmail) {
      router.push('../dashboard');  // Rediriger vers le tableau de bord si l'email est trouvé
    }
  }, [router]);
  ///fin


  const handleGmailLogin = () => {
    console.log('Gmail login')
    // TODO: Implement Gmail login logic
    router.push('../dashboard')
  }

  const handleYahooLogin = () => {
    console.log('Yahoo login')
    // TODO: Implement Yahoo login logic
    router.push('../dashboard')
  }

  const handleImapLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const requestData = {
      email,
      server,
      port,
      appPassword
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (response.ok) {
        console.log('Login successful');
        const data = await response.json();  // Récupérer les données de la réponse
        Cookies.set('email', email, { expires: 7 });  // Créer le cookie pour l'email
        console.log(response.status)
        
        // Redirection vers le dashboard après un login réussi
        router.push('../dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleBack = () => {
    setShowImap(false)
    setEmail('')
    setServer('')
    setPort('')
    setAppPassword('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mb-20 text-center text-5xl font-bold text-gray-900">
            cano
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {!showImap && (
            <>
              <button
                onClick={handleGmailLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Se connecter avec Gmail
              </button>
              <button
                onClick={handleYahooLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Se connecter avec Yahoo
              </button>
              <button
                onClick={() => setShowImap(true)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Se connecter avec IMAP
              </button>
            </>
          )}
          {showImap && (
            <form onSubmit={handleImapLogin} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Adresse e-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="server" className="sr-only">
                    server
                  </label>
                  <input
                    id="server"
                    name="server"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="server"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="port" className="sr-only">
                    port
                  </label>
                  <input
                    id="port"
                    name="port"
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="app-password" className="sr-only">
                    Mot de passe d'application
                  </label>
                  <input
                    id="app-password"
                    name="app-password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Mot de passe d'application"
                    value={appPassword}
                    onChange={(e) => setAppPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="group relative flex-grow flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Se connecter avec IMAP
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="group relative flex-grow flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Retour
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}