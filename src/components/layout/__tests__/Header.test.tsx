import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import { Header } from '../Header'

// Cast the mock function
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Header', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  describe('Header_whenRendered_thenDisplaysLogo', () => {
    it('should render logo link', () => {
      // Arrange & Act
      render(<Header />)

      // Assert
      const logoLink = screen.getByRole('link', { name: /dhiman seal/i })
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should display "DS" as logo text', () => {
      // Arrange & Act
      render(<Header />)

      // Assert
      expect(screen.getByText('DS')).toBeInTheDocument()
    })
  })

  describe('Header_whenRendered_thenDisplaysNavigationLinks', () => {
    it('should render all navigation links', () => {
      // Arrange
      const expectedLinks = [
        { name: 'About', href: '/' },
        { name: 'Ventures', href: '/ventures/' },
        { name: 'Experience', href: '/experience/' },
        { name: 'Projects', href: '/projects/' },
        { name: 'Achievements', href: '/achievements/' },
        { name: 'Recommendations', href: '/recommendations/' },
        { name: 'Education', href: '/education/' },
      ]

      // Act
      render(<Header />)

      // Assert
      expectedLinks.forEach(({ name, href }) => {
        const links = screen.getAllByRole('link', { name })
        // Desktop and mobile menus both have the same links
        expect(links.length).toBeGreaterThanOrEqual(1)
        expect(links[0]).toHaveAttribute('href', href)
      })
    })
  })

  describe('Header_whenPathMatches_thenShowsActiveState', () => {
    it.each([
      ['/', 'About'],
      ['/ventures/', 'Ventures'],
      ['/experience/', 'Experience'],
      ['/projects/', 'Projects'],
      ['/achievements/', 'Achievements'],
      ['/recommendations/', 'Recommendations'],
      ['/education/', 'Education'],
    ])('should mark %s path as active for %s link', (path, linkName) => {
      // Arrange
      mockUsePathname.mockReturnValue(path)

      // Act
      render(<Header />)

      // Assert
      const links = screen.getAllByRole('link', { name: linkName })
      expect(links[0]).toHaveAttribute('aria-current', 'page')
      expect(links[0]).toHaveClass('text-accent')
    })

    it('should not mark non-active links with aria-current', () => {
      // Arrange
      mockUsePathname.mockReturnValue('/')

      // Act
      render(<Header />)

      // Assert
      const experienceLinks = screen.getAllByRole('link', { name: 'Experience' })
      expect(experienceLinks[0]).not.toHaveAttribute('aria-current')
    })
  })

  describe('Header_whenMobileMenu_thenTogglesCorrectly', () => {
    it('should show mobile menu button', () => {
      // Arrange & Act
      render(<Header />)

      // Assert
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      expect(menuButton).toBeInTheDocument()
    })

    it('should toggle mobile menu on button click', async () => {
      // Arrange
      const user = userEvent.setup()
      render(<Header />)

      // Act - open menu
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)

      // Assert - menu is open
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
    })

    it('should close mobile menu when a link is clicked', async () => {
      // Arrange
      const user = userEvent.setup()
      render(<Header />)

      // Act - open menu then click a link
      await user.click(screen.getByRole('button', { name: /open menu/i }))

      // Find the mobile menu
      const mobileMenu = screen.getByRole('button', { name: /close menu/i }).closest('nav')
      const mobileLinks = mobileMenu?.parentElement?.querySelectorAll('#mobile-menu a')

      if (mobileLinks && mobileLinks.length > 0) {
        fireEvent.click(mobileLinks[0])
      }

      // Assert - menu should close
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
    })

    it('should have correct aria-controls for mobile menu', async () => {
      // Arrange
      const user = userEvent.setup()
      render(<Header />)

      // Act
      const menuButton = screen.getByRole('button', { name: /open menu/i })

      // Assert
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')

      await user.click(menuButton)
      expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
        'aria-controls',
        'mobile-menu'
      )
    })
  })

  describe('Header_whenAccessibility_thenHasCorrectAttributes', () => {
    it('should have nav with aria-label', () => {
      // Arrange & Act
      render(<Header />)

      // Assert
      const nav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(nav).toBeInTheDocument()
    })

    it('should have sticky positioning', () => {
      // Arrange & Act
      const { container } = render(<Header />)

      // Assert
      const header = container.querySelector('header')
      expect(header).toHaveClass('sticky', 'top-0', 'z-50')
    })

    it('should have backdrop blur effect', () => {
      // Arrange & Act
      const { container } = render(<Header />)

      // Assert
      const header = container.querySelector('header')
      expect(header).toHaveClass('backdrop-blur-sm')
    })
  })

  describe('Header_whenMenuState_thenUpdatesIcon', () => {
    it('should show Menu icon when closed', () => {
      // Arrange & Act
      render(<Header />)

      // Assert
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      expect(menuButton).toBeInTheDocument()
    })

    it('should show X icon when open', async () => {
      // Arrange
      const user = userEvent.setup()
      render(<Header />)

      // Act
      await user.click(screen.getByRole('button', { name: /open menu/i }))

      // Assert
      expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
    })
  })

  describe('Header_whenMobileMenuOpen_thenShowsBorderAndPadding', () => {
    it('should show mobile menu with border when open', async () => {
      // Arrange
      const user = userEvent.setup()
      render(<Header />)

      // Act
      await user.click(screen.getByRole('button', { name: /open menu/i }))

      // Assert
      const mobileMenu = screen.getByTestId ?
        document.getElementById('mobile-menu') :
        document.querySelector('#mobile-menu')

      expect(mobileMenu).toBeInTheDocument()
      expect(mobileMenu).toHaveClass('border-t', 'border-border')
    })
  })

  describe('Header_whenMultiplePathnames_thenOnlyOneActive', () => {
    it('should only have one active link at a time', () => {
      // Arrange
      mockUsePathname.mockReturnValue('/projects/')

      // Act
      render(<Header />)

      // Assert
      const allLinks = screen.getAllByRole('link')
      const activeLinks = allLinks.filter(
        (link) => link.getAttribute('aria-current') === 'page'
      )

      // At least one active link should exist and contain correct text
      expect(activeLinks.length).toBeGreaterThanOrEqual(1)
      activeLinks.forEach((link) => {
        expect(link).toHaveTextContent('Projects')
      })
    })
  })
})
