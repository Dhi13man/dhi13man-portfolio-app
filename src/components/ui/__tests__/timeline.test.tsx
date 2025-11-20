import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineMeta,
  TimelineDate,
  TimelineLocation,
  TimelineContent,
  TimelineDescription,
} from '../timeline'

describe('Timeline', () => {
  describe('Timeline_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Timeline content'

      // Act
      render(<Timeline>{content}</Timeline>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('Timeline_whenRendered_thenHasSpacingStyles', () => {
    it('should have relative positioning and spacing', () => {
      // Arrange & Act
      const { container } = render(<Timeline>Content</Timeline>)

      // Assert
      expect(container.firstChild).toHaveClass('relative')
      expect(container.firstChild).toHaveClass('space-y-6')
    })
  })

  describe('Timeline_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className', () => {
      // Arrange
      const customClass = 'custom-timeline'

      // Act
      const { container } = render(<Timeline className={customClass}>Content</Timeline>)

      // Assert
      expect(container.firstChild).toHaveClass(customClass)
    })
  })

  describe('Timeline_displayName_thenIsTimeline', () => {
    it('should have displayName set to "Timeline"', () => {
      // Arrange & Act & Assert
      expect(Timeline.displayName).toBe('Timeline')
    })
  })
})

describe('TimelineItem', () => {
  describe('TimelineItem_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Item content'

      // Act
      render(<TimelineItem>{content}</TimelineItem>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('TimelineItem_whenNotLast_thenShowsLine', () => {
    it('should show timeline line when not the last item', () => {
      // Arrange & Act
      const { container } = render(<TimelineItem>Content</TimelineItem>)

      // Assert
      const line = container.querySelector('.bg-border')
      expect(line).toBeInTheDocument()
    })
  })

  describe('TimelineItem_whenIsLast_thenHidesLine', () => {
    it('should hide timeline line when isLast is true', () => {
      // Arrange & Act
      const { container } = render(<TimelineItem isLast>Content</TimelineItem>)

      // Assert
      const line = container.querySelector('.bg-border.absolute')
      expect(line).not.toBeInTheDocument()
    })
  })

  describe('TimelineItem_whenRendered_thenShowsDot', () => {
    it('should always show timeline dot', () => {
      // Arrange & Act
      const { container } = render(<TimelineItem>Content</TimelineItem>)

      // Assert
      const dot = container.querySelector('.rounded-full.border-accent')
      expect(dot).toBeInTheDocument()
    })
  })

  describe('TimelineItem_displayName_thenIsTimelineItem', () => {
    it('should have displayName set to "TimelineItem"', () => {
      // Arrange & Act & Assert
      expect(TimelineItem.displayName).toBe('TimelineItem')
    })
  })
})

describe('TimelineHeader', () => {
  describe('TimelineHeader_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Header content'

      // Act
      render(<TimelineHeader>{content}</TimelineHeader>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('TimelineHeader_whenRendered_thenHasSpacingAndMargin', () => {
    it('should have spacing and margin styles', () => {
      // Arrange & Act
      const { container } = render(<TimelineHeader>Header</TimelineHeader>)

      // Assert
      expect(container.firstChild).toHaveClass('space-y-1')
      expect(container.firstChild).toHaveClass('mb-2')
    })
  })

  describe('TimelineHeader_displayName_thenIsTimelineHeader', () => {
    it('should have displayName set to "TimelineHeader"', () => {
      // Arrange & Act & Assert
      expect(TimelineHeader.displayName).toBe('TimelineHeader')
    })
  })
})

describe('TimelineTitle', () => {
  describe('TimelineTitle_whenRendered_thenDisplaysAsH4', () => {
    it('should render as h4 heading', () => {
      // Arrange
      const title = 'Timeline Title'

      // Act
      render(<TimelineTitle>{title}</TimelineTitle>)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument()
    })
  })

  describe('TimelineTitle_whenRendered_thenHasTypographyStyles', () => {
    it('should have correct typography styles', () => {
      // Arrange
      const title = 'Title'

      // Act
      render(<TimelineTitle>{title}</TimelineTitle>)

      // Assert
      const heading = screen.getByRole('heading', { level: 4 })
      expect(heading).toHaveClass('font-semibold')
      expect(heading).toHaveClass('text-text-primary')
    })
  })

  describe('TimelineTitle_displayName_thenIsTimelineTitle', () => {
    it('should have displayName set to "TimelineTitle"', () => {
      // Arrange & Act & Assert
      expect(TimelineTitle.displayName).toBe('TimelineTitle')
    })
  })
})

describe('TimelineMeta', () => {
  describe('TimelineMeta_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Meta content'

      // Act
      render(<TimelineMeta>{content}</TimelineMeta>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('TimelineMeta_whenRendered_thenHasFlexStyles', () => {
    it('should have flex column layout', () => {
      // Arrange & Act
      const { container } = render(<TimelineMeta>Meta</TimelineMeta>)

      // Assert
      expect(container.firstChild).toHaveClass('flex')
      expect(container.firstChild).toHaveClass('flex-col')
      expect(container.firstChild).toHaveClass('gap-1')
    })
  })

  describe('TimelineMeta_displayName_thenIsTimelineMeta', () => {
    it('should have displayName set to "TimelineMeta"', () => {
      // Arrange & Act & Assert
      expect(TimelineMeta.displayName).toBe('TimelineMeta')
    })
  })
})

describe('TimelineDate', () => {
  describe('TimelineDate_whenRendered_thenDisplaysAsTime', () => {
    it('should render as time element', () => {
      // Arrange
      const dateText = 'Jan 2023'

      // Act
      const { container } = render(<TimelineDate>{dateText}</TimelineDate>)

      // Assert
      const time = container.querySelector('time')
      expect(time).toBeInTheDocument()
      expect(time).toHaveTextContent(dateText)
    })
  })

  describe('TimelineDate_whenRendered_thenHasTypographyStyles', () => {
    it('should have mono font and small text', () => {
      // Arrange & Act
      const { container } = render(<TimelineDate>Date</TimelineDate>)

      // Assert
      const time = container.querySelector('time')
      expect(time).toHaveClass('font-mono')
      expect(time).toHaveClass('text-text-quaternary')
    })
  })

  describe('TimelineDate_displayName_thenIsTimelineDate', () => {
    it('should have displayName set to "TimelineDate"', () => {
      // Arrange & Act & Assert
      expect(TimelineDate.displayName).toBe('TimelineDate')
    })
  })
})

describe('TimelineLocation', () => {
  describe('TimelineLocation_whenRendered_thenDisplaysAsSpan', () => {
    it('should render as span element', () => {
      // Arrange
      const location = 'San Francisco, CA'

      // Act
      render(<TimelineLocation>{location}</TimelineLocation>)

      // Assert
      const span = screen.getByText(location)
      expect(span.tagName).toBe('SPAN')
    })
  })

  describe('TimelineLocation_displayName_thenIsTimelineLocation', () => {
    it('should have displayName set to "TimelineLocation"', () => {
      // Arrange & Act & Assert
      expect(TimelineLocation.displayName).toBe('TimelineLocation')
    })
  })
})

describe('TimelineContent', () => {
  describe('TimelineContent_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Main content'

      // Act
      render(<TimelineContent>{content}</TimelineContent>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('TimelineContent_whenRendered_thenHasSpacing', () => {
    it('should have spacing styles', () => {
      // Arrange & Act
      const { container } = render(<TimelineContent>Content</TimelineContent>)

      // Assert
      expect(container.firstChild).toHaveClass('space-y-2')
    })
  })

  describe('TimelineContent_displayName_thenIsTimelineContent', () => {
    it('should have displayName set to "TimelineContent"', () => {
      // Arrange & Act & Assert
      expect(TimelineContent.displayName).toBe('TimelineContent')
    })
  })
})

describe('TimelineDescription', () => {
  describe('TimelineDescription_whenRendered_thenDisplaysAsParagraph', () => {
    it('should render as paragraph', () => {
      // Arrange
      const description = 'Timeline description text'

      // Act
      render(<TimelineDescription>{description}</TimelineDescription>)

      // Assert
      const paragraph = screen.getByText(description)
      expect(paragraph.tagName).toBe('P')
    })
  })

  describe('TimelineDescription_whenRendered_thenHasTypographyStyles', () => {
    it('should have correct typography styles', () => {
      // Arrange
      const description = 'Description'

      // Act
      render(<TimelineDescription>{description}</TimelineDescription>)

      // Assert
      const paragraph = screen.getByText(description)
      expect(paragraph).toHaveClass('text-text-secondary')
      expect(paragraph).toHaveClass('leading-relaxed')
    })
  })

  describe('TimelineDescription_displayName_thenIsTimelineDescription', () => {
    it('should have displayName set to "TimelineDescription"', () => {
      // Arrange & Act & Assert
      expect(TimelineDescription.displayName).toBe('TimelineDescription')
    })
  })
})

describe('Timeline composition', () => {
  describe('Timeline_whenCompoundComponents_thenRendersTogether', () => {
    it('should render all compound components together', () => {
      // Arrange
      const titleText = 'Job Title'
      const dateText = 'Jan 2023 - Present'
      const locationText = 'Remote'
      const descriptionText = 'Job description here'

      // Act
      render(
        <Timeline>
          <TimelineItem>
            <TimelineHeader>
              <TimelineTitle>{titleText}</TimelineTitle>
              <TimelineMeta>
                <TimelineDate>{dateText}</TimelineDate>
                <TimelineLocation>{locationText}</TimelineLocation>
              </TimelineMeta>
            </TimelineHeader>
            <TimelineContent>
              <TimelineDescription>{descriptionText}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      )

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: titleText })).toBeInTheDocument()
      expect(screen.getByText(dateText)).toBeInTheDocument()
      expect(screen.getByText(locationText)).toBeInTheDocument()
      expect(screen.getByText(descriptionText)).toBeInTheDocument()
    })
  })

  describe('Timeline_whenMultipleItems_thenRendersCorrectly', () => {
    it('should render multiple timeline items with correct isLast handling', () => {
      // Arrange
      const item1 = 'First Item'
      const item2 = 'Second Item'
      const item3 = 'Third Item'

      // Act
      const { container } = render(
        <Timeline>
          <TimelineItem>
            <TimelineTitle>{item1}</TimelineTitle>
          </TimelineItem>
          <TimelineItem>
            <TimelineTitle>{item2}</TimelineTitle>
          </TimelineItem>
          <TimelineItem isLast>
            <TimelineTitle>{item3}</TimelineTitle>
          </TimelineItem>
        </Timeline>
      )

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: item1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: item2 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: item3 })).toBeInTheDocument()

      // First two items should have lines, last should not
      const lines = container.querySelectorAll('.bg-border.absolute')
      expect(lines.length).toBe(2)
    })
  })
})
