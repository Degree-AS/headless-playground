import { httpClient } from '../http-client'
import { NavigationNode, NavigationResponse } from './navigation.types'

export class NavigationService {
  private static readonly ENDPOINTS = {
    GET_NAVIGATIONS: '/dwapi/frontend/navigations/1',
  }

  async getNavigations(): Promise<NavigationNode[]> {
    const response = await httpClient.get<NavigationResponse>(
      NavigationService.ENDPOINTS.GET_NAVIGATIONS,
    )

    if (!response.data?.nodes) return []

    return response.data?.nodes.filter((node) => node.showInMenu)
  }
}

export const navigationService = new NavigationService()
