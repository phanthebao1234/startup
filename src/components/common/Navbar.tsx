'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/feartures/authApiSlice';
import { logout as setLogout } from '@/redux/feartures/authSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from '@/src/components/common'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter();
  const dispatch = useDispatch()

  const [logout] = useLogoutMutation()

  const { isAuthenticated } = useAppSelector(state => state.auth)

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout())
      })
      .finally(() => {
        router.push('/')
      })
  }

  const authLinks = (
    <div>AUTH LINKS</div>
  )

  const isSelected = (path: string) => !!(pathname === path)

  const authLink = (isMobile: boolean) => (
    <>
      <NavLink
        isSelected={isSelected('/')}
        isMobile={isMobile}
        href={'/'}
      >
        Dashboard
      </NavLink>
      <NavLink
        isMobile={isMobile}
        onClick={handleLogout}
      >
        Logout
      </NavLink>
    </>
  )

  const guestLinks = (isMobile: boolean) => (
    <>
      <NavLink
        isSelected={isSelected('/auth/login')}
        isMobile={isMobile}
        href={'/auth/login'}
      >
        Login
      </NavLink>
      <NavLink
        isSelected={isSelected('/auth/register')}
        isMobile={isMobile}
        href={'/auth/register'}
      >
        Register
      </NavLink>
    </>
  )

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <NavLink href="/" isBanner>Full Auth</NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {isAuthenticated ? authLink(false) : guestLinks(false)}
              </div>
            </div>
          </div>
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? authLink(false) : guestLinks(false)}
          </div> */}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
        {isAuthenticated ? authLink(false) : guestLinks(false)}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
