import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Extend Vitest matchers
expect.extend({})
