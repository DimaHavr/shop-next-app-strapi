import type { IFavoriteProduct } from './favoritesSlice'

export const selectFavoritesProducts = (state: {
  favorites: { favoriteProducts: IFavoriteProduct[] }
}) => state.favorites.favoriteProducts

export const selectFavoritesTotal = (state: {
  favorites: { totalProducts: number }
}) => state.favorites.totalProducts
