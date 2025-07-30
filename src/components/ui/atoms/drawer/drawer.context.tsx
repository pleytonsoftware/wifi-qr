import type { DrawerProps } from './drawer'

import { createContext } from 'react'

export const DrawerContext = createContext<Omit<DrawerProps, 'children'> | undefined>(undefined)

export const DrawerContextProvider = DrawerContext.Provider
