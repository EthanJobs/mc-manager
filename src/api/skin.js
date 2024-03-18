import { minecraftRequest } from '@/utils'

export default {
    get_uuid: USERNAME => minecraftRequest.get(`/users/profiles/minecraft/${USERNAME}`)
}