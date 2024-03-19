import { minecraftRequest, skinRequest } from '@/utils'

export default {
    get_uuid: USERNAME => minecraftRequest.get(`/users/profiles/minecraft/${USERNAME}`),
    get_skin: UUID => skinRequest.get(`/session/minecraft/profile/${UUID}`)
}