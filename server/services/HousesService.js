import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class HousesService {
  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }

  async editHouse(houseId, userId, houseData) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You shall not passssss!!!!!')
    }
    house.bedroom = houseData.bedroom || house.bedroom
    house.bathroom = houseData.bathroom || house.bathroom
    house.levels = houseData.levels || house.levels
    house.year = houseData.year || house.year
    house.description = houseData.description || house.description
    house.img = houseData.img || house.img
    await house.save()
    return house
  }

  async removeHouse(houseId, userId) {
    const house = await this.getHouseById(houseId)
    if (userId !== house.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await house.remove()
    return house
  }

  async createHouse(houseData) {
    const house = await dbContext.Houses.create(houseData)
    return house
  }

  async getHouses(query) {
    const houses = await dbContext.Houses.find(query).populate('creator', 'name picture')
    return houses
  }
}

export const housesService = new HousesService()
