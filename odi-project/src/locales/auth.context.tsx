import { createContext } from 'react';
import { AuthContext, AuthContextDefault } from '@/types/interfaces';

export const Context = createContext<AuthContext>(AuthContextDefault);
