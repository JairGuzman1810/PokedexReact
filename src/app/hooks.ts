import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';

//Aquí estamos exportando dos hooks que tienen los tipos definidos en TypeScript.
//Y en nuestros componentes, vamos a importar estos hooks desde el
//archivo de hooks en lugar de importar las funciones base de react-redux.

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
