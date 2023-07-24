// Imports
// ========================================================
import { useEffect } from "react";
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

// Context
// ========================================================
// const MiddlewareContext = createContext(defaultValue);

// Root Provider
// ========================================================
const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(true)
//   // State / Props
//   const { user, isAuthenticated, isLoading, logout, loginWithRedirect, getAccessTokenSilently } = useAuth0();

//   useEffect(() => {
//     (async () => {
//       try {
//         // console.log({ isAuthenticated });
//         const token = await getAccessTokenSilently();
//         console.log({ token });
//         setToken(token);
//         // console.log({ isAuthenticated });
//       } catch (error) {
//         console.error({ error });
//         loginWithRedirect({
//           appState: {
//             returnTo: `${window.location.pathname}`
//           }
//         });
//       }
//     })();
//   }, []);

//   // Render
//   if (isLoading || !user) return <>Loading...</>
  return <>{children}</>
  // Render
  return <>
    {children}
          {/* Global notification live region, render this permanently at the end of the document */}
          <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex px-4 py-6 sm:p-6"
      >
        <div className="flex w-full items-end justify-end space-y-4">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                    <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        
      </div>
  </>
};

// Exports
// ========================================================
export default NotificationsProvider;